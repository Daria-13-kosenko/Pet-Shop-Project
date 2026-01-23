import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from '../redux/features/categories/categoriesSlice'
import productsReducer from '../redux/features/products/productSlice'
import cartReducer from '../redux/features/cart/cartSlice'
import orderReducer from '../redux/features/order/orderSlice'
import saleReducer from '../redux/features/sale/saleSlice'
import dryWetFood from '../redux/features/dry_wet_food/dryWetFoodSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    sale: saleReducer,
    dryWetFood: dryWetFood,
  },
})
