import axios from 'axios'

export const apiSlice = axios.create({
  baseURL: 'http://localhost:3333',
})

export default apiSlice
