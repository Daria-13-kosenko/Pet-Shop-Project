const { request } = require('express');
const express = require('express');

const router = express.Router();
const API_URL = import.meta.env.VITE_API_URL

router.get(`${API_URL}/sale/send`, (req, res) =>{
    res.json({});

})

router.post(`${API_URL}/sale/send`, (req, res) => {
    
    res.json({status: 'OK', message: 'request processed'})
})


module.exports = router;