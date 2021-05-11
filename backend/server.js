const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const errorMiddleware = require('./middleware/errorMiddleware.js')

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(errorMiddleware.notFound)

app.use(errorMiddleware.errorHandler)
