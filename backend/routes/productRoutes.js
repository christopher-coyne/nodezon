const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController.js')

// fetch all products
router.route('/').get(controller.getProducts)

// fetch single product
router.route('/:id').get(controller.getProductById)

module.exports = router