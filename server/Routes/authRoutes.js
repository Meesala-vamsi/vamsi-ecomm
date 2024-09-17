const express = require("express");
const authController = require("../Controllers/authController");

const authRouter = express.Router();

authRouter.route("/register").post(authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout",authController.logoutUser)

authRouter.get("/auth-check", authController.resourceAccess,async (req, res) => {
  try{
    const user = req.user;
    res.status(200).json({
      status: "success",
      message: "User is authenticated.",
      user,
    });
  }catch(error){
    res.json({
      status:"failed",
      message :"something went wrong"
    })
  }
});

authRouter.post("/logout", authController.logoutUser);

module.exports = authRouter;
