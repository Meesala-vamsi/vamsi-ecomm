const Cart = require("../Models/cartModel");
const Products = require("../Models/productsModel");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");

//get cart data
exports.getCartData=asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  if(!id){
    const error = new CustomError("Userid is not found",404)
    return next(error)
  }

  let cart = await Cart.findOne({ userId: req.params.id }).populate({
    path:"items.productId",
    select:"image price salePrice quantity title brand"
  })

  if(!cart){
    const error = new CustomError("No cart data found.",404)
    return next(error)
  }

  const validItems = cart.items.filter((productItem) => productItem.productId)

  if(validItems.length < cart.items.length){
    cart.items=validItems
    await cart.save()
  }

  const populateCartItems = validItems.map((eachItem) => ({
    productId: eachItem.productId._id,
    title: eachItem.productId.title,
    price: eachItem.productId.price,
    salePrice: eachItem.productId.salePrice,
    image:eachItem.productId.image,
    quantity: eachItem.quantity,
    brand:eachItem.productId.brand
  }));

  res.status(200).json({
    status:"success",
    data:{
      ...cart._doc,
      items:populateCartItems
    }
  })
})

// create cart
exports.createCart = asyncHandler(async(req,res,next)=>{
  const {userId,productId,quantity} = req.body
  if(!userId||!productId || !quantity){
    const error = new CustomError("Invalid data",400)
    return next(error)
  }

  const product = await Products.findById(productId)
  if(!product){
    const error = new CustomError("Product not found.", 404);
    return next(error);
  }

  let cart = await Cart.findOne({userId}) 
  if(!cart){
    cart = new Cart({userId,items:[]})
  }

  const findProductIndex = cart.items.findIndex((item)=>item.productId.toString() === productId)

  if(findProductIndex === -1){
    cart.items.push({productId,quantity})
  }else{
    cart.items[findProductIndex].quantity += quantity
  }

  await cart.save()

  res.status(201).json({
    status:"success",
    message:"Product added to the cart successfully.",
    data:{
      cart
    }
  })
})

//update cart items
exports.updateCartItems = asyncHandler(async(req,res,next)=>{
  const {userId,productId,quantity} = req.body
    if (!userId || !productId || quantity<=0) {
      const error = new CustomError("Invalid data", 400);
      return next(error);
    }

    let cart = await Cart.findOne({userId})
    if (!cart) {
      const error = new CustomError("No cart data found.", 404);
      return next(error);
    }

    const findProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if(findProductIndex === -1){
      const error = new CustomError("Cart item not found.",404)
      return next(error)
    }
      cart.items[findProductIndex].quantity = quantity
      await cart.save()

      await cart.populate({
        path: "items.productId",
        select: "image price salePrice quantity title brand",
      });

      const populateCartItems = cart.items.map((eachItem) => ({
        productId: eachItem.productId ? eachItem.productId._id : null,
        title: eachItem.productId
          ? eachItem.productId.title
          : "Product not found",
        price: eachItem.productId ? eachItem.productId.price : null,
        salePrice: eachItem.productId ? eachItem.productId.salePrice : null,
        image: eachItem.productId ? eachItem.productId.image : null,
        quantity: eachItem.quantity,
        brand:eachItem.productId?eachItem.productId.brand:"Gucchi"
      }));

      res.status(200).json({
        status: "success",
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
})

//delete cart item
exports.deleteCartItem = asyncHandler(async(req,res,next)=>{
  const {userId,productId} = req.params
  if (!userId || !productId) {
    const error = new CustomError("Invalid data", 400);
    return next(error);
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image price salePrice quantity title",
  });

  if(!cart){
    const error = new CustomError("No cart data found.", 404);
    return next(error);
  }
  
  cart.items = cart.items.filter(eachItem=>eachItem.productId._id.toString() !== productId)
  await cart.save()

  await cart.populate({
    path: "items.productId",
    select: "image price salePrice quantity title",
  });

   const populateCartItems = cart.items.map((eachItem) => ({
     productId: eachItem.productId ? eachItem.productId._id : null,
     title: eachItem.productId ? eachItem.productId.title : "Product not found",
     price: eachItem.productId ? eachItem.productId.price : null,
     salePrice: eachItem.productId ? eachItem.productId.salePrice : null,
     image: eachItem.productId ? eachItem.productId.image : null,
     quantity: eachItem.quantity,
   }));
  res.status(200).json({
    status:"success",
    message:"Cart item deleted successfully.",
    data:{
      ...cart._doc,
      items:populateCartItems
    }
  })
})