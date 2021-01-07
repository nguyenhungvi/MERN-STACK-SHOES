const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const postOrder = (req, res, next) => {
    const { info, namePayment, total } = req.body.info;
    const { cart } = req.body;

    const cartItems = [];
    cart.map((item) => {
        cartItems.push({
            productID: item._id,
            nameSize: item.nameSize,
            quantity: item.quantity,
        });
    });

    const newOrder = new Order({
        name: info.name,
        phone: info.phone,
        address: info.address,
        userID: info.id,
        payment: namePayment,
        cart: cartItems,
        total: total,
        status: 1,
    });

    newOrder
        .save()
        .then((order) => {
            return res.status(200).json({
                message: "Bạn đặt hàng thành công!!!!",
                order,
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

const getAllOrder = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(404).json({
            error: "Khong tim thay tai khoang!!",
        });
    }
    if (req.user.role === "admin") {
        Order.find({})
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
    }
};

const getOrder = (req, res, next) => {
    const { id } = req.params;
    Order.findOne({ _id: id })
        .populate("cart.productID", "name slug images price _id")
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

const updateOrder = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(404).json({
            error: "Khong tim thay tai khoang!!",
            success: false
        });
    }
    if (req.user.role === "admin") {
        const { orderDetail, IndexStatus } = req.body;
        const { cart } = orderDetail;
        Order.findOne({ _id: orderDetail._id })
            .then((result) => {
                if (!result) {
                    return res.status(400).json({
                        error: "không tìm thấy đơn đặt hàng!!!",
                        success: false
                    });
                }
                if (result) {
                    if (parseInt(IndexStatus, 10) === 0) {
                        Order.findOneAndUpdate(
                            { _id: result._id },
                            {
                                $set: {
                                    status: parseInt(IndexStatus, 10),
                                },
                            },
                            {
                                new: true,
                            }
                        ).then((result) => {
                            return res.status(200).json({
                                order: result,
                                message: "Đã cập nhật thành công!!!!",
                                success: true
                            });
                        });
                    }
                    if (parseInt(IndexStatus, 10) !== 0) {
                        handleCart(cart);
                        Order.findOneAndUpdate(
                            { _id: result._id },
                            {
                                $set: {
                                    status: parseInt(IndexStatus, 10),
                                },
                            },
                            {
                                new: true,
                            }
                        ).then((result) => {
                            return res.status(200).json({
                                order: result,
                                message: "Đã cập nhật thành công!!!!",
                                success: true
                            });
                        });
                    }
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: {
                        message: err.message,
                    },
                });
            });
    }
};

const handleCart = async (cart) => {
    try {
        cart.forEach(async (item) => {
            let result = await Product.findOne({ _id: item.productID._id }).select(
                "_id sizes"
            );
            if (result) {
                cart.forEach((x) => {
                    let index = result.sizes.findIndex(
                        (xy) => xy.name.toString() === x.nameSize.toString()
                    );
                    if (index !== -1) {
                        result.sizes[index].count = result.sizes[index].count - x.quantity;
                    }
                });
                await Product.updateOne(
                    { _id: result._id },
                    {
                        $set: {
                            sizes: result.sizes,
                        },
                    }
                );
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

const lastday = function (y, m) {
    return new Date(y, m + 1, 0).getDate();
};

const getDayCT = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yy = today.getFullYear();
    const dd = lastday(yy, mm);
    return `${yy}-${mm}-${dd}`;
};

const getDayDT = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yy = today.getFullYear();
    return `${yy}-${mm}-1`;
};

const homeOrder = async (req, res, next) => {
    try {
        const orderNew = await Order.find({
            createdAt: {
                $gte: new Date(getDayDT()),
                $lte: new Date(getDayCT()),
            },
        }).sort({ createdAt: -1 });

        const orderSuccess = await Order.find({ status: 2 });
        let totalMoney = orderSuccess.reduce((a, c) => a + c.total, 0);

        return res.status(200).json({ orderNew, totalMoney });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(404).json({
                error: "Khong tim thay tai khoang!!",
                success: false
            });
        }
        if (req.user.role === "admin") {
            const { id } = req.params;
            const order = await Order.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({
                    error: "Không tìm thấy đơn hàng!!",
                    success: false
                });
            }
            const result = await order.remove();
            return res.status(200).json({
                success: true,
                order: result
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }

}

module.exports = {
    postOrder: postOrder,
    getAllOrder: getAllOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    homeOrder: homeOrder,
    deleteOrder: deleteOrder
};
