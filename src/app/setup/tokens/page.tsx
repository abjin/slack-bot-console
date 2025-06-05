'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GitHubAppSetup() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notionApiKey, setNotionApiKey] = useState('');
  const [notionDatabaseId, setNotionDatabaseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [githubAppInstalled, setGithubAppInstalled] = useState(false);

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
        setGithubAppInstalled(data.githubAppInstalled || false);
      }
    } catch (error) {
      console.error('토큰 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotionSubmit = async (e: React.FormEvent) => {
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Notion 토큰 저장 중 오류가 발생했습니다.');
        return;
      }

      setSuccess('Notion 토큰이 성공적으로 저장되었습니다!');
    } catch {
      setError('Notion 토큰 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // GitHub App 설치 URL로 리다이렉트
  const handleGitHubAppInstall = () => {
    // GitHub App 설치 URL로 리다이렉트
    const githubAppUrl = `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/new`;
    const callbackUrl = `${window.location.origin}/auth/github/callback`;

    console.log('githubAppUrl', `${githubAppUrl}?state=${callbackUrl}`);

    window.location.href = `${githubAppUrl}?state=${callbackUrl}`;
  };

  const canProceed = notionApiKey && notionDatabaseId && githubAppInstalled;

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
                <span className="text-white font-bold text-lg">🔗</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                서비스 연동 설정
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
              <span className="text-2xl">🚀</span>
              <h3 className="font-bold text-blue-800 text-lg">
                서비스 연동 설정 안내
              </h3>
            </div>
            <p className="text-blue-700 leading-relaxed">
              Notion과 GitHub을 연동하여 더 강력한 기능을 사용하세요. GitHub은
              보안이 강화된 GitHub App 방식으로 연동됩니다.
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

          {/* Notion 설정 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-8">
            <div className="bg-gradient-to-r from-gray-50/50 to-blue-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Notion 연동 설정
                </h3>
              </div>
              <form onSubmit={handleNotionSubmit} className="space-y-6">
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
                <button
                  type="submit"
                  disabled={saving || !notionApiKey || !notionDatabaseId}
                  className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {saving ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>저장 중...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>💾</span>
                      <span>Notion 설정 저장</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* GitHub App 설정 */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-8">
            <div className="bg-gradient-to-r from-gray-50/50 to-purple-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🐙</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    GitHub App 연동
                  </h3>
                </div>
                {githubAppInstalled && (
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-600 text-sm">✅</span>
                    <span className="text-green-800 font-semibold text-sm">
                      설치됨
                    </span>
                  </div>
                )}
              </div>

              {!githubAppInstalled ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50/80 border border-yellow-200 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-yellow-600 text-lg">⚡</span>
                      <h4 className="font-bold text-yellow-800">
                        새로운 GitHub App 방식
                      </h4>
                    </div>
                    <ul className="text-yellow-700 text-sm space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600">•</span>
                        <span>개인 액세스 토큰보다 더 안전한 방식</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600">•</span>
                        <span>필요한 권한만 선택적으로 부여</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600">•</span>
                        <span>토큰 만료 걱정 없음</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleGitHubAppInstall}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl font-bold hover:from-gray-900 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span className="text-lg">GitHub App 설치하기</span>
                    </div>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    클릭하면 GitHub로 이동하여 앱 설치를 진행합니다.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✅</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    GitHub App이 성공적으로 설치되었습니다!
                  </h4>
                  <p className="text-gray-600">
                    이제 GitHub 리포지토리에 안전하게 접근할 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 다음 단계 버튼 */}
          <div className="flex justify-between items-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              취소
            </Link>
            {canProceed ? (
              <Link
                href="/setup/complete"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <span>🎉</span>
                  <span>설정 완료</span>
                </div>
              </Link>
            ) : (
              <div className="px-8 py-3 bg-gray-300 text-gray-500 rounded-xl font-bold cursor-not-allowed">
                설정을 완료해주세요
              </div>
            )}
          </div>

          {/* 도움말 */}
          <div className="mt-8 bg-gradient-to-r from-gray-50/50 to-yellow-50/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">📋</span>
              <h4 className="font-bold text-gray-900 text-lg">설정 안내</h4>
            </div>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">1.</span>
                <p>
                  <strong>Notion 연동:</strong> API 키와 데이터베이스 ID를
                  입력하여 Notion과 연결합니다.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">2.</span>
                <p>
                  <strong>GitHub App 설치:</strong> 버튼을 클릭하여 GitHub에서
                  앱을 설치합니다.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">3.</span>
                <p>
                  두 연동이 모두 완료되면 &quot;설정 완료&quot; 버튼이
                  활성화됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
