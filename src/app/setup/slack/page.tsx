'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SlackSetup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasSlackIntegration, setHasSlackIntegration] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session) {
      checkSlackIntegration();
    }
  }, [session, status, router]);

  const checkSlackIntegration = async () => {
    try {
      const response = await fetch('/api/user/tokens');
      if (response.ok) {
        const data = await response.json();
        setHasSlackIntegration(data.hasSlackIntegration);
      }
    } catch (error) {
      console.error('Slack 연동 상태 확인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlackConnect = () => {
    // 실제 Slack OAuth URL을 구성해야 합니다
    // 지금은 시뮬레이션을 위해 경고 메시지를 표시합니다
    alert(
      'Slack OAuth 연동 기능은 실제 Slack 앱 설정이 필요합니다. 개발 단계에서는 시뮬레이션됩니다.'
    );

    // 시뮬레이션: 성공한 것처럼 처리
    setHasSlackIntegration(true);
    setTimeout(() => {
      router.push('/setup/complete');
    }, 1000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">💬</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Slack 연동
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
            >
              <span>←</span>
              <span>대시보드로 돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {hasSlackIntegration ? (
            /* 연동 완료 상태 */
            <div className="bg-white/70 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/20 text-center">
              <div className="text-8xl mb-8">✅</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Slack 연동이 완료되었습니다!
              </h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                이제 Slack 워크스페이스에서 봇을 사용할 수 있습니다.
              </p>
              <div className="space-y-6">
                <Link
                  href="/setup/complete"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <span>🚀</span>
                  <span>사용 방법 보기</span>
                </Link>
                <div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                  >
                    <span>←</span>
                    <span>대시보드로 돌아가기</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* 연동 설정 */
            <div className="space-y-8">
              {/* 안내 메시지 */}
              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-bold text-blue-800 text-lg">
                    Slack 연동 안내
                  </h3>
                </div>
                <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                  Slack 워크스페이스와 연동하면 Slack에서 직접 질문하고 개인
                  데이터 기반의 답변을 받을 수 있습니다.
                </p>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Slack 앱이 자동으로 워크스페이스에 추가됩니다</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>
                      DM이나 채널에서 봇에게 메시지를 보낼 수 있습니다
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>
                      개인 Notion과 GitHub 데이터를 기반으로 답변을 제공합니다
                    </span>
                  </li>
                </ul>
              </div>

              {/* 연동 방법 */}
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Slack 연동 방법
                  </h3>
                </div>

                <div className="space-y-8">
                  <div className="group flex items-start space-x-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">
                        Slack 워크스페이스 선택
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        봇을 추가하려는 Slack 워크스페이스를 선택합니다.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">
                        권한 승인
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        봇이 메시지를 읽고 응답할 수 있도록 필요한 권한을
                        승인합니다.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2">
                        연동 완료
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        설정이 완료되면 Slack에서 봇을 사용할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <button
                    onClick={handleSlackConnect}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-3"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523Zm0-6.584a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 3.535a2.528 2.528 0 0 1 2.52 2.523v2.523H5.042Zm6.584 0V3.535a2.528 2.528 0 0 1 2.523-2.52 2.528 2.528 0 0 1 2.523 2.52v5.046a2.528 2.528 0 0 1-2.523 2.523 2.528 2.528 0 0 1-2.523-2.523Zm6.584 2.523a2.528 2.528 0 0 1 2.523-2.523 2.528 2.528 0 0 1 2.523 2.523 2.528 2.528 0 0 1-2.523 2.523h-2.523v-2.523Zm0 6.584a2.528 2.528 0 0 1 2.523 2.523 2.528 2.528 0 0 1-2.523 2.523 2.528 2.528 0 0 1-2.523-2.523v-2.523h2.523Zm-6.584 0v2.523a2.528 2.528 0 0 1-2.523 2.523 2.528 2.528 0 0 1-2.523-2.523 2.528 2.528 0 0 1 2.523-2.523h2.523Z" />
                    </svg>
                    <span>Slack에 연동하기</span>
                  </button>
                </div>
              </div>

              {/* 주의사항 */}
              <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/50 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">⚠️</span>
                  <h4 className="font-bold text-yellow-800 text-lg">
                    주의사항
                  </h4>
                </div>
                <div className="text-yellow-700 text-sm space-y-2 leading-relaxed">
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <p>
                      Slack 연동을 위해서는 먼저 Notion과 GitHub 토큰 설정이
                      완료되어야 합니다.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <p>
                      봇은 개인 데이터에만 접근하며, 다른 사용자의 정보는 보지
                      못합니다.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600">•</span>
                    <p>언제든지 연동을 해제할 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
