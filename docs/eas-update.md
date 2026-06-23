# EAS Update (OTA) 설정 가이드

## 개요
EAS Update를 사용하면 앱스토어 심사 없이 JS/TS 코드, 이미지, 스타일 변경사항을
사용자 기기에 바로 배포할 수 있어요.

### OTA 가능한 변경사항
- JS/TS 코드 변경
- 이미지, 폰트 등 에셋 변경
- 스타일 변경

### OTA 불가능한 변경사항 (재빌드 필요)
- 네이티브 패키지 추가/제거
- app.config.ts 플러그인 변경
- ios/, android/ 폴더 직접 수정

---

## 1. EAS CLI 설치
```bash
npm install -g eas-cli
```

## 2. Expo 계정 로그인
```bash
eas login
```
> Expo 계정이 없으면 https://expo.dev 에서 가입하세요.
> 구글 소셜 로그인으로 가입했다면 expo.dev → 우측 상단 프로필 → Account Settings →
> Password 섹션에서 비밀번호를 먼저 설정해야 해요.

## 3. EAS 프로젝트 초기화
```bash
eas init
```

실행 후 아래와 같은 출력이 나와요:
✔ Created @your-username/your-app-name
Warning: Your project uses dynamic app configuration, and the EAS project ID
can't automatically be added to it.
https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs
To complete the setup process, set "extra.eas.projectId" in your app.config.ts:
{
"expo": {
"extra": {
"eas": {
"projectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
}
}
}
Cannot automatically write to dynamic config at: app.config.ts
Error: project:init command failed.

> ⚠️ dynamic config(app.config.ts)를 사용하기 때문에 자동으로 추가되지 않아요.
> 위 경고는 정상이에요. 출력된 `projectId`와 본인의 Expo username을
> `app.config.ts`에 수동으로 추가해야 해요.

`app.config.ts` 수정:
```typescript
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'your-expo-username',        // expo.dev 계정 username
  extra: {
    eas: {
      projectId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',  // 위에서 복사한 값
    },
  },
  name: 'your-app-name',
  // 나머지 동일...
```

`app.config.ts`에 추가하고 나면 이미 연결된 거예요.
아래 명령어로 연결을 확인할 수 있어요 (선택사항):
```bash
eas init
```
아래와 같이 출력되면 정상이에요:
```
✔ Project already linked (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
```

## 4. EAS Build 설정
```bash
eas build:configure
```
`eas.json`이 생성돼요. 생성된 파일을 아래와 같이 수정하세요.
`channel`과 Android `buildType` 추가가 필요해요:

```json
{
  "cli": {
    "version": ">= 18.9.1",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

> production은 스토어 제출용이라 aab(기본값)로 빌드돼요.
> development, preview는 내부 테스트용이라 apk로 빌드해요.

## 5. expo-updates 설치
```bash
npx expo install expo-updates
```

## 6. app.config.ts 설정 확인
아래 내용이 추가되어 있는지 확인하세요:
```typescript
updates: {
  url: 'https://u.expo.dev/<projectId>',  // 3단계의 projectId로 교체
  enabled: true,
  checkAutomatically: 'ON_LOAD',
  fallbackToCacheTimeout: 0,
},
runtimeVersion: {
  policy: 'appVersion',
},
```

## 7. OTA 업데이트 배포

### 채널별 배포
```bash
# 개발 채널
eas update --channel development --message "업데이트 내용"

# 프리뷰 채널 (내부 테스트)
eas update --channel preview --message "업데이트 내용"

# 프로덕션 채널
eas update --channel production --message "업데이트 내용"
```

### 재빌드가 필요한 경우
```bash
# 로컬 빌드
npx expo run:ios
npx expo run:android

# EAS 클라우드 빌드
eas build --platform ios --profile production
eas build --platform android --profile production
```

## 주의사항

- JS/TS 코드만 변경 → `eas update` (version 유지)
- 네이티브 코드 변경 → `app.config.ts`의 version 올리고 → `eas build` 후 스토어 제출
- 스토어 빌드번호(iOS: buildNumber, Android: versionCode)는 `autoIncrement`로 자동 관리
- OTA 업데이트는 동일한 version으로 빌드된 앱에만 적용