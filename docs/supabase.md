# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성
1. https://supabase.com 접속 후 로그인
2. "New project" 클릭
3. 아래 정보 입력:
   - Project name: 앱 이름
   - Database Password: 안전한 비밀번호 입력 (따로 저장해두세요)
   - Region: **Northeast Asia (Seoul)** 권장
4. "Create new project" 클릭 (생성까지 약 1~2분 소요)

## 2. 환경변수 확인
Supabase 대시보드 → Settings → API

- **Project URL** → `.env`의 `EXPO_PUBLIC_SUPABASE_URL`에 입력
- **anon public** → `.env`의 `EXPO_PUBLIC_SUPABASE_ANON_KEY`에 입력

## 3. profiles 테이블 생성
Supabase 대시보드 → SQL Editor → "New query"에서 아래 SQL 실행

```sql
---
-- 1. profiles
-- auth.users 와 1:1 연결. Google OAuth 로그인 시 자동 생성.
---

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  push_token text,
  provider text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS '유저 프로필. auth.users 와 1:1 연결';
COMMENT ON COLUMN public.profiles.id IS 'auth.users.id 와 동일';
COMMENT ON COLUMN public.profiles.email IS 'Google OAuth 이메일';
COMMENT ON COLUMN public.profiles.full_name IS 'Google OAuth 표시 이름';
COMMENT ON COLUMN public.profiles.avatar_url IS 'Google 프로필 사진 URL (Google CDN)';
COMMENT ON COLUMN public.profiles.push_token IS 'Expo Push Token';
COMMENT ON COLUMN public.profiles.provider IS '마지막 로그인 OAuth provider';

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 본인 프로필만 읽기/쓰기 가능
CREATE POLICY "profiles: select own" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles: insert own" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: update own" ON public.profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 회원가입 시 자동으로 profiles 레코드 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
INSERT INTO public.profiles (id, email, full_name, avatar_url)
VALUES (
new.id,
new.email,
new.raw_user_meta_data ->> 'full_name',
new.raw_user_meta_data ->> 'avatar_url'
);
RETURN new;
END;

$$
;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 4. Google OAuth 활성화
1. Supabase 대시보드 → Authentication → Providers → Google
2. "Enable Sign in with Google" 토글 ON
3. Google Cloud Console에서 발급한 값 입력:
   - **Client ID**: Web 클라이언트 ID
   - **Client Secret**: Web 클라이언트 Secret
4. "Save" 클릭

> Google Cloud Console 설정은 [docs/google-login.md](google-login.md) 참고

## 5. Kakao OAuth 활성화
1. Supabase 대시보드 → Authentication → Providers → Kakao
2. "Enable Sign in with Kakao" 토글 ON
3. 카카오 개발자 센터에서 발급한 값 입력:
   - **REST API Key**: 카카오 플랫폼 키 → Default REST API 키
   - **Client Secret Code**: 카카오 플랫폼 키 → REST API 키 → 클라이언트 시크릿 → 카카오 로그인 코드
4. "Save" 클릭

> 카카오 설정은 [docs/kakao-login.md](kakao-login.md) 참고

## 6. Supabase CLI로 타입 생성
DB 스키마 기반으로 TypeScript 타입을 자동 생성해요.

```bash
# 최초 1회 로그인
npx supabase login

# 타입 생성
# project-id: Supabase 대시보드 URL에서 확인
# 예) https://supabase.com/dashboard/project/abcdefgh → project-id: abcdefgh
npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts
```

> ⚠️ profiles 테이블(모든 테이블) 스키마가 변경될 때마다 타입을 재생성해야 해요.