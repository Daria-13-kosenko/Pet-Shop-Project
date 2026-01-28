import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  items: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const id = payload?.id ?? payload?._id
      if (!id) return

      const key = String(id)

      if (state.items[key]) {
        state.items[key].qty += 1
      } else {
        state.items[key] = { ...payload, qty: 1 }
      }
    },

    increment: (state, { payload }) => {
      const key = String(payload)
      if (state.items[key]) state.items[key].qty += 1
    },

    decrement: (state, { payload }) => {
      const key = String(payload)
      if (!state.items[key]) return
      state.items[key].qty -= 1
      if (state.items[key].qty <= 0) delete state.items[key]
    },

    removeFromCart: (state, { payload }) => {
      const key = String(payload)
      delete state.items[key]
    },

    clearCart: (state) => {
      state.items = {}
      localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, increment, decrement, removeFromCart, clearCart } =
  cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartItemsArray = createSelector([selectCartItems], (items) =>
  Object.values(items),
)

export const selectCartCount = createSelector([selectCartItemsArray], (arr) =>
  arr.reduce((sum, it) => sum + (Number(it.qty) || 0), 0),
)

export const selectCartTotal = createSelector([selectCartItemsArray], (arr) =>
  arr.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
    0,
  ),
)

export default cartSlice.reducer
