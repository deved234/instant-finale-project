import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: ({ items, subtotal, shipping, tax, total }) => {
        const orderNumber = `#LX-${Math.floor(
          Math.random() * 9000000 + 1000000,
        )}`;

        const newOrder = {
          orderNumber,
          createdAt: new Date().toISOString(),
          items: items.map((item) => ({ ...item })),
          subtotal,
          shipping,
          tax,
          total,
          status: "Processing",
        };

        set({
          currentOrder: newOrder,
          orders: [newOrder, ...get().orders],
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

