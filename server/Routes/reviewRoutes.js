const express = require("express")
const reviewController = require("../Controllers/reviewController")

const router = express.Router()

router.post("/addReview",reviewController.addReview);
router.get("/fetch/:productId",reviewController.fetchReviews);

module.exports = router;