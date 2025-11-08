import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  image?: string;
  quantity?: number;
  price?: number;
  ctaLabel?: string;
  ctaHref?: string;
  onAction?: () => void;
}

interface ToastStore {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, "id"> & { id?: string }) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

const DEFAULT_DURATION = 5000;

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: ({ id, duration, ...toast }) => {
    const toastId = id ?? generateId();
    const toastDuration = duration ?? DEFAULT_DURATION;

    set((state) => ({
      toasts: [...state.toasts, { id: toastId, duration: toastDuration, ...toast }],
    }));

    if (toastDuration > 0) {
      setTimeout(() => {
        get().dismissToast(toastId);
      }, toastDuration);
    }

    return toastId;
  },
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

export function useToast() {
  const { showToast, dismissToast, clearToasts } = useToastStore();
  return { showToast, dismissToast, clearToasts };
}

