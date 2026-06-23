# my-expo-template

Expo + React Native 앱 개발을 위한 보일러플레이트 템플릿입니다.
새 프로젝트를 시작할 때 반복되는 초기 설정을 줄이기 위해 만들었습니다.

## 기술 스택

| 분류 | 라이브러리 | 버전 | 사용 위치 |
|------|-----------|------|---------|
| 프레임워크 | Expo | SDK 56 | - |
| 프레임워크 | React Native | 0.85.3 | - |
| 라우팅 | expo-router | ~56.2.9 | src/app/ |
| 백엔드 | @supabase/supabase-js | ^2.107.0 | src/lib/supabase.ts |
| 상태관리 | zustand | ^5.0.14 | src/store/ |
| 서버 상태 | @tanstack/react-query | ^5.101.0 | src/app/_layout.tsx (QueryClientProvider) |
| 소셜 로그인 | @react-native-google-signin/google-signin | ^16.1.2 | src/api/auth.ts, src/app/_layout.tsx |
| 소셜 로그인 | @react-native-kakao/core | ^2.4.5 | src/app/_layout.tsx |
| 소셜 로그인 | @react-native-kakao/user | ^2.4.5 | src/api/auth.ts |
| OTA 업데이트 | expo-updates | - | src/hooks/useOTAUpdate.ts |

## 기능

- Google 로그인 / 카카오 로그인
- 자동 인증 분기 (로그인/비로그인 화면)
- 글로벌 로딩 인디케이터
- 다크/라이트/시스템 테마 지원
- OTA 업데이트 (EAS Update)
- 공통 컴포넌트 (Button, Text, Input, Divider, Screen)

## 폴더 구조

src/
├── app/
│   ├── _layout.tsx       # 루트 레이아웃 (인증 분기, SDK 초기화, QueryClientProvider)
│   ├── (auth)/           # 비로그인 화면
│   │   ├── _layout.tsx
│   │   └── login.tsx     # 소셜 로그인 화면
│   └── (app)/            # 로그인 후 화면
│       ├── _layout.tsx
│       └── index.tsx     # 홈 (컴포넌트 샘플)
├── components/
│   ├── auth/
│   │   ├── GoogleLoginButton.tsx
│   │   └── KakaoLoginButton.tsx
│   └── common/
│       ├── Button.tsx    # variants: primary, secondary, outline, danger
│       ├── Text.tsx      # variants: h1, h2, h3, body, secondary, caption, code
│       ├── Input.tsx     # label, error 지원
│       ├── Divider.tsx   # label 지원
│       ├── Screen.tsx    # SafeArea 래퍼
│       └── LoadingOverlay.tsx  # 글로벌 로딩
├── lib/
│   └── supabase.ts       # Supabase 클라이언트 초기화
├── store/
│   ├── index.ts          # store re-export
│   ├── authStore.ts      # 인증 상태 (profile, isLoading)
│   ├── loadingStore.ts   # 글로벌 로딩 상태
│   └── themeStore.ts     # 테마 설정 (system/light/dark, AsyncStorage 저장)
├── api/
│   └── auth.ts           # signInWithGoogle, signInWithKakao, signOut, getProfile
├── hooks/
│   ├── useAuth.ts        # 세션 감지, profile 로드 (onAuthStateChange)
│   ├── useTheme.ts       # 테마 훅 (colors, isDark, colorScheme)
│   └── useOTAUpdate.ts   # OTA 업데이트 체크 (앱 시작 시 자동 실행)
├── constants/
│   └── theme.ts          # Colors, BrandColors, BadgeColors, FontSize, Spacing, Radius 등
└── types/
├── auth.ts           # AuthProvider 타입
├── common.ts         # ApiResponse 타입
└── database.types.ts # Supabase CLI 자동 생성 (npx supabase gen types)
supabase/
├── functions/            # Edge Functions
└── migrations/           # DB 마이그레이션
docs/
├── supabase.md
├── google-login.md
├── kakao-login.md
└── eas-update.md

## 새 프로젝트 시작

1. GitHub 우측 상단 **"Use this template"** → **"Create a new repository"** 클릭
2. 새 repo 이름 입력 후 생성
3. 로컬에 clone
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```
4. 패키지 설치
```bash
npm install
```
5. [CHECKLIST.md](CHECKLIST.md) 따라 순서대로 진행

## 상세 가이드

- [Supabase 설정](docs/supabase.md)
- [Google 로그인 설정](docs/google-login.md)
- [카카오 로그인 설정](docs/kakao-login.md)
- [EAS Update (OTA) 설정](docs/eas-update.md)

## 버전 정보

[TEMPLATE_VERSION.md](TEMPLATE_VERSION.md) 참고