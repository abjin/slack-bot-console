'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        const session = await getSession();
        if (session) {
          router.push('/dashboard');
        }
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🤖</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              로그인
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            계정에 로그인하여 서비스를 이용하세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2">
              <span className="text-red-500">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                이메일
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
                  placeholder="example@email.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📧</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
                  placeholder="비밀번호를 입력하세요"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>로그인 중...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>🚀</span>
                  <span>로그인</span>
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              계정이 없으신가요?{' '}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
              >
                회원가입
              </Link>
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              <span>←</span>
              <span>홈으로 돌아가기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
