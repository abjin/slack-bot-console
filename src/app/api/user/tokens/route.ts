import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenant = await prisma.tenants.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      notionApiKey: tenant?.notionApiKey || '',
      notionDatabaseId: tenant?.notionDatabaseId || '',
      githubAppInstalled: tenant?.githubAppInstalled || false,
      githubAppInstallationId: tenant?.githubAppInstallationId || '',
      hasSlackIntegration:
        tenant?.tenantId && tenant?.slackBotToken ? true : false,
    });
  } catch (error) {
    console.error('토큰 조회 오류:', error);
    return NextResponse.json(
      { error: '토큰 정보를 가져올 수 없습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { notionApiKey, notionDatabaseId } = await request.json();

    // 입력값 검증
    if (!notionApiKey && !notionDatabaseId) {
      return NextResponse.json(
        { error: '최소 하나의 값은 입력해야 합니다.' },
        { status: 400 }
      );
    }

    await prisma.tenants.upsert({
      where: { userId: session.user.id },
      update: {
        notionApiKey: notionApiKey || undefined,
        notionDatabaseId: notionDatabaseId || undefined,
      },
      create: {
        userId: session.user.id,
        notionApiKey: notionApiKey || undefined,
        notionDatabaseId: notionDatabaseId || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('토큰 저장 오류:', error);
    return NextResponse.json(
      { error: '토큰을 저장할 수 없습니다.' },
      { status: 500 }
    );
  }
}
