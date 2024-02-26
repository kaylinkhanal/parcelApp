
const express = require('express')
const app = express()

const { createServer } = require('node:http');
const server = createServer(app);

const connection = require('./db/connection')
const cors = require('cors')
const { Server } = require('socket.io');

const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())

app.use(express.static('uploads'))

connection()
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')
const contactRoute = require('./routes/contact')

app.use(userRoute)
app.use(orderRoute)
app.use(contactRoute)

const port = process.env.PORT

io.on('connection', (socket) => {

  socket.on('orders', (orderId)=>{
    console.log(' new order is', orderId);
    io.emit('new order', orderId)
  })


});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})