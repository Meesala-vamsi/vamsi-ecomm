const express = require("express");
const productsController = require("../Controllers/productsController");
const upload = require("../Storage/storage");

const productsRoute = express.Router();

productsRoute.post(
  "/image",
  upload.single("image"),
  productsController.addProductImage
);
productsRoute
  .route("/:id")
  .patch(productsController.updateProductById)
  .delete(productsController.deleteProductById)
productsRoute
  .route("/")
  .post(productsController.createProduct)
  .get(productsController.fetchAllProducts);

module.exports = productsRoute;
