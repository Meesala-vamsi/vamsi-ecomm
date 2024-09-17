const Products = require("../Models/productsModel");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const { sortBy = "price-hightolow",category } = req.query
  let sort = {};
  switch (sortBy) {
    case "price-hightolow":
      sort.price = -1;
      break;
    case "price-lowtohigh":
      sort.price = 1;
      break;
    case "title-AtoZ":
      sort.title = 1;
      break;
    case "title-ZtoA":
      sort.title = -1;
      break;
    default:
      sort.price = 1;
      break;
  }
  let products = null
  if (category && category !== "products") {
    products = await Products.find({ category: category });
  }else if(category === "products"){
    products = await Products.find({});
  }
  else {
    products = await Products.find({}).sort(sort);
  }
  if (products.length === 0) {
    const error = new CustomError("No products found", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

//fetch each product
exports.fetchProductById = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    const error = new CustomError("Product not found.", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

//search for product
exports.searchProductByTitle = asyncHandler(async(req,res,next)=>{
  const {search} = req.query
  
  let product = []
  if(search){
    product = await Products.find({ title: {
      $regex: new RegExp(search,"i")
    } });
  }else{
    product = await Products.find({})
  }

  if(!product || product.length===0){
    const allProducts = await Products.find({})
    return res.status(404).json({
      status:"failed",
      message:"Product not found..",
      data:allProducts
    })
  }
  return res.status(200).json({
    status:"success",
    count:product.length,
    data:{
      products:product
    }
  })
})
