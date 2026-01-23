import { createSlice } from '@reduxjs/toolkit'

// items: [{ id, title, price, discount_price, quantity }]
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload
      if (!p?.id) return

      const existing = state.items.find((i) => i.id === p.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: p.id,
          title: p.title ?? p.name ?? '',
          price: p.price ?? 0,
          discount_price: p.discount_price ?? p.discont_price ?? null,
          quantity: 1,
        })
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((i) => i.id !== id)
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload ?? {}
      const item = state.items.find((i) => i.id === id)
      if (!item) return
      const q = Number(quantity)
      item.quantity = Number.isFinite(q) ? Math.max(1, Math.floor(q)) : 1
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, setQuantity, clearCart } =
  cartSlice.actions

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => {
    const price = i.discount_price ?? i.discont_price ?? i.price ?? 0
    return sum + Number(price) * Number(i.quantity)
  }, 0)

export default cartSlice.reducer
