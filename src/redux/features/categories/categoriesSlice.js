import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../constants/api'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/categories/all?ts=${Date.now()}`)
      console.log('CATEGORIES DATA:', res.data)
      return res.data
    } catch (error) {
      console.log('CATEGORIES ERROR:', error)
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to load categories',
      )
    }
  },
)
export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchCategoryProducts',
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/categories/${categoryId}`)
      const data = res.data

      const products = Array.isArray(data)
        ? data
        : data?.products || data?.data || []

      return { categoryId, products }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to load category products',
      )
    }
  },
)

const initialState = {
  categories: [],
  list: [],
  loading: false,
  error: null,
  itemsByCategory: {},
  loadingByCategory: {},
  errorByCategory: {},
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoriesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false

        const payload = action.payload
        const arr = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.categories)
            ? payload.categories
            : Array.isArray(payload?.data)
              ? payload.data
              : []

        state.categories = arr
        state.list = arr
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload || action.error?.message || 'Error loading categories'
        state.categories = []
        state.list = []
      })
      .addCase(fetchCategoryProducts.pending, (state, action) => {
        const categoryId = action.meta.arg
        state.loadingByCategory[categoryId] = true
        state.errorByCategory[categoryId] = null
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload || {}
        state.itemsByCategory[categoryId] = Array.isArray(products)
          ? products
          : []
        state.loadingByCategory[categoryId] = false
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        const categoryId = action.meta.arg
        state.loadingByCategory[categoryId] = false
        state.errorByCategory[categoryId] =
          action.payload || action.error?.message || 'Error'
      })
  },
})

export const { resetCategoriesState } = categoriesSlice.actions
export default categoriesSlice.reducer
