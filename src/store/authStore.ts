import { Tables } from "@/types/database.types";
import { create } from "zustand";

type Profile = Tables<"profiles">;

interface AuthStore {
  profile: Profile | null;
  isLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  profile: null,
  isLoading: false,
  setProfile: (profile) => set({ profile }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ profile: null }),
}));
