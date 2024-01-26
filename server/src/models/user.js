const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  phoneNumber: {type:String, unique: true, required: true}, 
  fullName: String,
  email: String,
  role: {
    type: String,
    enum : ['user','admin','rider'],
    default: 'user'
    },
  password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User
