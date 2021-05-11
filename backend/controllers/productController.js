const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

// fetch all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// fetch single product by id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

exports.getProductById = getProductById;
exports.getProducts = getProducts;