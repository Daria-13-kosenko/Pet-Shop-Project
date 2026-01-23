import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3333'

export const sendOrder = createAsyncThunk(
  'order/send',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/order/send`, payload)
      return response.data
    } catch (e) {
      return rejectWithValue(
        e?.response?.data ?? { message: e?.message ?? 'Request failed' },
      )
    }
  },
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    status: 'idle',
    error: null,
    lastResponse: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.status = 'idle'
      state.error = null
      state.lastResponse = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastResponse = action.payload
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload?.message ?? action.error?.message ?? 'Unknown error'
      })
  },
})

export const { resetOrderState } = orderSlice.actions
export default orderSlice.reducer
