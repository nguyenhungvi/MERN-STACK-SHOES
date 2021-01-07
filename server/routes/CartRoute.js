const router = require("express").Router();
const passport = require("passport");
const { cart } = require("../controllers");
const passportConfig = require("../middlewares/Passport");

router.route('/')
    .get(cart.getCarts)
    .post(
        passport.authenticate('jwt', { session: false }),
        cart.postCart
    )

module.exports = router;