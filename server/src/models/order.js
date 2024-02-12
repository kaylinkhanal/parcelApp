const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderDetails: Object,
  senderId: String,
  senderCoords: Object,
  senderAddr: String,
  receiverCoords: Object,
  receiverId: String,
  receiverAddr: String,
  shipmentDetails: Object
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order
