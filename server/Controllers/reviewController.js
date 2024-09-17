const Order = require("../Models/orderModel");
const Products = require("../Models/productsModel");
const Reviews = require("../Models/review");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");

//create reviews...
exports.addReview = asyncHandler(async (req, res, next) => {
  const { userId, productId, comments, userName, ratings } = req.body;

  const checkOrder = await Order.findOne({
    userId,
    "cartItems.productId": productId,
    orderStatus: "success",
  });

  if (!checkOrder) {
    const error = new CustomError(
      "Please buy this product to add a review.",
      403
    );
    return next(error);
  }

  const checkExistingReview = await Reviews.findOne({ userId, productId });
  if (checkExistingReview) {
    const error = new CustomError(
      "You already added a review for this product.",
      400
    );
    return next(error);
  }

  const review = await Reviews.create({
    userId,
    productId,
    comments,
    userName,
    ratings,
  });
  const reviews = await Reviews.find({ productId });
  const totalReviewsLength = reviews.length;
  const calculatedReview = reviews.reduce((sum, item) => sum + item, 0) / totalReviewsLength;

  await Products.findByIdAndUpdate(productId, { calculatedReview });

  res.status(201).json({
    status: "success",
    data: review,
  });
});

//fetch reviews
exports.fetchReviews = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  if ( !productId) {
    const error = new CustomError("Invalid data", 404);
    return next(error);
  }

  const reviews = await Reviews.find({productId });
  res.status(200).json({
    status: "success",
    data: reviews,
  });
});
