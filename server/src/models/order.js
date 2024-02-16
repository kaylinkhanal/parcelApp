const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  senderId: String,
  senderCoords: Object,
  senderAddr: String,
  receiverCoords: Object,
  receiverId: String,
  orderImage: String,
  receiverAddr: String,
  shipmentDetails: Object,
  status: {
    type: String,
    enum : ['pending','approve','dispatched','cancelled','pickedUp','delivered'],
    default: 'pending'
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order
