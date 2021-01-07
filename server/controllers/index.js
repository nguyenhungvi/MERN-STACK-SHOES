const auth = require("./AuthController");
const category = require("./CategoryController");
const product = require("./ProductController");
const order = require("./OrderController");
const cart = require("./CartController");
const review = require("./ReviewController");

module.exports = {
    auth: auth,
    category: category,
    product: product,
    order: order,
    cart: cart,
    review: review
}