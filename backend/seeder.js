const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('mongoose')
const users = require('./data/users.js')
const products = require('./data/products.js')
const User = require('./models/userModel.js')
const Product = require('./models/productModel.js')
const Order = require('./models/orderModel.js')
const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser}
    })

    await Product.insertMany(sampleProducts)

    console.log('Data imported : ')
    process.exit()
  } catch (err) {
      console.log('ERROR : ', err)
      process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data deleted : ')
    process.exit()
  } catch (err) {
      console.log('ERROR : ', err)
      process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}