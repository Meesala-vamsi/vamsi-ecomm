const express = require("express")
const orderController = require("../Controllers/orderController")

const router = express.Router()

router.post("/",orderController.createOrder)
router.post("/capture", orderController.capturePayment);
router.get("/list/:userId",orderController.getOrdersByUser);
router.get("/details/:id",orderController.getOrderDetails);

module.exports = router