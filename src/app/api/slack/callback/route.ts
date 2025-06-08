import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { WebClient } from '@slack/web-api';

// Notion 임베딩 초기화 함수
async function initNotionEmbedding(tenantId: string) {
  try {
    const backendUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    if (!apiKey) {
      console.error('BACKEND_API_KEY가 설정되지 않았습니다.');
      return false;
    }

    const response = await fetch(`${backendUrl}/notion-embedding/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ tenantId }),
    });

    if (!response.ok) {
      console.error(
        'Notion 임베딩 초기화 실패:',
        response.status,
        response.statusText
      );
      return false;
    }

    console.log('Notion 임베딩 초기화 성공');
    return true;
  } catch (error) {
    console.error('Notion 임베딩 초기화 오류:', error);
    return false;
  }
}

async function initGitHubEmbedding(tenantId: string) {
  try {
    const backendUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.BACKEND_API_KEY;

    if (!apiKey) {
      console.error('BACKEND_API_KEY가 설정되지 않았습니다.');
      return false;
    }

    const response = await fetch(`${backendUrl}/github-embedding/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ tenantId }),
    });

    if (!response.ok) {
      console.error(
        'Notion 임베딩 초기화 실패:',
        response.status,
        response.statusText
      );
      return false;
    }

    console.log('Notion 임베딩 초기화 성공');
    return true;
  } catch (error) {
    console.error('Notion 임베딩 초기화 오류:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // 노션과 깃허브 연동 상태 확인
    const tenant = await prisma.tenants.findUnique({
      where: { userId: session.user.id },
    });

    const hasNotionIntegration = !!(
      tenant?.notionApiKey && tenant?.notionDatabaseId
    );
    const hasGitHubIntegration = !!(
      tenant?.githubAppInstalled && tenant?.githubAppInstallationId
    );

    // 노션과 깃허브가 모두 연동되지 않은 경우 슬랙 연동 거부
    if (!hasNotionIntegration || !hasGitHubIntegration) {
      console.log('슬랙 연동 거부: 사전 조건 미충족', {
        hasNotionIntegration,
        hasGitHubIntegration,
        userId: session.user.id,
      });
      return NextResponse.redirect(
        new URL('/setup/slack?error=prerequisites_not_met', request.url)
      );
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // 사용자가 권한을 거부한 경우
    if (error === 'access_denied') {
      return NextResponse.redirect(
        new URL('/setup/slack?error=access_denied', request.url)
      );
    }

    // authorization code가 없는 경우
    if (!code) {
      return NextResponse.redirect(
        new URL('/setup/slack?error=no_code', request.url)
      );
    }

    // Slack OAuth v2 API를 사용하여 access token 요청
    const client = new WebClient();

    const slackClientId = process.env.SLACK_CLIENT_ID;
    const slackClientSecret = process.env.SLACK_CLIENT_SECRET;

    if (!slackClientId || !slackClientSecret) {
      console.error('Slack 클라이언트 ID 또는 시크릿이 설정되지 않았습니다.');
      return NextResponse.redirect(
        new URL('/setup/slack?error=config_missing', request.url)
      );
    }

    const response = await client.oauth.v2.access({
      client_id: slackClientId,
      client_secret: slackClientSecret,
      code: code,
    });

    if (!response.ok) {
      console.error('Slack OAuth 오류:', response.error);
      return NextResponse.redirect(
        new URL('/setup/slack?error=oauth_failed', request.url)
      );
    }

    // 응답에서 필요한 정보 추출
    const oauthResponse = response as {
      access_token?: string;
      team?: { id: string; name: string };
      ok: boolean;
      error?: string;
    };

    const { access_token, team } = oauthResponse;

    if (!access_token || !team?.id) {
      console.error('필수 토큰 정보가 누락되었습니다.');
      return NextResponse.redirect(
        new URL('/setup/slack?error=token_missing', request.url)
      );
    }

    const tenantId = team.id;

    // 데이터베이스에 토큰 정보 저장
    await prisma.tenants.upsert({
      where: { userId: session.user.id },
      update: {
        tenantId: tenantId,
        slackBotToken: access_token,
      },
      create: {
        userId: session.user.id,
        tenantId: tenantId,
        slackBotToken: access_token,
      },
    });

    await Promise.all([
      initNotionEmbedding(tenantId),
      initGitHubEmbedding(tenantId),
    ]);

    console.log(`Slack 연동 성공: 팀 ${team.name} (${team.id})`);

    // 성공 시 완료 페이지로 리다이렉트
    return NextResponse.redirect(
      new URL('/setup/slack?success=true', request.url)
    );
  } catch (error) {
    console.error('Slack 콜백 처리 오류:', error);
    return NextResponse.redirect(
      new URL('/setup/slack?error=server_error', request.url)
    );
  }
}
