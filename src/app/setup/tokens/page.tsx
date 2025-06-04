'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TokenSetup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notionApiKey, setNotionApiKey] = useState('');
  const [notionDatabaseId, setNotionDatabaseId] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setLoading(true);
    try {
      const response = await fetch('/api/user/tokens');
      if (response.ok) {
        const data = await response.json();
        setNotionApiKey(data.notionApiKey || '');
        setNotionDatabaseId(data.notionDatabaseId || '');
        setGithubToken(data.githubToken || '');
      }
    } catch (error) {
      console.error('토큰 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await fetch('/api/user/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notionApiKey,
          notionDatabaseId,
          githubToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '토큰 저장 중 오류가 발생했습니다.');
        return;
      }

      setSuccess('토큰이 성공적으로 저장되었습니다!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch {
      setError('토큰 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔑</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                API 토큰 설정
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
          {/* 안내 메시지 */}
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 p-6 rounded-2xl mb-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">💡</span>
              <h3 className="font-bold text-blue-800 text-lg">
                API 토큰 설정 안내
              </h3>
            </div>
            <p className="text-blue-700 leading-relaxed">
              개인 데이터를 안전하게 연동하기 위해 Notion API 키와 GitHub 개인
              액세스 토큰이 필요합니다. 모든 정보는 암호화되어 안전하게
              저장됩니다.
            </p>
          </div>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3 shadow-lg">
              <span className="text-red-500 text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-600 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3 shadow-lg">
              <span className="text-green-500 text-xl">✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* 토큰 설정 폼 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Notion 설정 */}
              <div className="bg-gradient-to-r from-gray-50/50 to-blue-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Notion 연동 설정
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="notionApiKey"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Notion API 키
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="notionApiKey"
                        value={notionApiKey}
                        onChange={(e) => setNotionApiKey(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
                        placeholder="secret_..."
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🔐</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                      <span>🔗</span>
                      <a
                        href="https://www.notion.so/my-integrations"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Notion 개발자 설정
                      </a>
                      <span>
                        에서 새 Integration을 만들어 API 키를 발급받으세요.
                      </span>
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="notionDatabaseId"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Notion 데이터베이스 ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="notionDatabaseId"
                        value={notionDatabaseId}
                        onChange={(e) => setNotionDatabaseId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
                        placeholder="데이터베이스 URL의 ID 부분"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🗂️</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Notion 데이터베이스 URL에서 찾을 수 있는 32자리 ID입니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub 설정 */}
              <div className="bg-gradient-to-r from-gray-50/50 to-purple-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🐙</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    GitHub 연동 설정
                  </h3>
                </div>
                <div>
                  <label
                    htmlFor="githubToken"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    GitHub 개인 액세스 토큰
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="githubToken"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
                      placeholder="ghp_..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">🔑</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                    <span>🔗</span>
                    <a
                      href="https://github.com/settings/personal-access-tokens/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      GitHub Settings
                    </a>
                    <span>
                      에서 Personal Access Token을 생성하세요. Repository 권한이
                      필요합니다.
                    </span>
                  </p>
                </div>
              </div>

              {/* 저장 버튼 */}
              <div className="flex justify-between items-center pt-6">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {saving ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>저장 중...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>💾</span>
                      <span>토큰 저장</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 도움말 */}
          <div className="mt-8 bg-gradient-to-r from-gray-50/50 to-yellow-50/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">📋</span>
              <h4 className="font-bold text-gray-900 text-lg">도움말</h4>
            </div>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <p>
                  <strong>Notion API 키:</strong> Notion Integration을 만들어
                  얻은 secret_ 토큰
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <p>
                  <strong>데이터베이스 ID:</strong> 연동하려는 Notion
                  데이터베이스의 고유 식별자
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <p>
                  <strong>GitHub 토큰:</strong> 리포지토리 접근을 위한 개인
                  액세스 토큰
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <p>
                  모든 토큰은 안전하게 암호화되어 저장되며, 언제든지 수정할 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
