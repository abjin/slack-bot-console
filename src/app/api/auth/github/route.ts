import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const installationId = searchParams.get('installation_id');

    if (!installationId) {
      return NextResponse.json(
        { error: '인증 코드 또는 설치 ID가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // GitHub App JWT 토큰 생성
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY?.replace(
      /\\n/g,
      '\n'
    );
    const appId = process.env.GITHUB_APP_ID;

    if (!privateKey || !appId) {
      return NextResponse.json(
        { error: 'GitHub App 설정이 누락되었습니다.' },
        { status: 500 }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iat: now,
      exp: now + 10 * 60, // 10분
      iss: appId,
    };

    const jwtToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    // GitHub App에서 액세스 토큰 교환
    const tokenResponse = await fetch(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('GitHub 액세스 토큰 발급 실패:', errorData);
      throw new Error('GitHub 액세스 토큰 발급 실패');
    }

    const tokenData = await tokenResponse.json();

    // 데이터베이스에 저장
    const { prisma } = await import('@/lib/prisma');

    await prisma.tenants.upsert({
      where: { userId: session.user.id },
      update: {
        githubAppInstallationId: installationId,
        githubAccessToken: tokenData.token,
        githubAppInstalled: true,
      },
      create: {
        userId: session.user.id,
        githubAppInstallationId: installationId,
        githubAccessToken: tokenData.token,
        githubAppInstalled: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('GitHub App 인증 오류:', error);
    return NextResponse.json(
      { error: 'GitHub App 인증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
