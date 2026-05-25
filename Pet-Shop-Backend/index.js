const express = require('express')
const cors = require('cors')
const path = require('path')

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

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://pet-shop-project-r7cj.vercel.app',
      'https://pet-shop-project-4.onrender.com',
    ],
    credentials: true,
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/categories', categories)
app.use('/products', products)
app.use('/sale', sale)
app.use('/order', order)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

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

start()
