const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'order route works' })
})

router.get('/send', (req, res) => {
  res.json({})
})

router.post('/send', (req, res) => {
  res.json({ status: 'OK', message: 'request processed' })
})

module.exports = router
