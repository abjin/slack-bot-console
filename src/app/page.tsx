'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

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
      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <header className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">🤖</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Slack Knowledge Bot
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notion과 GitHub 데이터를 기반으로 한 개인화된 지식 검색 서비스
          </p>
        </header>

        {/* 서비스 소개 */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                개인 데이터 연동
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Notion 워크스페이스와 GitHub 리포지토리를 연결하여 개인화된 지식
                베이스를 구축합니다.
              </p>
            </div>
            <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                AI 기반 검색
              </h3>
              <p className="text-gray-600 leading-relaxed">
                RAG(Retrieval-Augmented Generation) 기술을 활용해 정확하고
                유용한 답변을 제공합니다.
              </p>
            </div>
            <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                💬
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Slack 통합
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Slack에서 직접 질문하고 즉시 개인 데이터 기반의 답변을 받을 수
                있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 방법 */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            사용 방법
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="group flex items-start space-x-6 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-gray-900 mb-2">
                    회원가입 및 로그인
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    이메일과 비밀번호로 간편하게 가입하세요.
                  </p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-gray-900 mb-2">
                    API 키 등록
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Notion API 키와 GitHub 토큰을 등록합니다.
                  </p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-gray-900 mb-2">
                    Slack 연동
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Slack 워크스페이스와 연결합니다.
                  </p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-gray-900 mb-2">
                    질문하고 답변받기
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Slack에서 봇에게 질문하면 개인 데이터 기반 답변을 받습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-lg mx-auto border border-white/20">
            <div className="text-4xl mb-6">🚀</div>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              지금 시작하기
            </h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              개인화된 지식 검색 서비스를 경험해보세요.
            </p>
            <div className="space-y-4">
              <Link
                href="/auth/signup"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
              >
                회원가입
              </Link>
              <Link
                href="/auth/signin"
                className="block w-full bg-white/80 text-gray-700 py-4 px-8 rounded-xl font-bold hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg border border-gray-200"
              >
                로그인
              </Link>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-20 pt-8 border-t border-white/20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
            <span>© 2024 Slack Knowledge Bot. All rights reserved.</span>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors underline"
            >
              서비스 이용약관
            </Link>
            <span>•</span>
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors underline"
            >
              개인정보 처리방침
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
