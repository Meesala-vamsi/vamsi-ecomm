const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  username:String,
  email:{
    type:String,
    validate:[
      validator.isEmail,"Enter a valid email address."
    ],
    unique:true,
    required:[true,"Email field is required."]
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  password:{
    type:String,
    required:[true,"Password field is required."]
  }
},{timestamps:true});

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePasswords = async function(pass,passDB){
  return await bcrypt.compare(pass,passDB)
}



const User = mongoose.model("User",userSchema)

module.exports = User