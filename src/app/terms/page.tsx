import Link from 'next/link';

export default function TermsPage() {
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
            서비스 이용약관
          </h1>
          <p className="text-lg text-gray-600">
            Slack Knowledge Bot 서비스 이용에 관한 약관 및 조건
          </p>
        </div>

        {/* 내용 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12 space-y-8">
          {/* 제1조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제1조 (목적)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                이 약관은 Slack Knowledge Bot(이하 &quot;회사&quot;)이 제공하는
                개인화된 지식 검색 서비스(이하 &quot;서비스&quot;)의 이용과
                관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
                목적으로 합니다.
              </p>
            </div>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제2조 (정의)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>&quot;서비스&quot;</strong>란 회사가 제공하는 Notion
                  및 GitHub 데이터 기반 AI 지식 검색 서비스를 의미합니다.
                </li>
                <li>
                  <strong>&quot;이용자&quot;</strong>란 이 약관에 따라 회사가
                  제공하는 서비스를 받는 회원 및 비회원을 의미합니다.
                </li>
                <li>
                  <strong>&quot;회원&quot;</strong>란 회사에 개인정보를 제공하여
                  회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며,
                  회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
                  의미합니다.
                </li>
                <li>
                  <strong>&quot;연동 데이터&quot;</strong>란 이용자가 연결한
                  Notion 워크스페이스 및 GitHub 리포지토리의 데이터를
                  의미합니다.
                </li>
              </ul>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제3조 (약관의 효력 및 변경)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
                공지함으로써 효력을 발생합니다.
              </p>
              <p>
                ② 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며,
                변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써
                효력을 발생합니다.
              </p>
              <p>
                ③ 이용자는 변경된 약관에 동의하지 않을 경우 회원탈퇴를 요청할 수
                있으며, 변경된 약관의 효력 발생일 이후 서비스를 계속 이용할 경우
                약관의 변경사항에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제4조 (회원가입)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이
                약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
              </p>
              <p>
                ② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음
                각 호에 해당하지 않는 한 회원으로 등록합니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                <li>
                  기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고
                  판단되는 경우
                </li>
              </ul>
            </div>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제5조 (서비스의 제공 및 변경)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>① 회사는 회원에게 아래와 같은 서비스를 제공합니다:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notion 워크스페이스 연동 및 데이터 인덱싱</li>
                <li>GitHub 리포지토리 연동 및 코드 분석</li>
                <li>Slack 봇을 통한 AI 기반 질의응답</li>
                <li>개인화된 지식 검색 및 추천</li>
                <li>
                  기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해
                  회원에게 제공하는 일체의 서비스
                </li>
              </ul>
              <p>
                ② 회사는 서비스의 내용 및 제공일정을 변경할 경우에는 변경사유 및
                제공일정을 명시하여 현재 서비스의 제공 전 또는 제공 중단 시
                회원에게 공지합니다.
              </p>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제6조 (연동 데이터의 사용)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 이용자는 본인의 Notion 및 GitHub 계정을 연동하여 개인 데이터를
                서비스에 제공할 수 있습니다.
              </p>
              <p>② 회사는 연동된 데이터를 다음 목적으로만 사용합니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>AI 기반 질의응답 서비스 제공</li>
                <li>개인화된 검색 결과 생성</li>
                <li>서비스 품질 개선</li>
              </ul>
              <p>
                ③ 이용자는 언제든지 연동을 해제할 수 있으며, 연동 해제 시 관련
                데이터는 즉시 삭제됩니다.
              </p>
            </div>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제7조 (회원의 의무)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>① 회원은 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>
                  회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신
                  또는 게시
                </li>
                <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>
                  회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                </li>
                <li>
                  외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
                  정보를 회사에 공개 또는 게시하는 행위
                </li>
              </ul>
            </div>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제8조 (서비스 이용의 제한)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인
                운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스
                이용을 단계별로 제한할 수 있습니다.
              </p>
              <p>
                ② 회사는 전항에도 불구하고, 주민등록법을 위반한 명의도용 및
                결제도용, 전화번호 도용, 저작권법 및 컴퓨터프로그램보호법을
                위반한 불법프로그램의 제공 및 운영방해, 정보통신망법을 위반한
                불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과
                같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수
                있습니다.
              </p>
            </div>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제9조 (면책조항)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
                제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </p>
              <p>
                ② 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는
                책임을 지지 않습니다.
              </p>
              <p>
                ③ 회사는 회원이 서비스를 이용하여 기대하는 손익이나 서비스를
                통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
              </p>
              <p>
                ④ 회사는 AI가 생성한 답변의 정확성에 대해 보장하지 않으며,
                이용자는 AI 답변을 참고용으로만 사용해야 합니다.
              </p>
            </div>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              제10조 (분쟁해결)
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그
                피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
              </p>
              <p>
                ② 이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는
                대한민국의 법을 적용하며, 서울중앙지방법원을 관할 법원으로
                합니다.
              </p>
            </div>
          </section>

          {/* 부칙 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              부칙
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p>
                  <strong>시행일자:</strong> 이 약관은 2024년 1월 1일부터
                  적용됩니다.
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
