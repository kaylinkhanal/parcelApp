const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  senderCoords: Object,
  senderAddr: String,
  receiverCoords: Object,
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact"
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  orderPrice: String,
  orderImage: String,
  receiverAddr: String,
  shipmentDetails: Object,
  status: {
    type: String,
    enum : ['pending','approved','dispatched','cancelled','pickedUp','delivered'],
    default: 'pending'
    },
},{
  timestamps:true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order
