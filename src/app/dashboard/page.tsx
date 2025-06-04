'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Tenants {
  notionApiKey: string;
  notionDatabaseId: string;
  notionPineconeIndexName: string;
  githubToken: string;
  githubPineconeIndexName: string;
  hasSlackIntegration: boolean;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tokens, setTokens] = useState<Tenants | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session) {
      fetchTokens();
    }
  }, [session, status, router]);

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/user/tokens');
      if (response.ok) {
        const data = await response.json();
        setTokens(data);
      }
    } catch (error) {
      console.error('토큰 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const getSetupProgress = () => {
    if (!tokens) return 0;
    let progress = 0;
    if (tokens.notionApiKey && tokens.notionDatabaseId) progress += 50;
    if (tokens.githubToken) progress += 25;
    if (tokens.hasSlackIntegration) progress += 25;
    return progress;
  };

  const getNextStep = () => {
    if (!tokens) return { title: '로딩 중...', href: '#' };

    if (!tokens.notionApiKey || !tokens.notionDatabaseId) {
      return { title: 'Notion 연동 설정', href: '/setup/tokens' };
    }
    if (!tokens.githubToken) {
      return { title: 'GitHub 토큰 설정', href: '/setup/tokens' };
    }
    if (!tokens.hasSlackIntegration) {
      return { title: 'Slack 연동', href: '/setup/slack' };
    }
    return { title: '설정 완료됨', href: '/setup/complete' };
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  const progress = getSetupProgress();
  const nextStep = getNextStep();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Slack Knowledge Bot
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">안녕하세요</div>
                <div className="font-semibold text-gray-700">
                  {session?.user?.name || session?.user?.email}님
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-500/10 text-red-600 hover:bg-red-500/20 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 환영 메시지 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">대시보드</h2>
          <p className="text-gray-600">
            설정 현황을 확인하고 다음 단계를 진행하세요
          </p>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                설정 진행 상황
              </h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {progress}%
              </div>
              <div className="text-sm text-gray-500">완료됨</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {progress < 100 && (
            <div className="text-center">
              <Link
                href={nextStep.href}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span>다음 단계: {nextStep.title}</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>

        {/* 연동 상태 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Notion 연동 */}
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Notion</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    tokens?.notionApiKey && tokens?.notionDatabaseId
                      ? 'bg-green-500 shadow-lg shadow-green-500/30'
                      : 'bg-red-500 shadow-lg shadow-red-500/30'
                  } animate-pulse`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    tokens?.notionApiKey && tokens?.notionDatabaseId
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {tokens?.notionApiKey && tokens?.notionDatabaseId
                    ? '연결됨'
                    : '연결 필요'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {tokens?.notionApiKey && tokens?.notionDatabaseId
                ? 'Notion API가 성공적으로 연결되어 워크스페이스 데이터에 접근할 수 있습니다.'
                : 'Notion API 키와 데이터베이스 ID를 설정하여 개인 노트와 데이터베이스에 접근하세요.'}
            </p>
            <Link
              href="/setup/tokens"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200"
            >
              <span>설정 관리</span>
              <span>→</span>
            </Link>
          </div>

          {/* GitHub 연동 */}
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🐙</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">GitHub</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    tokens?.githubToken
                      ? 'bg-green-500 shadow-lg shadow-green-500/30'
                      : 'bg-red-500 shadow-lg shadow-red-500/30'
                  } animate-pulse`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    tokens?.githubToken ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tokens?.githubToken ? '연결됨' : '연결 필요'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {tokens?.githubToken
                ? 'GitHub 토큰이 설정되어 리포지토리의 코드와 이슈에 접근할 수 있습니다.'
                : 'GitHub 개인 액세스 토큰을 설정하여 리포지토리 데이터에 접근하세요.'}
            </p>
            <Link
              href="/setup/tokens"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200"
            >
              <span>설정 관리</span>
              <span>→</span>
            </Link>
          </div>

          {/* Slack 연동 */}
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Slack</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    tokens?.hasSlackIntegration
                      ? 'bg-green-500 shadow-lg shadow-green-500/30'
                      : 'bg-red-500 shadow-lg shadow-red-500/30'
                  } animate-pulse`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    tokens?.hasSlackIntegration
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {tokens?.hasSlackIntegration ? '연결됨' : '연결 필요'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {tokens?.hasSlackIntegration
                ? 'Slack 워크스페이스가 연결되어 봇과 대화할 수 있습니다.'
                : 'Slack 워크스페이스를 연결하여 봇과 실시간으로 소통하세요.'}
            </p>
            <Link
              href="/setup/slack"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200"
            >
              <span>연동 관리</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 완료 안내 */}
        {progress === 100 && (
          <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-sm border border-green-200/50 p-8 rounded-2xl text-center shadow-xl">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">
              모든 설정이 완료되었습니다!
            </h3>
            <p className="text-green-700 mb-6 text-lg">
              이제 Slack에서 봇에게 질문하여 개인화된 답변을 받을 수 있습니다.
            </p>
            <Link
              href="/setup/complete"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span>🚀</span>
              <span>사용 방법 보기</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
