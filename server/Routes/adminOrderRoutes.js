const express = require("express");
const adminOrderController = require("../Controllers/adminOrderController");

const router = express.Router();

router.get("/", adminOrderController.getAllUserOders);
router.get("/details/:id", adminOrderController.getOrderDetailsForAdin);
router.patch("/update/:id", adminOrderController.updateOrderStatus);

module.exports = router;
