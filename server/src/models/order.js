const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderDetails: Object,
  senderId: String,
  receiverDetails : Object,
  deliveryTiming: Object
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order
