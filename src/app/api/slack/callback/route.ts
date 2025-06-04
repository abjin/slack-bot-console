import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { WebClient } from '@slack/web-api';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
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

    // 데이터베이스에 토큰 정보 저장
    await prisma.tenants.upsert({
      where: { userId: session.user.id },
      update: {
        tenantId: team.id,
        slackBotToken: access_token,
      },
      create: {
        userId: session.user.id,
        tenantId: team.id,
        slackBotToken: access_token,
      },
    });

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
