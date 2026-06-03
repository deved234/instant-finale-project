import { create } from "zustand";

const useToastStore = create((set) => ({
  toast: null,

  showToast: (message, type = "success") => {
    const id = Date.now();
    set({ toast: { id, message, type } });

    window.setTimeout(() => {
      set((state) => (state.toast?.id === id ? { toast: null } : state));
    }, 2400);
  },

  hideToast: () => set({ toast: null }),
}));

export default useToastStore;
