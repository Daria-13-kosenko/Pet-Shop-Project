import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id } = payload
      if (!id) return
      if (state.items[id]) {
        state.items[id].qty += 1
      } else {
        state.items[id] = { ...payload, qty: 1 }
      }
    },
    increment: (state, { payload }) => {
      const id = payload
      if (state.items[id]) state.items[id].qty += 1
    },
    decrement: (state, { payload }) => {
      const id = payload
      if (!state.items[id]) return
      state.items[id].qty -= 1
      if (state.items[id].qty <= 0) delete state.items[id]
    },
    removeFromCart: (state, { payload }) => {
      const id = payload
      delete state.items[id]
    },
    clearCart: (state) => {
      state.items = {}
    },
  },
})

export const { addToCart, increment, decrement, removeFromCart, clearCart } =
  cartSlice.actions

export const selectCartItemsArray = (s) => Object.values(s.cart.items)

export const selectCartCount = (s) =>
  Object.values(s.cart.items).reduce((sum, it) => sum + it.qty, 0)

export const selectCartTotal = (s) =>
  Object.values(s.cart.items).reduce((sum, it) => sum + it.price * it.qty, 0)

export default cartSlice.reducer
