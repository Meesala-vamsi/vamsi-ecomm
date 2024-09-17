const Order = require("../Models/orderModel");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");

//get all user orders..
exports.getAllUserOders = asyncHandler(async (req, res, next) => {

  const orders = await Order.find({});

  if (!orders) {
    const error = new CustomError("Orders not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: orders,
  });
});

//get order details..
exports.getOrderDetailsForAdin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    const error = new CustomError("Order not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

//update order status..
exports.updateOrderStatus=asyncHandler(async(req,res,next)=>{
  const { id } = req.params;
  const {orderStatus} = req.body;
  const order = await Order.findById(id);

  if (!order) {
    const error = new CustomError("Order not found!", 404);
    return next(error);
  }

  await Order.findByIdAndUpdate(id,{orderStatus},{new:true});
  res.status(200).json({
    status:"success",
    message:"Order status updated successfully."
  })
})