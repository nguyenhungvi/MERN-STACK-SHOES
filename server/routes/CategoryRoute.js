const router = require("express").Router();
const { category } = require("../controllers/index");
const passport = require("passport");
const passportConfig = require("../middlewares/Passport");

router
    .route("/")
    .get(category.getCategories)
    .post(
        passport.authenticate("jwt", { session: false }),
        category.postCategory
    );

router
    .route("/:id")
    // .get(passport.authenticate("jwt", { session: false }), category.getCategory)
    .get(category.getCategory)
    .delete(
        passport.authenticate("jwt", { session: false }),
        category.deleteCategory
    )
    .patch(
        passport.authenticate("jwt", { session: false }),
        category.updateCategory
    );
router
    .route("/search")
    .post(category.search);

module.exports = router;
