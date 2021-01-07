const User = require("../models/UserModel");
const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const encodeToken = (userID) => {
    return jwt.sign(
        {
            iss: "VOTHECONG",
            sub: userID,
            iat: new Date().getDate(),
            exp: new Date().setDate(new Date().getDate() + 3),
        },
        process.env.KEY_SECRET
    );
};

const signupAdmin = (req, res, next) => {
    const dataErrors = validationResult(req);
    let errors = [];
    if (!dataErrors.isEmpty()) {
        dataErrors.array().map((item) => {
            errors.push({ error: item.msg });
        });
        return res.status(422).json({ error: errors });
    }

    const { name, email, password, avatar } = req.body;
    User.findOne({ email: email })
        .then((result) => {
            if (result) {
                return res.status(404).json({
                    error: "Email đã tồn tại!!!",
                    success: false
                });
            } else {
                const newAdmin = new User({
                    name,
                    email,
                    password,
                    role: "admin",
                    avatar: avatar
                });
                newAdmin.save().then((result) => {
                    result.password = undefined;
                    return res
                        .status(201)
                        .json({ message: "Sign in success!!!", user: result, success: true });
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const signinAdmin = (req, res, next) => {
    const dataErrors = validationResult(req);
    let errors = [];
    if (!dataErrors.isEmpty()) {
        dataErrors.array().map((item) => {
            errors.push({ error: item.msg });
        });
        return res.status(422).json({ error: errors });
    }

    if (req.user.length > 0) {
        return res.status(404).json({
            error: req.user[0],
        });
    }
    if (req.user.role !== "admin") {
        return res.status(404).json({
            error: "Khong tim thay tai khoan!!",
        });
    }
    if (req.user.role === "admin") {
        req.user.password = undefined;
        const token = encodeToken(req.user._id);
        return res.status(200).json({
            token,
            user: req.user,
        });
    }
};

const signupUser = (req, res, next) => {
    const dataErrors = validationResult(req);
    let errors = [];
    if (!dataErrors.isEmpty()) {
        dataErrors.array().map((item) => {
            errors.push({ error: item.msg });
        });
        return res.status(422).json({ error: errors });
    }
    const { name, email, password } = req.body;
    User.findOne({ email: email })
        .then((result) => {
            if (result) {
                return res.status(404).json({
                    error: "Email đã tồn tại!!!",
                });
            } else {
                const newAdmin = new User({
                    name,
                    email,
                    password,
                });
                newAdmin.save().then((result) => {
                    result.password = undefined;
                    const token = encodeToken(result._id);
                    return res
                        .status(201)
                        .json({ message: "Đã đăng ký thành công!!!", user: result, token });
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const signinUser = (req, res, next) => {
    const dataErrors = validationResult(req);
    let errors = [];
    if (!dataErrors.isEmpty()) {
        dataErrors.array().map((item) => {
            errors.push({ error: item.msg });
        });
        return res.status(422).json({ error: errors });
    }
    if (req.user.length > 0) {
        return res.status(404).json({
            error: req.user[0],
        });
    }

    req.user.password = undefined;
    const token = encodeToken(req.user._id);
    Cart.find({ userID: req.user._id })
        .populate("cartItems.productID", "-sizes")
        .then((cart) => {
            return res.status(200).json({
                token,
                user: req.user,
                message: "Đã đăng nhập thành công!!!",
                cart,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
};

const updateInfoCustomer = async (req, res, next) => {
    const { phone, address } = req.body;
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
        return res.status(400).json({
            error: "Không tìm thấy tài khoản!!",
        });
    }
    let result = await User.findOneAndUpdate(
        { email: req.user.email },
        {
            $set: {
                phone: phone,
                address: address,
            },
        },
        { new: true }
    );
    result.password = undefined;
    return res.status(200).json({
        message: "Cập nhật thành công!!",
        user: result,
    });
};


const updateAccountAdmin = async (req, res, next) => {
    console.log("req.body", req.body);
    try {
        const { phone, address, name } = req.body;
        const admin = await User.findOne({ email: req.user.email });
        if (!admin) {
            return res.status(400).json({
                error: "Không tìm thấy tài khoản!!",
                success: false
            });
        }
        let result = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $set: {
                    name: name,
                    phone: phone,
                    address: address,
                },
            },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Cập nhật thành công!!",
            user: result,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }

};

const updateAvatar = (req, res, next) => {
    const { img } = req.body;
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            $set: {
                avatar: img,
            },
        },
        { new: true }
    )
        .then((result) => {
            result.password = undefined;
            return res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
};

const getOrderByCustomer = (req, res, next) => {
    Order.find({ userID: req.user._id })
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
};

const getAccountAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({
                error: "Khong tim thay tai khoang!!",
            });
        }
        if (req.user.role === "admin") {
            const result = await User.find({ role: { $ne: "admin" } }).select("-password");
            if (!result) {
                return res.status(404).json({
                    error: "Đã có lỗi xảy ra!!!"
                });
            }

            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

/**
 * google-auth-library
 * https://www.youtube.com/watch?v=LA16VCpUido
 */
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
    "1046614447632-i3hsc5liq1scjj818s6kfdj74hihu4oj.apps.googleusercontent.com"
);

const siginGoogle = async (req, res, next) => {
    const { tokenId } = req.body;
    try {
        const result = await client
            .verifyIdToken({
                idToken: tokenId,
                audience:
                    "1046614447632-i3hsc5liq1scjj818s6kfdj74hihu4oj.apps.googleusercontent.com",
            });
        if (!result) {
            return res.status(404).json({
                error: "Đã có lỗi xảy ra!!!",
                success: false
            });
        }
        const { email, picture, given_name, family_name } = result.payload;
        const user = await User.findOne({ email: email });
        if (!user) {
            const newName = `${family_name} ${given_name}`;
            const password = email + process.env.KEY_SECRET;
            const newUser = new User({ name: newName, email, avatar: picture, password });
            const data = await newUser.save();
            data.password = undefined;
            const token = encodeToken(data._id);
            return res.status(201).json({
                message: "Đăng nhập thành công!!!", user: data, token,
                success: true
            });
        }

        const hashPassword = await user.checkPassword(email + process.env.KEY_SECRET);
        if (!hashPassword) {
            return res.status(404).json({
                error: "Mật khẩu không chính xác!!!",
                success: false
            });
        }
        user.password = undefined;
        const token = encodeToken(user._id);
        return res.status(200).json({
            message: "Đăng nhập thành công!!!", user, token,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

/**
 * node-fetch
 * https://www.youtube.com/watch?v=zQNPDRg_1Po
 */
const NodeFetch = require("node-fetch");
const siginFacebook = async (req, res, next) => {
    try {
        const { accessToken, userID } = req.body;
        const urlGraphFB = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&&access_token=${accessToken}`;
        const result = await NodeFetch(urlGraphFB).then((res) => res.json());

        if (!result) {
            return res.status(404).json({
                error: "Đã có lỗi xảy ra!!!",
                success: false
            });
        }
        const { id, name, email } = result;
        const user = await User.findOne({ email: email });
        if (!user) {
            const password = email + process.env.KEY_SECRET;
            const newUser = new User({ name, email, avatar: result.picture.data.url, password });
            const data = await newUser.save();
            data.password = undefined;
            const token = encodeToken(data._id);
            return res.status(201).json({
                message: "Đăng nhập thành công!!!", user: data, token,
                success: true
            });
        }
        const hashPassword = await user.checkPassword(email + process.env.KEY_SECRET);
        if (!hashPassword) {
            return res.status(404).json({
                error: "Mật khẩu không chính xác!!!",
                success: false
            });
        }
        user.password = undefined;
        const token = encodeToken(user._id);
        return res.status(200).json({
            message: "Đăng nhập thành công!!!", user, token,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
}


const lastday = function (y, m) {
    return new Date(y, m + 1, 0).getDate();
}

const getDayCT = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yy = today.getFullYear();
    const dd = lastday(yy, mm);
    return `${yy}-${mm}-${dd}`;
}

const getDayDT = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yy = today.getFullYear();
    return `${yy}-${mm}-1`;
}

const homeAccount = async (req, res, next) => {
    const dataAccount = await User.find({
        createdAt: {
            "$gte": new Date(getDayDT()), "$lte": new Date(getDayCT())
        }
    }).select("-password");

    return res.status(200).json(dataAccount);
}

module.exports = {
    signinAdmin: signinAdmin,
    signupAdmin: signupAdmin,
    getAccountAdmin: getAccountAdmin,
    signinUser: signinUser,
    signupUser: signupUser,
    updateInfoCustomer: updateInfoCustomer,
    updateAvatar: updateAvatar,
    getOrderByCustomer: getOrderByCustomer,
    siginGoogle: siginGoogle,
    siginFacebook: siginFacebook,
    homeAccount: homeAccount,
    updateAccountAdmin: updateAccountAdmin
};
