import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  message: string | null;
  show: (message?: string | null) => void;
  hide: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  message: null,
  show: (message = null) => set({ isLoading: true, message }),
  hide: () => set({ isLoading: false, message: null }),
}));
