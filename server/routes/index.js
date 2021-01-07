const auth = require("./AuthRoute");
const category = require("./CategoryRoute");
const product = require("./ProductRoute");
const order = require("./OrderRoute");
const cart = require("./CartRoute");
const review = require("./ReviewRoute");

module.exports = {
    auth: auth,
    category: category,
    product: product,
    order: order,
    cart: cart,
    review: review
}