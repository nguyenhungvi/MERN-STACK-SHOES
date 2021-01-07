const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, lowercase: true },
        slug: { type: String, required: true, lowercase: true, unique: true },
        images: [
            {
                id: { type: String, required: true },
                img: { type: String, required: true },
            },
        ],
        sizes: [
            {
                name: { type: String, required: true },
                count: { type: Number, required: true, default: 0 },
            },
        ],
        price: { type: Number, required: true },
        categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
        totalStar: { type: Number, default: 0 },
        totalReview: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("product", productSchema);


// const productSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true, lowercase: true },
//         slug: { type: String, required: true, lowercase: true, unique: true },
//         images: [
//             {
//                 id: { type: String, required: true },
//                 img: { type: String, required: true },
//             },
//         ],
//         sizes: [
//             {
//                 name: { type: String, required: true },
//                 count: { type: Number, required: true, default: 0 },
//             },
//         ],
//         safeoff: { type: Number, default: 0 },
//         price: { type: Number, required: true },
//         categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
//         reviews: [
//             {
//                 name: { type: String, required: true },
//                 email: { type: String, required: true },
//                 content: { type: String, required: true },
//                 star: { type: Number, required: true },
//                 avatar: {
//                     type: String,
//                     default:
//                         "https://res.cloudinary.com/kh-ng-c/image/upload/v1606721476/otu2p250wlojafvges8z.png",
//                 },
//                 userID: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "user",
//                     default: null,
//                 },
//             }
//         ]
//     },
//     {
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model("product", productSchema);

