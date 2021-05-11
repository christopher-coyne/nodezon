const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')

// create new order
const addOrderItems = asyncHandler(async (req, res) => {
  // console.log(req)
  const { OrderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if(OrderItems && OrderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      OrderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// get order by id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// update order to paid
const getOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

exports.addOrderItems = addOrderItems;
exports.getOrderById = getOrderById;
exports.getOrderToPaid = getOrderToPaid;
