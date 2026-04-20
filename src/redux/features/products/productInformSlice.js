import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../constants/api'

export const fetchProductById = createAsyncThunk(
  'productInform/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`)
      const payload = response.data
      return Array.isArray(payload)
        ? payload[0]
        : (payload?.data ?? payload?.product ?? payload)
    } catch (e) {
      return rejectWithValue(e?.message || 'Failed to load product')
    }
  },
)

const initialState = {
  currentProduct: null,
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
        state.currentProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error'
      })
  },
})

export default productSlice.reducer
