const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Title field is required."],
  },
  description:{
    type:String,
    required:[true,"Description field is required."],
  },
  category:String,
  brand:String,
  price:Number,
  salePrice:Number,
  totalStock:Number,
  image:String
},{timestamps:true})

const Products = mongoose.model("Products",productSchema)

module.exports = Products