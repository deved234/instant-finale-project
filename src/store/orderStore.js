import { create } from "zustand";
import { persist } from "zustand/middleware";

const buildOrderNumber = () =>
  `#LX-${Math.floor(Math.random() * 9000000 + 1000000)}`;

export const buildOrder = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
}) => ({
  orderNumber: buildOrderNumber(),
  createdAt: new Date().toISOString(),
  items: items.map((item) => ({ ...item })),
  subtotal,
  shipping,
  tax,
  total,
  status: "Processing",
  ...(shippingAddress ? { shippingAddress } : {}),
});

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      setOrders: (orders) => set({ orders }),

      createOrder: (payload) => {
        const newOrder = buildOrder(payload);

        set({
          currentOrder: newOrder,
          orders: [newOrder, ...get().orders],
        });

        return newOrder;
      },

      replaceOrders: (orders) => {
        const list = Array.isArray(orders) ? orders : [];
        set({
          orders: list,
          currentOrder: get().currentOrder ?? list[0] ?? null,
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
