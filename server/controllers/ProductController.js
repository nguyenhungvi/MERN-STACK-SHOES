const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");
const { removeAccents } = require("../configs/CONFIGS");
const slugify = require("slugify");

const getProducts = (req, res, next) => {
    Product.find({})
        .populate("categoryID", "_id name image")
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const postProduct = (req, res, next) => {
    if (req.user.role === "admin") {
        const { name, sizes, price, pictures, categoryById } = req.body;
        Product.findOne({ slug: slugify(removeAccents(name)) })
            .then((result) => {
                if (result) {
                    return res.status(400).json({
                        error: "Sản phẩm đã tồn tại!!!",
                    });
                } else {
                    const listsizes = [];
                    sizes.map((item) =>
                        listsizes.push({
                            name: item.nameSize,
                            count: parseInt(item.count, 10),
                        })
                    );
                    let images = [];
                    pictures.map((item) => {
                        images.push({
                            id: item.id,
                            img: item.img,
                        });
                    });
                    const newProduct = new Product({
                        name,
                        slug: slugify(removeAccents(name)),
                        images: pictures,
                        sizes: listsizes,
                        price: parseInt(price, 10),
                        categoryID: categoryById,
                    });
                    // console.log("newProduct", newProduct);
                    newProduct.save().then((result) => {
                        return res.status(201).json(result);
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
    }
};

const deleteProduct = async (req, res, next) => {
    if (req.user.role === "admin") {
        try {
            const product = await Product.findOne({ _id: req.params.id });
            if (!product) {
                return res.status(404).json({
                    error: "Không tìm thấy sản phẩm!!!",
                });
            }
            const result = await product.remove();
            await Review.deleteMany({ productID: result._id });
            return res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: error,
            });
        }
    }
};

const getProduct = (req, res, next) => {
    Product.findById({ _id: req.params.id })
        .populate("categoryID", "name")
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const updateProduct = (req, res, next) => {
    if (req.user.role === "admin") {
        const { name, sizes, price, pictures } = req.body;
        console.log("req.body", req.body);
        // return;
        Product.findOne({ _id: req.params.id })
            .then((result) => {
                if (result) {
                    let newImages = [];
                    if (pictures.length > 0) {
                        pictures.forEach((x) => {
                            newImages.push({
                                id: x.id,
                                img: x.img,
                            });
                        });
                    }

                    if (sizes.length > 0) {
                        sizes.forEach((xx) => {
                            const index = result.sizes.findIndex(
                                (xy) => xy._id == xx.nameSize
                            );
                            result.sizes[index].count = parseInt(xx.count, 10);
                        });
                    }

                    Product.findOneAndUpdate(
                        {
                            _id: req.params.id,
                        },
                        {
                            $set: {
                                name: name,
                                slug: slugify(removeAccents(name)),
                                price: parseInt(price, 10),
                                sizes: result.sizes,
                                images: newImages,
                            },
                        },
                        { new: true }
                    )
                        .populate("categoryID", "name")
                        .then((result) => {
                            return res.status(200).json(result);
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
    }
};

const getProductByCategory = (req, res, next) => {
    Product.find({ categoryID: req.params.categoryID })
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const search = async (req, res, next) => {
    // console.log("req.body", req.body);
    const { search } = req.body;
    try {
        let result = await Product.find({
            name: { $regex: search, $options: "$i" },
        });
        // console.log("result by search", result);
        return res.status(200).json({ product: result, success: true });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

const searchSizeProduct = (req, res, next) => {
    console.log(req.body);
    const { name, id } = req.body;
    if (name === "all") {
        Product.find({
            categoryID: id,
        })
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    if (name !== "all") {
        Product.find({
            categoryID: id,
            sizes: {
                $elemMatch: {
                    name: name,
                },
            },
        })
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
};

const sortProduct = async (req, res, next) => {
    /**
     * -1: sắp giảm dần
     * 1: sắp tăng dần
     */

    const { parameter, value, id } = req.body;
    if (parameter === "price") {
        Product.find({ categoryID: id })
            .sort({ price: value })
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
    if (parameter === "createdAt") {
        Product.find({ categoryID: id })
            .sort({ createdAt: value })
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

const filterProduct = (req, res, next) => {
    console.log(req.body);
    const { min, max, id } = req.body;
    if (min === "ALL") {
        Product.find({ categoryID: id })
            .populate("categoryID", "name")
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
    } else {
        Product.find({
            categoryID: id,
            price: {
                $gte: parseInt(min, 10),
                $lte: parseInt(max, 10),
            },
        })
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

const getProductBySlug = (req, res, next) => {
    const { slug } = req.params;
    Product.findOne({ slug: slug })
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

const relatedProducts = (req, res, next) => {
    const { typeById, id } = req.body;
    Product.find({ categoryID: typeById, _id: { $ne: id } })
        .then((data) => {
            if (data) {
                const result = data.sort(() => {
                    return .5 - Math.random()
                }).slice(0, 4);
                return res.status(200).json(result);
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
};

const homeProduct = async (req, res, next) => {
    try {
        const dataProduct = await Product.find({
            status: 2,
            createdAt: {
                $gte: new Date(getDayDT()),
                $lte: new Date(getDayCT()),
            },
        }).select("createdAt");
        return res.status(200).json(dataProduct);
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

const getPageHomeClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.find({ categoryID: id });
        console.log("result", result);
        return res.status(200).json({ products: result, success: true });

    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
};

module.exports = {
    search: search,
    getProducts: getProducts,
    postProduct: postProduct,
    deleteProduct: deleteProduct,
    getProduct: getProduct,
    updateProduct: updateProduct,
    getProductByCategory: getProductByCategory,
    searchSizeProduct: searchSizeProduct,
    sortProduct: sortProduct,
    filterProduct: filterProduct,
    getProductBySlug: getProductBySlug,
    relatedProducts: relatedProducts,
    homeProduct: homeProduct,
    getPageHomeClient: getPageHomeClient,
};
// const getProductPagination = (req, res, next) => {
//     /**
//      * (trangdangxem-1)*sosanphamtren1trang
//      */
//     const SoSP1Page = 6;
//     let { page } = req.params;
//     console.log("page", page);
//     let pageNumber = page ? parseInt(page, 10) : 1;
//     let skip = (pageNumber - 1) * SoSP1Page;
//     Product.find()
//         .skip(skip)
//         .limit(SoSP1Page)
//         .populate("categoryID", "_id name image")
//         .then((result) => {
//             return res.status(200).json(result);
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err });
//         });
// };
