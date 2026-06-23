# 카카오 로그인 설정 가이드

## 1. 카카오 개발자 센터 앱 등록
1. https://developers.kakao.com 접속 후 로그인
2. "내 애플리케이션" → "애플리케이션 추가하기"
3. 아래 정보 입력 (나중에 변경 가능):
   - 앱 이름
   - 회사명
   - 카테고리
4. "저장"

## 2. 개인 개발자 비즈 앱 전환
> 카카오계정(이메일) 동의항목을 사용하려면 비즈 앱 전환이 필요해요.
> 비용은 없으며 개인 개발자도 신청 가능해요.

1. 앱 선택 → "앱 설정" → "앱" → "일반"
2. "개인 개발자 비즈 앱" 섹션 → "카카오비즈니스 통합 서비스 약관동의" 클릭
3. "개인개발자 비즈 앱 전환" 버튼 클릭
   > ⚠️ 앱 아이콘이 등록되어 있어야 전환 가능해요.

## 3. 카카오 로그인 활성화
앱 선택 → "제품 설정" → "카카오 로그인" → "일반"

1. **사용 설정**: ON
2. **OpenID Connect 활성화**: ON
   > ⚠️ 반드시 활성화해야 해요. 비활성화 시 idToken이 null로 반환되어 로그인이 안돼요.

## 4. 동의항목 설정
앱 선택 → "제품 설정" → "카카오 로그인" → "동의항목"

| 항목 | 설정 |
|------|------|
| 닉네임 | 필수 동의 |
| 프로필 사진 | 선택 동의 |
| 카카오계정(이메일) | 필수 동의 (비즈 앱 전환 후 가능) |

## 5. 플랫폼 키 설정
앱 선택 → "앱 설정" → "앱" → "플랫폼 키"

> ⚠️ 앱 생성 시 **대표 네이티브 앱 키**와 **Default REST API 키**가 자동 생성돼요.
> 새로 추가하지 말고 자동 생성된 대표 키에 정보를 입력하세요.

### 5.1 네이티브 앱 키 설정
1. 대표 네이티브 앱 키 클릭
2. 아래 정보 입력:

**iOS 앱 정보:**
- 번들 ID: app.config.ts의 `ios.bundleIdentifier` 값
  예) `com.yourcompany.appname`

**Android 앱 정보:**
- 패키지명: app.config.ts의 `android.package` 값
  예) `com.yourcompany.appname`
- 키 해시: 아래 명령어로 추출 (프로젝트 루트에서 실행)
```bash
  keytool -exportcert -alias androiddebugkey \
    -keystore ./android/app/debug.keystore \
    -storepass android -keypass android \
    | openssl sha1 -binary | openssl base64
```
  > ⚠️ `android/` 폴더가 없으면 `npx expo run:android`를 먼저 실행하세요.

3. 저장

### 5.2 앱 키 확인
앱 선택 → "앱 설정" → "앱" → "플랫폼 키"

| 키 종류 | 용도 |
|--------|------|
| 대표 네이티브 앱 키 | 앱 코드(.env, app.config.ts)에서 사용 |
| Default REST API 키 | Supabase에 입력 |

## 6. Client Secret 발급
앱 선택 → "앱 설정" → "앱" → "플랫폼 키" → REST API 키 클릭 → "클라이언트 시크릿"

1. "코드 발급" 클릭
2. 카카오 로그인 상태를 **"사용함"** 으로 변경
3. 발급된 코드 복사 → Supabase Kakao Client Secret Code에 입력

## 7. Supabase 설정
Supabase 대시보드 → Authentication → Providers → Kakao

| 항목 | 입력값 |
|------|-------|
| REST API Key | 카카오 플랫폼 키 → Default REST API 키 값 |
| Client Secret Code | 6단계에서 발급한 Client Secret 코드 |

"Save" 클릭

## 8. 환경변수 설정
`.env`에 입력:
EXPO_PUBLIC_KAKAO_APP_KEY=대표_네이티브_앱_키

## 9. app.config.ts 확인
```typescript
[
  '@react-native-kakao/core',
  {
    nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_APP_KEY,
    android: {
      authCodeHandlerActivity: true,
    },
    ios: {
      handleKakaoOpenUrl: true,
    },
  },
],
```

## 10. 설정 완료 후 재빌드
카카오 설정이 완료되면 재빌드해야 해요:
```bash
rm -rf ios android
npx expo run:ios
npx expo run:android
```