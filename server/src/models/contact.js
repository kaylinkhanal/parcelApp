const mongoose = require('mongoose')
const { Schema } = mongoose;

const contactSchema = new Schema({
  userId: String,
  fullName: String,
  country: String,
  email: String,
  phoneNumber: String
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact