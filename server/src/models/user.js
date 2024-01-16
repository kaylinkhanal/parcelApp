const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {type:String, unique: true, required: true},
  email: String,
  fullName: String,
  role: {
    type: String,
    enum : ['user', 'admin', 'rider'],
    default : 'user'
  },
  password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User