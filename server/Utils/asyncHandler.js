exports.asyncHandler = (func,next)=>{
  return (req,res,next)=>{
    func(req,res,next).catch(err=>next(err))
  }
}