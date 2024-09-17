const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  address:String,
  userId:String,
  firstName:String,
  lastName:String,
  city:String,
  pincode:String,
  phone:String,
  description:String
},{timestamps:true})

const Address = mongoose.model("Address",addressSchema)

module.exports = Address