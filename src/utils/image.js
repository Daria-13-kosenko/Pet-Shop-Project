import { API_URL } from '../constants/api'

export const getCategoryImageUrl = (id) => `${API_URL}/category_img/${id}.jpeg`

export const getProductImageUrl = (id) => `${API_URL}/product_img/${id}.jpeg`
