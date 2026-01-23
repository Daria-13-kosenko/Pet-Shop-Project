import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../constants/api'

export const fetchSaleProducts = createAsyncThunk(
  'sale/fetchSaleProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/all`)
      return response.data
    } catch (e) {
      return rejectWithValue(e?.message || 'Failed to load sale products')
    }
  },
)
const initialState = {
  items: [],
  loading: false,
  error: null,
}
const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.loading = false
        const data = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.data ?? [])

        state.items = data.filter((p) => {
          const dp = p?.discont_price
          return dp !== null && dp !== undefined && Number(dp) > 0
        })
      })
      .addCase(fetchSaleProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error'
      })
  },
})

export default saleSlice.reducer
