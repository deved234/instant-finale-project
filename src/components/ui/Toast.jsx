import { CheckCircle, X } from "lucide-react";
import useToastStore from "../../store/toastStore";

const Toast = () => {
  const { toast, hideToast } = useToastStore();

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-6 z-[80] max-w-sm rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-2xl shadow-slate-300/40">
      <div className="flex items-center gap-3">
        <CheckCircle
          className={`w-5 h-5 ${
            toast.type === "success" ? "text-green-600" : "text-blue-700"
          }`}
        />
        <p className="text-sm font-medium text-gray-800">{toast.message}</p>
        <button
          onClick={hideToast}
          aria-label="Dismiss notification"
          className="ml-2 text-gray-400 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
