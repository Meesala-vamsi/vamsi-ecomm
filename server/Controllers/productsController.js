const Products = require("../Models/productsModel");
const upload = require("../Storage/storage");
const { asyncHandler } = require("../Utils/asyncHandler");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../Utils/customError");

exports.addProductImage = asyncHandler(async (req, res, next) => {
  const image = req.file.path;
  // const result = await cloudinary.uploader.upload(req.file.path)
  // console.log(result)
  res.status(200).json({
    status: "success",
    image,
  });
});

// add product
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.create(req.body);

  res.status(201).json({
    status: "success",
    data:{
      product
    },
    message: "Product added successfully.",
  });
});

//fetch all Products
exports.fetchAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.find({});

  if (!products) {
    const error = new CustomError("No products found.", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

// update product
exports.updateProductById = asyncHandler(async (req, res, next) => {
  const checkProduct = await Products.findById(req.params.id); 
  if (!checkProduct) {
    const error = new CustomError("Product not found.", 404);
    return next(error);
  }

  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Product updated successfully.",
    data:{
      product
    }
  });
});

//delete product
exports.deleteProductById = asyncHandler(async (req, res, next) => {
  const checkProduct = await Products.findById(req.params.id);
  if (!checkProduct) {
    const error = new CustomError("Product not found.", 404);
    return next(error);
  }

  await Products.findByIdAndDelete(req.params.id, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Product Deleted successfully.",
  });
});


