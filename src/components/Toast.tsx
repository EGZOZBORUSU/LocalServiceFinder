import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Info, WarningCircle, X } from '@phosphor-icons/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const iconColor =
          toast.type === 'success'
            ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
            : toast.type === 'error'
            ? 'text-rose-600 bg-rose-50 border-rose-200'
            : toast.type === 'warning'
            ? 'text-amber-600 bg-amber-50 border-amber-200'
            : 'text-indigo-600 bg-indigo-50 border-indigo-200';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 transition-all transform translate-y-0"
            role="alert"
          >
            <div className={`p-2 rounded-lg border ${iconColor} shrink-0`}>
              {toast.type === 'success' && <CheckCircle size={20} weight="fill" />}
              {toast.type === 'error' && <WarningCircle size={20} weight="fill" />}
              {toast.type === 'warning' && <WarningCircle size={20} weight="fill" />}
              {toast.type === 'info' && <Info size={20} weight="fill" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
