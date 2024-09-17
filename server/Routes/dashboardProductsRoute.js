const express = require("express")
const dashboardController = require("../Controllers/dashboardProductsController")

const router = express.Router()

router.get("/",dashboardController.getAllProducts)
router.get("/search", dashboardController.searchProductByTitle);
router.get("/:id",dashboardController.fetchProductById)


module.exports = router