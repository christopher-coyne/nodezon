const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController.js')
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(protect.protect, orderController.addOrderItems)

//make sure this is at the bottom
router.route('/:id').get(protect.protect, orderController.getOrderById)

router.route('/:id/pay').put(protect.protect, orderController.getOrderToPaid)

module.exports = router