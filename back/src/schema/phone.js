const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  user: Number,
})

const OTP = new mongoose.model('User', userSchema);


module.exports = { OTP }