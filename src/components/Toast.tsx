import React from 'react';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { ToastItem } from '../types';

interface ToastProps {
  toasts: ToastItem[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isSuccess = toast.type === 'success';

        let icon = <Info className="w-4 h-4 shrink-0" />;
        let bgClass = 'bg-slate-800 text-white';

        if (isError) {
          icon = <AlertCircle className="w-4 h-4 shrink-0 text-white" />;
          bgClass = 'bg-rose-600 text-white';
        } else if (isSuccess) {
          icon = <CheckCircle className="w-4 h-4 shrink-0 text-white" />;
          bgClass = 'bg-emerald-600 text-white';
        }

        return (
          <div
            key={toast.id}
            className={`p-4 rounded-2xl shadow-xl text-xs font-bold flex items-center space-x-2 transition-all transform pointer-events-auto border border-white/10 animate-fade-in ${bgClass}`}
          >
            {icon}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
