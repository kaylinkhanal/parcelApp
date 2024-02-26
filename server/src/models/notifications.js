const mongoose = require('mongoose')
const { Schema } = mongoose;

const notificationSchema = new Schema({
  notificationTitle: String,
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification
