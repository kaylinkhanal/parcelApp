
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
const User = require('./models/user')


const orderRoute = require('./routes/order')
const contactRoute = require('./routes/contact')

app.use(userRoute)
app.use(orderRoute)
app.use(contactRoute)

const port = process.env.PORT

io.on('connection', (socket) => {

  socket.on('orders', async(order)=>{
    const {shipmentDetails, orderPrice, receiverAddr} = order.orderId
    Notifications.create({orderId: order.orderId, notificationTitle:shipmentDetails.selectedOption + 'of price '+ orderPrice+' needs to be delivered to '+receiverAddr,  notificationDateTime: order.orderDate })
    const notifications = await Notifications.find()
    io.emit('new orders', notifications)
  })


});


app.get('/notifications', async(req,res)=>{
  const data = await Notifications.find()
  return res.json(data)
})


app.patch('/notifications-check/:userId', async(req,res)=>{
  const user = await User.findById(req.params.userId)
  const event = new Date();
  user.lastReadDate = event.toLocaleString()
  console.log( event.toLocaleString())
  user.save()
  res.send('ok')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})