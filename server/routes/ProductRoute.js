const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../middlewares/Passport");
const { product } = require("../controllers/index");

router
    .route("/")
    .get(product.getProducts)
    .post(passport.authenticate("jwt", { session: false }), product.postProduct);

router
    .route("/:id")
    .get(product.getProduct)
    .patch(
        passport.authenticate("jwt", { session: false }),
        product.updateProduct
    )
    .delete(
        passport.authenticate("jwt", { session: false }),
        product.deleteProduct
    );

router.route('/detail/:slug').get(product.getProductBySlug);

router.route('/home/:id').get(product.getPageHomeClient);

router.route("/type/:categoryID").get(product.getProductByCategory);

router.route("/size").post(product.searchSizeProduct);

router.route('/sort').post(product.sortProduct);

router.route("/filter").post(product.filterProduct);

router.route('/relate-product').post(product.relatedProducts);

// router.route("/pagination/:page").post(product.getProductPagination);

router.route("/search").post(product.search);

router.route('/home-product').get(product.homeProduct)

module.exports = router;