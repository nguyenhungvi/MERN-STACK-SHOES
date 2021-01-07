const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        total: { type: Number, default: 0 },
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        payment: { type: String, required: true },
        cart: [
            {
                productID: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
                nameSize: String,
                quantity: { type: Number, required: true, default: 0 }
            },
        ],
        status: {
            type: Number,
            default: 1,
            enum: [0, 1, 2],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("order", orderSchema);
