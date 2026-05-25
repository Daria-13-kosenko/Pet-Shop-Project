const Category = require('../database/models/category')
const Product = require('../database/models/product')

const { request } = require('express')
const express = require('express')
const API_URL = import.meta.env.VITE_API_URL

const router = express.Router()

router.get(`${API_URL}/categories/all`, (req, res) => {
  async function all() {
    const all = await Category.findAll()
    res.json(all)
  }
  all()
})

router.get(`${API_URL}/categories/:id`, async (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    res.json({ status: 'ERR', message: 'wrong id' })
    return
  }
  const all = await Product.findAll({ where: { categoryId: +id } })
  const category = await Category.findOne({ where: { id: +id } })

  if (all.length === 0) {
    res.json({ status: 'ERR', message: 'empty category' })
    return
  }

  res.json({
    category,
    data: all,
  })
})

module.exports = router
