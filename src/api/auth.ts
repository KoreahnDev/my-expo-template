import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store";
import { Tables } from "@/types/database.types";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  login as kakaoLogin,
  logout as kakaoLogout,
} from "@react-native-kakao/user";

type Profile = Tables<"profiles">;

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("getProfile error:", error);
    return null;
  }

  return data;
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();

    if (!data?.idToken) throw new Error("Google idToken을 받지 못했습니다.");

    const { data: authData, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: data.idToken,
    });

    if (error) throw error;

    if (authData.user) {
      await supabase
        .from("profiles")
        .update({ provider: "google" })
        .eq("id", authData.user.id);
      // store 즉시 업데이트
      const profile = await getProfile(authData.user.id);
      useAuthStore.getState().setProfile(profile);
    }
  } catch (error: any) {
    console.log("error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
    if (error.code === statusCodes.IN_PROGRESS) return;
    throw error;
  }
};

export const signInWithKakao = async () => {
  try {
    const { idToken, accessToken } = await kakaoLogin();

    if (!idToken) throw new Error("Kakao idToken을 받지 못했습니다.");

    const { data: authData, error } = await supabase.auth.signInWithIdToken({
      provider: "kakao",
      token: idToken,
      access_token: accessToken,
    });

    if (error) throw error;

    if (authData.user) {
      await supabase
        .from("profiles")
        .update({ provider: "kakao" })
        .eq("id", authData.user.id);
      // store 즉시 업데이트
      const profile = await getProfile(authData.user.id);
      useAuthStore.getState().setProfile(profile);
    }
  } catch (error) {
    console.error("signInWithKakao error:", error);
    throw error;
  }
};

export const signOut = async () => {
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const provider = session?.user?.app_metadata?.provider;
  const provider = useAuthStore.getState().profile?.provider;
  console.log("provider", provider);

  if (provider === "google") {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error("Google signOut error:", error);
    }
  } else if (provider === "kakao") {
    try {
      await kakaoLogout();
    } catch (error) {
      console.error("Kakao signOut error:", error);
    }
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
