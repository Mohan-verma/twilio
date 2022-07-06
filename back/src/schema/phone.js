const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  user: String,
  status: String
})

const OTP = new mongoose.model('Phonenumber', userSchema);


module.exports = { OTP }