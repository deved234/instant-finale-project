import { CheckCircle, AlertCircle, X } from "lucide-react";
import useToastStore from "../../store/toastStore";

const toastStyles = {
  success: {
    icon: CheckCircle,
    iconClass: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-900/50",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-900/50",
  },
  info: {
    icon: CheckCircle,
    iconClass: "text-blue-700 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/50",
  },
};

const Toast = () => {
  const { toast, hideToast } = useToastStore();

  if (!toast) return null;

  const style = toastStyles[toast.type] || toastStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`fixed top-15 right-6 z-[80] max-w-sm rounded-xl border bg-white dark:bg-slate-900 px-4 py-3 shadow-2xl shadow-slate-300/40 dark:shadow-black/40 ${style.border}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 shrink-0 ${style.iconClass}`} />
        <p className="text-sm font-medium text-gray-800 dark:text-slate-100">
          {toast.message}
        </p>
        <button
          onClick={hideToast}
          aria-label="Dismiss notification"
          className="ml-auto shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
