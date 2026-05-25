const express = require('express')

const router = express.Router()
const API_URL = import.meta.env.VITE_API_URL

router.get(`${API_URL}/order/all`, (req, res) => {
  res.json({ message: 'order route works' })
})

router.get(`${API_URL}/order/send`, (req, res) => {
  res.json({})
})

router.post(`${API_URL}/order/send`, (req, res) => {
  res.json({ status: 'OK', message: 'request processed' })
})

module.exports = router
