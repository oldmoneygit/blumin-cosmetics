"use client";

import Image from "next/image";
import { CheckCircle2, AlertTriangle, Info, X, ShoppingBag } from "lucide-react";
import { useToastStore, ToastType } from "@/hooks/useToast";
import { formatPrice } from "@/lib/utils";
import { useMemo, type ReactNode } from "react";

const iconByType: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-pink-500" />,
  error: <AlertTriangle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const accentGradientByType: Record<ToastType, string> = {
  success: "from-pink-500 via-rose-500 to-purple-500",
  error: "from-red-500 via-rose-500 to-orange-500",
  info: "from-blue-500 via-sky-500 to-cyan-500",
};

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  const renderedToasts = useMemo(
    () =>
      toasts.map((toast) => {
        const type: ToastType = toast.type ?? "info";
        const icon = iconByType[type];
        const gradient = accentGradientByType[type];
        const quantity = toast.quantity ?? 1;
        const total = toast.price ? toast.price * quantity : undefined;

        const handleAction = () => {
          if (toast.onAction) {
            toast.onAction();
          }
          dismissToast(toast.id);
        };

        const ActionElement = toast.ctaLabel && (toast.ctaHref || toast.onAction) && (
          toast.ctaHref ? (
            <a
              href={toast.ctaHref}
              onClick={() => dismissToast(toast.id)}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-[1.02]"
            >
              {toast.ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              onClick={handleAction}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-[1.02]"
            >
              {toast.ctaLabel}
            </button>
          )
        );

        return (
          <div
            key={toast.id}
            className="pointer-events-auto w-full max-w-[360px] transform transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_25px_45px_rgba(236,72,153,0.35)]"
            role="status"
            aria-live="polite"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-pink-100 shadow-[0_25px_65px_-30px_rgba(236,72,153,1)]">
              <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${gradient}`} />

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Fechar notificação"
                className="absolute right-3 top-3 rounded-full bg-white/70 p-1 text-gray-400 shadow-sm transition-colors hover:bg-white hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 px-4 py-4 sm:px-5">
                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 shadow-inner">
                  {toast.image ? (
                    <Image
                      src={toast.image}
                      alt={toast.title}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-pink-400">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                  )}
                  <div className={`absolute -bottom-2 -right-2 inline-flex items-center justify-center rounded-full border border-white bg-gradient-to-r ${gradient} p-1.5 shadow-lg`}>
                    {icon}
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  {toast.description && (
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-pink-600">
                      {toast.description}
                    </span>
                  )}
                  <p className="text-sm font-bold leading-tight text-gray-900 sm:text-base">
                    {toast.title}
                  </p>
                  {quantity > 1 && (
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Cantidad: <span className="text-gray-900">{quantity}</span>
                    </p>
                  )}
                  {total !== undefined && (
                    <p className="text-xs text-gray-600">
                      {quantity > 1 ? "Subtotal" : "Precio"}:{" "}
                      <span className="font-semibold text-gray-900">
                        {formatPrice(total)}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {(ActionElement || quantity > 0) && (
                <div className="flex items-center gap-3 border-t border-pink-100/70 bg-gradient-to-b from-white to-white/80 px-4 py-3 sm:px-5">
                  {ActionElement}
                  <div className="ml-auto text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    {new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }),
    [toasts, dismissToast]
  );

  if (renderedToasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-6 right-6 z-[9999] flex flex-col gap-4">
      {renderedToasts}
    </div>
  );
}

