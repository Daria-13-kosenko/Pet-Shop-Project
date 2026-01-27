import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3333'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/categories/all?ts=${Date.now()}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to load categories')
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
        : data.products || data.data || []
      return { categoryId, products }
    } catch (e) {
      return rejectWithValue(e?.message || 'Failed to load category products')
    }
  },
)

const initialState = {
  //список категорий
  categories: [],

  list: [],

  //загрузка/ошибка для списка категорий
  loading: false,
  error: null,

  //товары по категориям
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
    // categories/all
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        const arr = Array.isArray(action.payload) ? action.payload : []
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

    // categories/:id
    builder
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
