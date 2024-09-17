class CustomError extends Error{
  constructor(message,statusCode){
      super()
      this.message = message;
      this.statusCode = statusCode;
      this.isOperational=true

      Error.captureStackTrace(this,this.constructor)
  }
}


module.exports = CustomError