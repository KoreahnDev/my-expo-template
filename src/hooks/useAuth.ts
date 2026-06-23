import { getProfile } from "@/api/auth";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

export const useAuth = () => {
  const { profile, isLoading, setProfile, setIsLoading, logout } =
    useAuthStore();

  useEffect(() => {
    setIsLoading(true);

    // 현재 세션 확인
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await getProfile(session.user.id);
        setProfile(profile);
      }
      setIsLoading(false);
    });

    // 세션 변경 감지 (로그인/로그아웃)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        if (event === "SIGNED_IN") {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const profile = await getProfile(session.user.id);
        setProfile(profile);
      } else {
        logout();
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { profile, isLoading };
};
