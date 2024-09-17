const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../Utils/asyncHandler");
const CustomError = require("../Utils/customError");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

//verifying the token
exports.resourceAccess = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    const error = new CustomError("Inavlid token", false);
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
    if (error) {
      const error = new CustomError("Invalid token", 400);
      return next(error);
    } else {
      const user = await User.findById(data.id);
      req.user = data;
      next();
    }
  });
});

// Generateing the token
const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "60m" });
  return token;
};

//user register
exports.register = asyncHandler(async (req, res, next) => {
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    const error = new CustomError("User already exists", 400);
    return next(error);
  }

  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Account created successfully.",
  });
});

// user login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new CustomError("User Not Found with provided email", 400);
    return next(error);
  }

  if (!(await user.comparePasswords(password, user.password))) {
    const error = new CustomError("Invalid Password", 404);
    return next(error);
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
    username: user.username,
  });

  // res.status(200).cookie("token",token,{httpOnly:true,secure:true}).json({
  //   status: "success",
  //   message: "Logged in successfully.",
  //   data: {
  //     id:user._id,
  //     username: user.username,
  //     email: user.email,
  //     role:user.role
  //   },
  // });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully.",
    token,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

//logout user
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.status(200).clearCookie("token").json({
    status: "success",
    message: "Logout successfully.",
  });
});
