import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastState {
  visible: boolean;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  show: (params: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  type: "success",
  title: "",
  message: undefined,
  duration: 3000,
  show: ({ type = "success", title, message, duration = 3000 }) =>
    set({ visible: true, type, title, message, duration }),
  hide: () => set({ visible: false }),
}));
