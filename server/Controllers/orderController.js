const Cart = require("../Models/cartModel");
const Order = require("../Models/orderModel");
const Products = require("../Models/productsModel");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");
const paypal = require("../Utils/paypal");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    userId,
    cartItems,
    address,
    orderStatus,
    paymentMethod,
    paymentStatus,
    totalAmount,
    orderDate,
    orderUpdateDate,
    paymentId,
    payerId,
    cartId,
  } = req.body;

  const payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.CLIENT_URL}/dashboard/paypal-return`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/paypal-cancel`,
    },
    transactions: [
      {
        items_list: {
          items: cartItems.map((item) => ({
            name: item.title,
            sku: item.productId,
            price: item.price.toFixed(2),
            currency: "USD",
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: "USD",
          total: totalAmount.toFixed(2),
        },
        description: "",
      },
    ],
  };

  paypal.payment.create(
    payment_json,
    asyncHandler(async (error, paymentData, next) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: "failed",
          message: "Error while processing payment.",
        });
      } else {
        const newOrder = await Order.create({
          userId,
          cartItems,
          address,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });

        const successUrl = paymentData.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res.status(201).json({
          status: "success",
          successUrl,
          orderId: newOrder._id,
        });
      }
    })
  );
});

exports.capturePayment = asyncHandler(async (req, res, next) => {
  const { payerId, paymentId, orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    const error = new CustomError("Order not found.", 404);
    return next(error);
  }

  order.orderStatus = "success";
  order.paymentStatus = "paid";
  order.paymentId = paymentId;
  order.payerId = payerId;

  for (let item of order.cartItems){
    let products = await Products.findById(item.productId);
    if(!products){
      const error = new CustomError("This product is in out of stock.",404)
      return next(error)
    }

    products.totalStock-=item.quantity;
    await products.save();
  }

  const getCartId = order.cartId;
  await Cart.findByIdAndDelete(getCartId);
  await order.save();

  res.status(200).json({
    status: "success",
    message: "Order confirmed.",
  });
});

//get all orders..
exports.getOrdersByUser=asyncHandler(async(req,res,next)=>{
  const {userId}= req.params;

  const orders = await Order.find({userId});

  if(!orders){
    const error = new CustomError("Orders not found!",404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:orders
  });
})

//get order details..
exports.getOrderDetails=asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const order = await Order.findById(id);

  if(!order){
    const error = new CustomError("Order not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:order
  });
})
