const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const protect = require('../middleware/authMiddleware.js')

// fetch all products
router.post('/login', userController.authUser)

// 
router.route('/profile').get(protect.protect, userController.getUserProfile).put(protect.protect, userController.updateUserProfile)

router.route('/').post(userController.registerUser)

module.exports = router