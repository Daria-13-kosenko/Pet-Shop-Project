import axios from 'axios'

export const apiSlice = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default apiSlice
