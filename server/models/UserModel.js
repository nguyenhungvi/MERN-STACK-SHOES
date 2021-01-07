const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchama = new mongoose.Schema(
    {
        name: { type: String, required: true, lowercase: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        address: { type: String, default: null },
        phone: { type: String, default: null },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/kh-ng-c/image/upload/v1606721476/otu2p250wlojafvges8z.png",
        },
    },
    {
        timestamps: true,
    }
);

userSchama.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchama.methods.checkPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("user", userSchama);
