const router = require("express").Router();
const { review } = require("../controllers");
const Product = require("../models/ProductModel");

router.route('/')
    .get(review.getAllReview)
    .post(review.postReview)

router.route('/admin/home')
    .get(review.getReviewHome)

router.route('/:id')
    .delete(review.deleteReview)

router.route('/get-by-product/:slug')
    .get(review.getReview)

module.exports = router;