const mongoose = require("mongoose")

const orderSchema=new mongoose.Schema({
  userId:String,
  cartId:String,
  cartItems:[
    {
      productId:String,
      title:String,
      image:String,
      price:String,
      quantity:Number
    }
  ],
  address:{
    addressId:String,
    address:String,
    city:String,
    pincode:String,
    phone:String,
    description:String,
    firstName:String,
    lastName:String
  },
  orderStatus:String,
  paymentMethod:String,
  paymentStatus:String,
  totalAmount:Number,
  orderDate:Date,
  orderUpdateDate:Date,
  paymentId:String,
  payerId:String
})

const Order = mongoose.model("Orders",orderSchema)

module.exports = Order