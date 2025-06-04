'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SetupComplete() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎉</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                설정 완료
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
        <div className="max-w-5xl mx-auto">
          {/* 축하 메시지 */}
          <div className="text-center mb-16">
            <div className="text-9xl mb-8">🎉</div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              설정이 완료되었습니다!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              이제 Slack에서 개인화된 지식 검색 봇을 사용할 수 있습니다.
              Notion과 GitHub 데이터를 기반으로 정확한 답변을 받아보세요.
            </p>
          </div>

          {/* 사용 방법 */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Slack 사용법 */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Slack에서 사용하기
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      DM으로 질문하기
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      봇에게 직접 메시지를 보내 질문할 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      채널에서 멘션
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      채널에서 @봇이름을 멘션하여 질문할 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      즉시 답변 받기
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      개인 데이터를 분석하여 관련된 정보와 함께 답변을
                      제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 질문 예시 */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">질문 예시</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                    📚 Notion 관련 질문:
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &quot;지난주 회의록에서 논의된 프로젝트 일정은 어떻게
                    되나요?&quot;
                  </p>
                </div>
                <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                    🐙 GitHub 관련 질문:
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &quot;최근에 작업한 React 컴포넌트의 구현 방법을
                    알려주세요.&quot;
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                    🔗 통합 질문:
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &quot;프로젝트 X와 관련된 문서와 코드를 정리해주세요.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 연동된 서비스 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-12">
            <h3 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              연동된 서비스
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">Notion</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  워크스페이스의 페이지와 데이터베이스
                </p>
                <div className="inline-flex items-center space-x-2 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-lg">
                  <span>✅</span>
                  <span>연결됨</span>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">🐙</span>
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">GitHub</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  리포지토리의 코드와 이슈
                </p>
                <div className="inline-flex items-center space-x-2 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-lg">
                  <span>✅</span>
                  <span>연결됨</span>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">Slack</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  워크스페이스 봇 연동
                </p>
                <div className="inline-flex items-center space-x-2 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-lg">
                  <span>✅</span>
                  <span>연결됨</span>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 p-8 rounded-2xl mb-12 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">💡</span>
              <h4 className="font-bold text-blue-800 text-xl">팁과 주의사항</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-blue-700 text-sm leading-relaxed">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <p>
                    봇은 여러분의 개인 데이터만 접근하며, 다른 사용자의 정보는
                    볼 수 없습니다.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <p>질문이 구체적일수록 더 정확한 답변을 받을 수 있습니다.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <p>
                    새로운 Notion 페이지나 GitHub 커밋이 추가되면 자동으로
                    반영됩니다.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <p>언제든지 대시보드에서 연동 설정을 수정할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span>📊</span>
                <span>대시보드로 이동</span>
              </Link>
              <button
                onClick={() => window.open('https://slack.com', '_blank')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span>🚀</span>
                <span>Slack 열기</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              문제가 있거나 도움이 필요하시면 언제든지 문의해 주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
