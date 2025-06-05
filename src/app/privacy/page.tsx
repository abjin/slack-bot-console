import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-8 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>홈으로 돌아가기</span>
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            개인정보 처리방침
          </h1>
          <p className="text-lg text-gray-600">
            Slack Knowledge Bot의 개인정보 수집 및 이용에 대한 안내
          </p>
        </div>

        {/* 내용 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12 space-y-8">
          {/* 기본 정보 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              1. 개인정보 수집 및 이용 목적
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Slack Knowledge Bot은 다음과 같은 목적으로 개인정보를 수집하고
                이용합니다:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>회원 가입 및 계정 관리</li>
                <li>Notion 및 GitHub 연동 서비스 제공</li>
                <li>Slack 봇 서비스 제공</li>
                <li>서비스 개선 및 맞춤형 서비스 제공</li>
                <li>고객 지원 및 문의 응답</li>
              </ul>
            </div>
          </section>

          {/* 수집하는 정보 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              2. 수집하는 개인정보의 항목
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  필수 정보
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>서비스 이용 기록</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  연동 서비스 정보
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Notion API 토큰</li>
                  <li>GitHub Personal Access Token</li>
                  <li>Slack 워크스페이스 정보</li>
                  <li>연동된 데이터의 메타데이터</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 보유 및 이용 기간 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                회원 탈퇴 시까지 보유하며, 탈퇴 후 즉시 삭제됩니다. 단, 관련
                법령에 따라 보존의무가 있는 정보는 해당 기간 동안 보존됩니다.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
            </div>
          </section>

          {/* 제3자 제공 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              4. 개인정보의 제3자 제공
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                다만, 아래의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>
                  법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                  방법에 따라 수사기관의 요구가 있는 경우
                </li>
              </ul>
            </div>
          </section>

          {/* 처리 위탁 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              5. 개인정보 처리의 위탁
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>서비스 제공을 위해 다음 업체에 개인정보 처리를 위탁합니다:</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>Vercel:</strong> 웹 서비스 호스팅
                  </li>
                  <li>
                    <strong>Supabase:</strong> 데이터베이스 관리
                  </li>
                  <li>
                    <strong>OpenAI:</strong> AI 모델 서비스
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 이용자 권리 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              6. 이용자의 권리와 행사 방법
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리 정지 요구</li>
              </ul>
              <p>
                권리 행사는 개인정보보호법 시행령 제41조에 따라 서면, 전화,
                전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에
                대해 지체없이 조치하겠습니다.
              </p>
            </div>
          </section>

          {/* 보안 조치 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              7. 개인정보 보호를 위한 기술적/관리적 대책
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>비밀번호 암호화 저장</li>
                <li>HTTPS 통신 암호화</li>
                <li>접근 권한 관리 및 제한</li>
                <li>보안 프로그램 설치 및 갱신</li>
                <li>개인정보 취급 직원의 최소화 및 교육</li>
              </ul>
            </div>
          </section>

          {/* 문의처 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              8. 개인정보 보호책임자
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700">
              <p className="mb-2">
                <strong>개인정보 보호책임자:</strong> Slack Knowledge Bot 관리자
              </p>
              <p className="mb-2">
                <strong>연락처:</strong> 대시보드 내 문의하기 기능 이용
              </p>
              <p>
                개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항은
                위의 연락처로 문의해 주시기 바랍니다.
              </p>
            </div>
          </section>

          {/* 개정 안내 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              9. 개인정보 처리방침의 변경
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에
                따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의
                시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p>
                  <strong>시행일자:</strong> 2024년 1월 1일
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 하단 버튼 */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
