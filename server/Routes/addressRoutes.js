const express = require("express");
const addressController = require("../Controllers/addressController");

const router = express.Router();

router.post("/", addressController.addAddress);
router.get("/:userId", addressController.fetchAddress);
router.patch("/:userId/:addressId", addressController.updateAddress);
router.delete("/:userId/:addressId", addressController.deleteAddress);

module.exports = router;
