const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        cartItems: [
            {
                productID: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
                nameSize: { type: String, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("cart", cartSchema);
