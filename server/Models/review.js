const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId:String,
  productId:String,
  comments:String,
  userName:String,
  ratings:Number
},{timestamps:true});


const Reviews = mongoose.model("Reviews",reviewSchema);

module.exports = Reviews;