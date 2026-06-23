# 새 프로젝트 시작 체크리스트

## 1. 템플릿 복사 및 설치

### 1.1 GitHub에서 새 repo 생성
1. 이 템플릿 repo의 GitHub 페이지 접속
2. 우측 상단 **"Use this template"** 버튼 클릭
3. **"Create a new repository"** 클릭
4. repo 이름 입력 후 **"Create repository"** 클릭

> ⚠️ `git clone`으로 직접 복사하면 원본 템플릿의 git 히스토리가 딸려오고
> origin이 원본을 가리키게 돼요. 반드시 "Use this template"을 사용하세요.

### 1.2 로컬에 clone 및 설치
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```

## 2. 환경변수 설정
> 이후 모든 설정값은 이 파일에 입력해요.

```bash
cp .env.example .env
```

`.env` 파일을 열어서 값을 채울 준비를 해두세요. 이후 단계에서 하나씩 채워나갈 거예요:

Supabase
EXPO_PUBLIC_SUPABASE_URL=             ← 3단계에서 입력
EXPO_PUBLIC_SUPABASE_ANON_KEY=        ← 3단계에서 입력
Google Login
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=     ← 5단계에서 입력
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=     ← 5단계에서 입력
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID= ← 5단계에서 입력
EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME=    ← 5단계에서 입력
Kakao
EXPO_PUBLIC_KAKAO_APP_KEY=            ← 6단계에서 입력
App
EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER=    ← 지금 입력
EXPO_PUBLIC_ANDROID_PACKAGE=          ← 지금 입력

## 3. 앱 기본 정보 변경
`app.config.ts` 수정:
- [ ] `name` 변경 (앱 이름)
- [ ] `slug` 변경 (소문자, 하이픈만 사용. 예: my-awesome-app)
- [ ] `scheme` 변경 (소문자, 하이픈 없이. 예: myawesomeapp)

`.env` 파일에 입력:
- [ ] `EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER` 입력 (예: com.yourcompany.appname)
- [ ] `EXPO_PUBLIC_ANDROID_PACKAGE` 입력 (예: com.yourcompany.appname)

## 4. Supabase 설정
> 상세 가이드: [docs/supabase.md](docs/supabase.md)

- [ ] Supabase 프로젝트 생성 및 테이블 설정 (docs/supabase.md 참고)
- [ ] `.env`에 Supabase 값 입력
  - `EXPO_PUBLIC_SUPABASE_URL`: Supabase 대시보드 → Settings → API → Project URL
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase 대시보드 → Settings → API → anon public
- [ ] Supabase CLI로 타입 생성
```bash
# 최초 1회 로그인
npx supabase login

# 타입 생성 (<project-id>는 Supabase 대시보드 URL에서 확인)
# 예: https://supabase.com/dashboard/project/abcdefgh → project-id: abcdefgh
npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts
```

## 5. 첫 빌드 실행
> ios/, android/ 폴더가 생성되어야 이후 Google/카카오 로그인 설정이 가능해요.
> 지금은 로그인 기능이 동작하지 않아도 괜찮아요.

- [ ] iOS 빌드
```bash
npx expo run:ios
```
- [ ] Android 빌드
```bash
npx expo run:android
```

## 6. Google 로그인 설정
> 상세 가이드: [docs/google-login.md](docs/google-login.md)

- [ ] Google Cloud Console에서 OAuth 클라이언트 ID 발급 (docs/google-login.md 참고)
- [ ] Supabase 대시보드에 Google 클라이언트 ID/Secret 입력
- [ ] `.env`에 Google 값 입력
  - `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
  - `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
  - `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`
  - `EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME` (iOS 클라이언트 ID를 역순 변환한 값)
    예) `17068915795-xxxx.apps.googleusercontent.com` → `com.googleusercontent.apps.17068915795-xxxx`
- [ ] `app.config.ts`의 `iosUrlScheme`에 동일한 값 입력
```typescript
[
  '@react-native-google-signin/google-signin',
  {
    iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME,
  },
],
```

## 7. 카카오 로그인 설정
> 상세 가이드: [docs/kakao-login.md](docs/kakao-login.md)

- [ ] 카카오 개발자 센터 앱 등록 (docs/kakao-login.md 참고)
- [ ] `.env`에 카카오 값 입력
  - `EXPO_PUBLIC_KAKAO_APP_KEY`: 카카오 개발자 센터 → 앱 키 → 네이티브 앱 키
- [ ] `app.config.ts`의 `nativeAppKey`에 동일한 값 입력
```typescript
[
  '@react-native-kakao/core',
  {
    nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_APP_KEY,
    android: { authCodeHandlerActivity: true },
    ios: { handleKakaoOpenUrl: true },
  },
],
```

## 8. 재빌드 및 로그인 테스트
> Google/카카오 설정이 완료되었으니 재빌드 후 로그인을 테스트해요.

- [ ] iOS 재빌드
```bash
rm -rf ios
npx expo run:ios
```
- [ ] Android 재빌드
```bash
rm -rf android
npx expo run:android
```
- [ ] Google 로그인/아웃 테스트 ✅
- [ ] 카카오 로그인/아웃 테스트 ✅

## 9. EAS 설정 (OTA 업데이트)
> 상세 가이드: [docs/eas-update.md](docs/eas-update.md)

### 9.1 EAS CLI 설치 및 로그인
```bash
# EAS CLI 설치
npm install -g eas-cli

# 로그인 (expo.dev 계정 필요)
# 구글 소셜 로그인으로 가입했다면 expo.dev → Account Settings에서 비밀번호를 먼저 설정하세요.
eas login
```

### 9.2 EAS 프로젝트 초기화
```bash
eas init
```
dynamic config(app.config.ts)를 사용하기 때문에 자동으로 설정이 추가되지 않아요.
명령 실행 후 출력되는 값을 `app.config.ts`에 수동으로 추가해야 해요:

✔ Created @your-username/your-app-name
Warning: Your project uses dynamic app configuration...
To complete the setup process, set "extra.eas.projectId" in your app.config.ts:
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  ← 이 값을 복사
      }
    }
  }
}

`app.config.ts`에 아래 내용 추가:
```typescript
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'your-expo-username',  // ← expo.dev 계정 username
  extra: {
    eas: {
      projectId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',  // ← 위에서 복사한 값
    },
  },
  name: 'your-app-name',
  // 나머지 동일...
```

### 9.3 EAS Build 설정
```bash
eas build:configure
```
`eas.json`이 생성돼요. (이미 생성되어 있으면 건너뛰어요)

## 10. 개발 시작 🚀
- [ ] `src/app/(app)/index.tsx` 샘플 코드를 참고해서 개발 시작
- [ ] 필요 없는 샘플 코드 정리
- [ ] CHECKLIST.md 삭제 (선택사항)