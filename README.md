# Slack Knowledge Bot Console

Notion과 GitHub 데이터를 기반으로 한 개인화된 RAG 검색을 Slack을 통해 사용할 수 있는 서비스의 대시보드입니다.

## 🌟 주요 기능

- **개인 데이터 연동**: Notion 워크스페이스와 GitHub 리포지토리 연결
- **AI 기반 검색**: RAG(Retrieval-Augmented Generation) 기술을 활용한 정확한 답변
- **Slack 통합**: Slack에서 직접 질문하고 즉시 개인 데이터 기반 답변 수령
- **안전한 인증**: NextAuth.js를 이용한 보안 인증 시스템

## 🛠 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM with SQLite
- **Deployment**: Vercel (권장)

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd slack-bot-frontend
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# GitHub App Configuration
GITHUB_APP_ID="your-github-app-id"
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nyour-private-key-here\n-----END RSA PRIVATE KEY-----"
NEXT_PUBLIC_GITHUB_APP_NAME="your-github-app-name"

# Slack OAuth (개발 시 설정 필요)
SLACK_CLIENT_ID=""
SLACK_CLIENT_SECRET=""
```

### 4. GitHub App 설정 (선택사항)
GitHub 연동을 사용하려면 GitHub App을 생성해야 합니다:

1. [GitHub Apps](https://github.com/settings/apps/new)에서 새 GitHub App 생성
2. **App name**: 원하는 이름 입력
3. **Homepage URL**: `https://your-domain.com`
4. **Callback URL**: `https://your-domain.com/auth/github/callback`
5. **Repository permissions**:
   - Contents: Read
   - Metadata: Read
   - Pull requests: Read
   - Issues: Read
6. **Private key** 생성 및 다운로드
7. App ID와 Private Key를 `.env` 파일에 추가

### 5. 데이터베이스 초기화
```bash
npx prisma migrate dev
```

### 6. 개발 서버 실행
```bash
npm run dev
```

애플리케이션이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 🚀 사용 방법

### 1. 회원가입 및 로그인
- 이메일과 비밀번호로 계정을 생성하세요
- 기존 계정이 있다면 로그인하세요

### 2. 서비스 연동 설정
- **Notion API 키**: [Notion Developers](https://www.notion.so/my-integrations)에서 Integration 생성
- **Notion 데이터베이스 ID**: 연동할 데이터베이스의 ID 입력
- **GitHub App 설치**: 안전한 GitHub App 방식으로 리포지토리 연동

### 3. Slack 연동
- Slack 워크스페이스와 봇을 연결하세요
- OAuth 인증을 통해 안전하게 연동됩니다

### 4. 서비스 이용
- Slack에서 봇에게 DM을 보내거나 채널에서 멘션하여 질문하세요
- 개인 Notion과 GitHub 데이터를 기반으로 답변을 받습니다

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/              # API 라우트
│   ├── auth/             # 인증 페이지 (로그인, 회원가입)
│   ├── dashboard/        # 대시보드 페이지
│   ├── setup/            # 설정 페이지들
│   └── page.tsx          # 메인 랜딩 페이지
├── components/           # 재사용 가능한 컴포넌트
├── lib/                  # 유틸리티 및 설정
└── types/                # TypeScript 타입 정의
```

## 🔒 보안

- 모든 API 키와 토큰은 암호화되어 데이터베이스에 저장됩니다
- NextAuth.js를 통한 안전한 세션 관리
- CORS 및 CSRF 보호 적용

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🔗 관련 링크

- [Notion API Documentation](https://developers.notion.com/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Slack API Documentation](https://api.slack.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## ❓ 문제 해결

### 일반적인 문제들

**Q: 데이터베이스 연결 오류가 발생합니다**
A: `.env` 파일의 `DATABASE_URL`이 올바른지 확인하고 `npx prisma db push`를 다시 실행해보세요.

**Q: Notion API 키가 작동하지 않습니다**
A: Notion Integration이 올바르게 생성되었고, 연동할 페이지/데이터베이스에 Integration이 추가되었는지 확인하세요.

**Q: GitHub App 설치 오류가 발생합니다**
A: GitHub App이 올바르게 생성되었고, 환경변수가 정확히 설정되었는지 확인하세요. Private Key에는 개행 문자(\n)가 포함되어야 합니다.

더 많은 도움이 필요하시면 이슈를 생성해 주세요.
