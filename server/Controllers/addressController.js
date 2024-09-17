const Address = require("../Models/addressModel");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");

// Add Address
exports.addAddress = asyncHandler(async(req,res,next)=>{
  const {address,city,pincode,phone,firstName,lastName,userId,description} = req.body
  if(!address || !city|| !pincode || !phone || !firstName || !lastName || !userId|| !description){
    const error = new CustomError("Invalid data",400);
    return next(error)
  }

  const addAddress = await Address.create({
    address,
    city,
    pincode,
    phone,
    firstName,
    lastName,
    userId,
    description,
  });

  res.status(200).json({
    status:"success",
    message:"Address created successfully..",
    data:addAddress
  })
})

//fetch address
exports.fetchAddress = asyncHandler(async (req, res, next) => {
  const {userId}  = req.params 
   if (!userId) {
     const error = new CustomError("user not found", 404);
     return next(error);
   }
  const address = await Address.find({userId});
  if(!address){
    const error = new CustomError("Adrress not found",404);
    return next(error)
  }
  res.status(200).json({
    status:"success",
    data:address
  })
});

//update Address
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const {userId,addressId} = req.params
  const formData = req.body
  if (!userId || !addressId) {
    const error = new CustomError("user and address not found", 404);
    return next(error);
  }

  const address = await Address.findByIdAndUpdate({_id:addressId,userId},formData,{new:true})

  if(!address){
    const error = new CustomError("Address not found",404);
    return next(error)
  }

  res.status(200).json({
    status:"success",
    message:"Address updated successfully.",
    data:{
      address
    }
  })
});

//delete Address
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const {userId,addressId} = req.params
  if (!userId || !addressId) {
    const error = new CustomError("user and address not found", 404);
    return next(error);
  }
  
  const address = await Address.findByIdAndDelete({ _id: addressId, userId });
  if (!address) {
    const error = new CustomError("Address not found", 404);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    message:"Address deleted successfully."
  })
});