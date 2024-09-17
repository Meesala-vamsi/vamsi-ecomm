const express = require("express");
const cartController = require("../Controllers/cartController");

const router = express.Router();

router.route("/").post(cartController.createCart);
router.get("/:id", cartController.getCartData);
router.patch("/update-cart", cartController.updateCartItems);
router.delete("/:userId/:productId", cartController.deleteCartItem);

module.exports = router;
