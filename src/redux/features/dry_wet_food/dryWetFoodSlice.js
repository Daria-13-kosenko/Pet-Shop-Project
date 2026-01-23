import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const API_URL = 'http://localhost:3333'

export const fetchDryWetFood = createAsyncThunk(
  'dryWetFood/fetchDryWetFood',
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/categories/${categoryId}`)

      const payload = res.data
      const products = Array.isArray(payload)
        ? payload
        : payload?.data || payload?.products || []

      return { categoryId, products }
    } catch (e) {
      return rejectWithValue(e?.message || 'Failed to load category products')
    }
  },
)

const initialState = {
  itemsByCategory: {},
  loading: false,
  error: null,
}

const dryWetFoodSlice = createSlice({
  name: 'dryWetFood',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDryWetFood.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDryWetFood.fulfilled, (state, action) => {
        state.loading = false

        const { categoryId, products } = action.payload

        state.itemsByCategory[categoryId] = products
      })
      .addCase(fetchDryWetFood.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error'
      })
  },
})

export default dryWetFoodSlice.reducer
