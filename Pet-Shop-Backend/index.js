const express = require('express')
const cors = require('cors')
const path = require('path')
import { fileURLToPath } from 'url'

const categories = require('./routes/categories')
const sale = require('./routes/sale')
const order = require('./routes/order')
const products = require('./routes/products')

const sequelize = require('./database/database')
const Category = require('./database/models/category')
const Product = require('./database/models/product')

const PORT = process.env.PORT || 3333

Category.hasMany(Product)

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static('public'))
app.use(cors({ origin: 'https://Pet-Shop-Backend.onrender.com' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/categories', categories)
app.use('/products', products)
app.use('/sale', sale)
app.use('/order', order)

const start = async () => {
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port...`)
    })
  } catch (err) {
    console.log(err)
  }
}

app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

start()
