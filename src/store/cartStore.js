import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const items = get().items
                const exists = items.find((item) => item.id === product.id)

                if (exists) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    })
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] })
                }
            },

            removeItem: (id) =>
                set({ items: get().items.filter((item) => item.id !== id) }),

            updateQuantity: (id, quantity) =>
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }),

            clearCart: () => set({ items: [] }),

            getTotalPrice: () =>
                get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),

            getTotalItems: () =>
                get().items.reduce((total, item) => total + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
        }
    )
)

export default useCartStore