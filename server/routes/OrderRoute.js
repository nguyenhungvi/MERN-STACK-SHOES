const router = require("express").Router();
const { order } = require("../controllers");
const passport = require("passport");
const passportConfig = require("../middlewares/Passport");

router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), order.getAllOrder)
    .post(order.postOrder);

router.route("/admin/home").get(order.homeOrder);

router
    .route("/:id")
    .get(order.getOrder)
    .delete(passport.authenticate("jwt", { session: false }), order.deleteOrder);

router
    .route("/update")
    .post(passport.authenticate("jwt", { session: false }), order.updateOrder);

module.exports = router;
