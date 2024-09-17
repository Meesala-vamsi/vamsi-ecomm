const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: [true, "ProductId is required."],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min:1
      },
    },
  ],
},{timestamps:true});

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart