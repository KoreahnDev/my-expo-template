# Google 로그인 설정 가이드

## 1. Google Cloud Console 프로젝트 생성
1. https://console.cloud.google.com 접속 후 로그인
2. 상단 프로젝트 선택 → "새 프로젝트" 클릭
3. 프로젝트 이름 입력 후 "만들기"

## 2. OAuth 동의 화면 설정
1. 좌측 메뉴 → "API 및 서비스" → "OAuth 동의 화면"
2. User Type: **"외부"** 선택 후 "만들기"
3. 아래 정보 입력:
   - 앱 이름
   - 사용자 지원 이메일
   - 개발자 연락처 이메일
4. "저장 후 계속" 클릭 (나머지 단계는 기본값으로 진행)

## 3. OAuth 클라이언트 ID 발급

### Web 클라이언트 ID (Supabase 연동용)
1. 좌측 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
3. 애플리케이션 유형: **"웹 애플리케이션"** 선택
4. 승인된 리디렉션 URI 추가:
  https://<project-id>.supabase.co/auth/v1/callback
  > project-id: Supabase 대시보드 URL에서 확인
  > 예) https://supabase.com/dashboard/project/**abcdefgh** → abcdefgh
5. "만들기" 클릭
6. 발급된 **클라이언트 ID**, **클라이언트 Secret** 복사
7. Supabase 대시보드 → Authentication → Providers → Google에 입력

`.env`에 입력:
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=발급받은_Web_클라이언트_ID

### iOS 클라이언트 ID
1. "사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
2. 애플리케이션 유형: **"iOS"** 선택
3. 번들 ID 입력 (app.config.ts의 `ios.bundleIdentifier` 값)
   예) `com.yourcompany.appname`
4. "만들기" 클릭
5. 발급된 클라이언트 ID 복사

`.env`에 입력:
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=발급받은_iOS_클라이언트_ID

iOS URL Scheme 설정:
- 클라이언트 ID를 역순으로 변환해서 입력해요
- 예) `17068915795-xxxx.apps.googleusercontent.com`
  → `com.googleusercontent.apps.17068915795-xxxx`

`.env`에 입력:
EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME=com.googleusercontent.apps.17068915795-xxxx

### Android 클라이언트 ID
1. Android 키해시 추출 (프로젝트 루트에서 실행)
```bash
   keytool -exportcert -alias androiddebugkey \
     -keystore ./android/app/debug.keystore \
     -storepass android -keypass android \
     | openssl sha1 -binary | openssl base64
```
   > ⚠️ `android/` 폴더가 없으면 `npx expo run:android`를 먼저 실행하세요.
   > ⚠️ `./android/app/debug.keystore`는 debug 빌드용이에요.
   > 실서비스 배포 시 EAS Build로 생성된 release keystore를 사용해야 해요.

2. "사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
3. 애플리케이션 유형: **"Android"** 선택
4. 패키지 이름 입력 (app.config.ts의 `android.package` 값)
   예) `com.yourcompany.appname`
5. SHA-1 인증서 지문에 위에서 추출한 키해시 입력
6. "만들기" 클릭
7. 발급된 클라이언트 ID 복사

`.env`에 입력:
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=발급받은_Android_클라이언트_ID

## 4. app.config.ts 확인
```typescript
[
  '@react-native-google-signin/google-signin',
  {
    iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME,
  },
],
```

## 5. 설정 완료 후 재빌드
Google 설정이 완료되면 반드시 재빌드해야 해요:
```bash
rm -rf ios android
npx expo run:ios
npx expo run:android
```