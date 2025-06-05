'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

// 페이지를 동적으로 설정하여 useSearchParams 사용 가능하게 함
export const dynamic = 'force-dynamic';

function GitHubCallbackContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState('');

  const handleGitHubCallback = useCallback(
    async (installationId: string) => {
      try {
        const response = await fetch(
          `/api/auth/github?installation_id=${installationId}`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'GitHub App 인증에 실패했습니다.');
        }

        // 성공적으로 처리되면 설정 완료 페이지로 이동
        router.push('/setup/complete?github=success');
      } catch (error) {
        console.error('GitHub 콜백 처리 오류:', error);
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.'
        );
        setIsProcessing(false);
      }
    },
    [router, setError, setIsProcessing]
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'loading') {
      return;
    }

    const installationId = searchParams.get('installation_id');

    if (!installationId) {
      setError('GitHub App 설치 정보가 누락되었습니다.');
      setIsProcessing(false);
      return;
    }

    handleGitHubCallback(installationId);
  }, [session, status, searchParams, router, handleGitHubCallback]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">로그인 확인 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">❌</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                GitHub App 설치 실패
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => router.push('/setup/tokens')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          GitHub App 설치 처리 중
        </h1>
        <p className="text-gray-600">
          {isProcessing
            ? 'GitHub App 설치를 처리하고 있습니다...'
            : '설정이 완료되었습니다. 잠시 후 이동합니다.'}
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <div className="text-lg text-gray-600">페이지 로딩 중...</div>
      </div>
    </div>
  );
}

export default function GitHubCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GitHubCallbackContent />
    </Suspense>
  );
}
