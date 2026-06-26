# 템플릿 버전 기록

## v1.0.0 (2025-06)

### 기술 스택
| 분류 | 라이브러리 | 버전 |
|------|-----------|------|
| 프레임워크 | Expo | SDK 56 (~56.0.9) |
| 프레임워크 | React Native | 0.85.3 |
| 프레임워크 | React | 19.2.3 |
| 라우팅 | expo-router | ~56.2.9 |
| 백엔드 | @supabase/supabase-js | ^2.107.0 |
| 스토리지 | @react-native-async-storage/async-storage | 2.2.0 |
| 상태관리 | zustand | ^5.0.14 |
| 서버 상태 | @tanstack/react-query | ^5.101.0 |
| 소셜 로그인 | @react-native-google-signin/google-signin | ^16.1.2 |
| 소셜 로그인 | @react-native-kakao/core | ^2.4.5 |
| 소셜 로그인 | @react-native-kakao/user | ^2.4.5 |
| OTA 업데이트 | expo-updates | - |
| 다국어 | expo-localization | - |
| 다국어 | i18n-js | - |
| 애니메이션 | react-native-reanimated | 4.3.1 |
| 제스처 | react-native-gesture-handler | ~2.31.1 |
| SVG | react-native-svg | - |

### 공통 컴포넌트
| 컴포넌트 | 설명 |
|---------|------|
| Button | variants: primary, secondary, outline, danger / sizes: sm, md, lg |
| Text | variants: h1, h2, h3, body, secondary, caption, code |
| Input | label, error 지원 |
| Divider | label 지원 |
| Screen | SafeArea 래퍼 |
| LoadingOverlay | 글로벌 로딩 (zustand 연동) |
| Modal | Alert/Dialog (버튼 1개 또는 2개, danger variant 지원) |
| Toast | 상단 알림 (success/error/warning/info, zustand 연동) |
| Badge | 텍스트/숫자 뱃지 (success/error/warning/info/neutral) |
| Avatar | 이니셜/이미지 아바타 (다크모드 지원, 크기 sm/md/lg) |
| EmptyState | 빈 상태 화면 (아이콘/타이틀/메시지/액션 버튼) |
| Card | 컨텐츠 컨테이너 (onPress 지원) |

### 테스트 환경
- iOS 18 (시뮬레이터)
- Android 15 (에뮬레이터)
- macOS Sequoia 15

---

## 업데이트 방법
새로운 Expo SDK가 릴리즈되면 아래 순서로 업데이트합니다.

```bash
# 1. Expo SDK 업그레이드
npx expo upgrade

# 2. 의존성 확인
npx expo-doctor

# 3. iOS/Android 폴더 재생성
rm -rf ios android
npx expo run:ios
npx expo run:android
```

업데이트 후 이 파일에 새 버전을 추가하세요.