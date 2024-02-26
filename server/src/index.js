
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
const Notifications = require('./models/notifications')
const orderRoute = require('./routes/order')
const contactRoute = require('./routes/contact')

app.use(userRoute)
app.use(orderRoute)
app.use(contactRoute)

const port = process.env.PORT

io.on('connection', (socket) => {

  socket.on('orders', async(order)=>{

   const {shipmentDetails, orderPrice, receiverAddr} = order.orderId

    Notifications.create({orderId: order.orderId, notificationTitle:shipmentDetails.selectedOption + 'of price '+ orderPrice+' needs to be delivered to '+receiverAddr })
    const notifications = await Notifications.find()
    io.emit('new orders', notifications)
  })


});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})