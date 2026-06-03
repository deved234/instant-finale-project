import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      currentOrder: null,

      createOrder: ({ items, subtotal, shipping, tax, total }) => {
        const orderNumber = `#LX-${Math.floor(
          Math.random() * 9000000 + 1000000,
        )}`;

        set({
          currentOrder: {
            orderNumber,
            createdAt: new Date().toISOString(),
            items: items.map((item) => ({ ...item })),
            subtotal,
            shipping,
            tax,
            total,
          },
        });
      },

      clearOrder: () => set({ currentOrder: null }),
    }),
    {
      name: "order-storage",
    },
  ),
);

export default useOrderStore;
