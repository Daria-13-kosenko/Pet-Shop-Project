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
      const res = await axios.get(
        `${API_URL}/categories/${categoryId}?ts=${Date.now()}`,
      )

      const payload = res.data

      if (Array.isArray(payload)) {
        return { categoryId, products: payload, category: null }
      }

      const products = payload.data || payload.products || []
      const category = payload.category || payload.currentCategory || null

      return { categoryId, products, category }
    } catch (error) {
      return rejectWithValue(
        error?.message || 'Failed to load category products',
      )
    }
  },
)

const initialState = {
  list: [], // все категории
  status: 'idle',
  error: null,

  currentCategory: null,

  // товары выбранной категории
  categoryProducts: [],
  categoryProductsStatus: 'idle',
  categoryProductsError: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null
      state.categoryProducts = []
      state.categoryProductsStatus = 'idle'
      state.categoryProductsError = null
    },
  },
  extraReducers: (builder) => {
    // categories/all
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload || []
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Error loading categories'
        state.list = []
      })

    // categories/:id
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.categoryProductsStatus = 'loading'
        state.categoryProductsError = null
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.categoryProductsStatus = 'succeeded'
        state.categoryProducts = action.payload?.products || []
        state.currentCategory = action.payload?.category || null
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.categoryProductsStatus = 'failed'
        state.categoryProductsError =
          action.payload || 'Error loading category products'
        state.categoryProducts = []
      })
  },
})

export const { clearCurrentCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
