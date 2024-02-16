
const express = require('express')
const app = express()
const connection = require('./db/connection')
const cors = require('cors')
app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())
connection()
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')

const contactRoute = require('./routes/contact')

app.use(userRoute)
app.use(orderRoute)
app.use(contactRoute)

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})