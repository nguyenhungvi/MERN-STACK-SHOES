const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");

const postReview = async (req, res, next) => {
  try {
    const {
      name,
      email,
      contentReview,
      countRating,
      id,
      userID,
      avatar,
    } = req.body.data;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({
        error: "Không tìm thấy sản phẩm!!",
      });
    }

    const newReview = new Review({
      name,
      email,
      content: contentReview,
      star: countRating,
      productID: id,
      userID: userID ? userID : undefined,
      avatar: avatar ? avatar : undefined,
    });
    let result = await newReview.save();
    if (!result) {
      return res.status(404).json({
        error: "Đã có lỗi xảy ra!!",
      });
    }
    let data = await Product.findOneAndUpdate(
      {
        _id: product._id,
      },
      {
        $set: {
          totalStar: product.totalStar + countRating,
          totalReview: product.totalReview + 1,
        },
      },
      {
        new: true,
      }
    ).select("_id totalReview totalStar");

    return res.status(201).json({ result, data });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const getReview = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return res.status(404).json({
        error: "Không tìm thấy sản phẩm!!!",
      });
    }
    const reviews = await Review.find({ productID: product._id });
    if (!reviews) {
      return res.status(404).json({
        error: "Đã có lỗi xảy ra!!!",
      });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
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

const getReviewHome = async (req, res, next) => {
  try {
    const dataReview = await Review.find({
      createdAt: {
        $gte: new Date(getDayDT()),
        $lte: new Date(getDayCT()),
      },
    }).populate("productID", "name");
    return res.status(200).json(dataReview);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const getAllReview = async (req, res, next) => {
  try {
    const result = await Review.find({}).populate("productID", "name");
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Review.findById({ _id: id });
    if (!result) {
      return res.status(404).json({
        error: "Không tìm thấy đánh giá!!!",
      });
    }
    const dataProduct = await Product.findOne({ _id: result.productID }).select(
      "totalStar totalReview"
    );
    if (!dataProduct) {
      return res.status(404).json({
        error: "Đã có lỗi xảy ra!!!",
      });
    }

    const data = await result.deleteOne();

    await Product.findOneAndUpdate(
      {
        _id: data.productID,
      },
      {
        $set: {
          totalStar: dataProduct.totalStar - data.star,
          totalReview: dataProduct.totalReview - 1,
        },
      },
      {
        new: true,
      }
    ).select("totalStar totalReview");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  postReview: postReview,
  getReview: getReview,
  getReviewHome: getReviewHome,
  getAllReview: getAllReview,
  deleteReview: deleteReview,
};
