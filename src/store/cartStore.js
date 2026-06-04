import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,
            activeDiscount: null,

            setCartOpen: (open) => set({ isCartOpen: open }),

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
                    set({
                        items: [...items, { ...product, quantity: 1 }],
                    })
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
                // If cart becomes empty, clear discount
                if (get().items.length === 0) {
                    set({ activeDiscount: null })
                }
            },

            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })
                // Re-validate SAVE50 if subtotal drops
                const discount = get().activeDiscount
                if (discount && discount.code === 'SAVE50') {
                    const subtotal = get().getTotalPrice()
                    if (subtotal < 200) {
                        set({ activeDiscount: null })
                    }
                }
            },

            clearCart: () => set({ items: [], activeDiscount: null }),

            applyPromoCode: (code) => {
                const normalized = code.trim().toUpperCase()
                if (normalized === 'LUXE10') {
                    set({ activeDiscount: { code: 'LUXE10', type: 'percent', value: 0.10 } })
                    return { success: true, message: '10% discount applied!' }
                }
                if (normalized === 'SAVE50') {
                    const subtotal = get().getTotalPrice()
                    if (subtotal < 200) {
                        return { success: false, message: 'Code SAVE50 requires a minimum order of $200.' }
                    }
                    set({ activeDiscount: { code: 'SAVE50', type: 'fixed', value: 50 } })
                    return { success: true, message: '$50.00 discount applied!' }
                }
                return { success: false, message: 'Invalid promo code.' }
            },

            clearPromoCode: () => set({ activeDiscount: null }),

            getDiscountAmount: () => {
                const discount = get().activeDiscount
                if (!discount) return 0
                const subtotal = get().getTotalPrice()
                if (discount.type === 'percent') {
                    return subtotal * discount.value
                }
                if (discount.type === 'fixed') {
                    return Math.min(subtotal, discount.value)
                }
                return 0
            },

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
            // Exclude isCartOpen from localStorage persistence
            partialize: (state) => {
                const { isCartOpen, ...rest } = state
                return rest
            }
        }
    )
)

export default useCartStore