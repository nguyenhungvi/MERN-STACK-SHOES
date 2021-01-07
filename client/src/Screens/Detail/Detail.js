/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Detail.css";
import ProductSuggestion from "./ProductSuggestion";
import Comments from "./Comments";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { convertPrice } from "../../HOC/Help";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductAction,
    relateProductAction,
} from "../../Actions/productAction";
import $ from "jquery";
import { addToCartAction } from "../../Actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import { getAllReviewAction } from "../../Actions/reviewAction";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
window.$ = $;

const Detail = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector((state) => state.product);
    const review = useSelector((state) => state.review);
    const [quantity, setQuantity] = useState(1);
    const [nameSize, setNameSize] = useState("");
    const [listImage, setListImage] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const cart = useSelector((state) => state.cart.items);
    const { reviews } = review;

    // eslint-disable-next-line no-unused-vars
    const {
        productOne,
        // eslint-disable-next-line no-unused-vars
        loadingRelate,
        // eslint-disable-next-line no-unused-vars
        relateProduct,
        loadingDetail,
    } = product;

    const [total, setTotal] = useState(0);
    // eslint-disable-next-line no-unused-vars

    useEffect(() => {
        if (id) {
            dispatch(getProductAction(id));
            dispatch(getAllReviewAction(id));
        }
    }, [dispatch, id]);

    const handleClick = (item) => {
        setNameSize(item.name);
        setTotal(item.count);
    };

    const handleGetImages = (images) => {
        let arr = [];
        // eslint-disable-next-line array-callback-return
        images.map((item, index) => {
            arr.push({
                key: index,
                img: item.img,
            });
        });

        setListImage(arr);
    };

    useEffect(() => {
        if (productOne && productOne.sizes) {
            let data = productOne.sizes.reduce((a, c) => a + c.count, 0);
            setTotal(data);
        }
        if (productOne) {
            dispatch(relateProductAction(productOne.categoryID, productOne._id));
        }
        if (productOne?.images) {
            handleGetImages(productOne.images);
        }
    }, [dispatch, productOne, productOne.sizes]);

    const handleAddToCart = (product, name) => {
        if (name.length === 0) {
            return toast.error("Bạn chưa chọn size!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        let data = cart.find((x) => x._id === product._id && x.nameSize === name);
        if (typeof data !== "undefined" && Object.keys(data).length > 0) {
            return toast.error("Size này đã có trong giỏ hàng!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (typeof data === "undefined") {
            const newCart = {
                quantity: parseInt(quantity, 10),
                nameSize: name,
                images: product.images,
                name: product.name,
                price: product.price,
                _id: product._id,
                categoryID: product.categoryID,
                slug: product.slug,
            };
            dispatch(addToCartAction(newCart));
            toast.success("Thêm vào giỏ hàng thành công!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setNameSize("");
        }
    };

    const handleBuyNow = (product, name) => {
        if (name.length === 0) {
            toast.error("Bạn chưa chọn size!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        let data = cart.find((x) => x._id === product._id && x.nameSize === name);
        if (typeof data !== "undefined" && Object.keys(data).length > 0) {
            toast.error("Size này đã có trong giỏ hàng!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (typeof data === "undefined") {
            const newCart = {
                quantity: parseInt(quantity, 10),
                nameSize: name,
                images: product.images,
                name: product.name,
                price: product.price,
                _id: product._id,
                categoryID: product.categoryID,
                slug: product.slug,
            };
            dispatch(addToCartAction(newCart));
            toast.success("Thêm vào giỏ hàng thành công!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/gio-hang");
            setNameSize("");
        }
    };

    const handleShowTotalRating = (totalReview, totalStar) => {
        const arr = [];
        for (let i = 1; i <= Math.ceil(totalStar / totalReview); i++) {
            arr.push(<AiFillStar />);
        }
        for (let k = 1; k <= 5 - Math.ceil(totalStar / totalReview); k++) {
            arr.push(<AiOutlineStar />);
        }
        return arr;
    };

    const handleClickImage = (x) => {
        setIndexImage(x);
    };

    const handleShowImages = (item) => {
        const data = {
            width: 400,
            height: 250,
            zoomWidth: 500,
            img: item[indexImage]?.img,
            zoomPosition: "original"
        }
        return (
            <div className="image-detail">
                <ul>
                    {item.map((x, index) => (
                        <li
                            key={index}
                            onClick={() => handleClickImage(index)}
                            className={indexImage === index ? "active-image" : null}
                        >
                            <img src={x.img} alt={x.img} />
                        </li>
                    ))}
                </ul>
                <div className="image-show-in-detail">
                    {/* <img src={item[indexImage]?.img} alt={item[indexImage]?.img} /> */}
                    <InnerImageZoom src={item[indexImage]?.img} zoomSrc={item[indexImage]?.img} />
                </div>
            </div>
        );
    };

    return (
        <div className="detail">
            <ToastContainer />
            {loadingDetail ? (
                <ReactLoading
                    type={"spokes"}
                    className="loading-detail"
                    color={"gray"}
                    height={"10%"}
                    width={"10%"}
                />
            ) : (
                    <>
                        {productOne && (
                            <>
                                <h3 style={{ textTransform: "capitalize" }}>{productOne.name}</h3>
                                <div className="star-detail">
                                    {productOne.totalReview > 0 && productOne.totalStar > 0 ? (
                                        handleShowTotalRating(
                                            productOne.totalReview,
                                            productOne.totalStar
                                        )
                                    ) : (
                                            <>
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                            </>
                                        )}
                                </div>
                                {/* star-detail */}
                                <div className="list-image-detail">
                                    {listImage && handleShowImages(listImage)}
                                    {/* image-detail */}
                                    {/* image-show-in-detail */}
                                    <div className="info-product-in-detail">
                                        {/* code-product-detail */}
                                        <ul>
                                            <li>
                                                <div className="size-by-detail">
                                                    <label htmlFor="price">Giá:</label>
                                                    <div style={{ marginLeft: "4rem", fontSize: "34px", fontWeight: "600" }} >
                                                        {convertPrice(parseInt(productOne.price, 10))}
                                                    </div>
                                                </div>
                                                {/* price-safe-off-detail */}
                                            </li>
                                            <li>
                                                <div className="size-by-detail">
                                                    <label htmlFor="size">size:</label>
                                                    <ul>
                                                        {productOne.sizes &&
                                                            productOne.sizes.map((item, index) => (
                                                                <li
                                                                    className={
                                                                        nameSize.toString() === item.name.toString()
                                                                            ? "active"
                                                                            : null
                                                                    }
                                                                    onClick={() => handleClick(item)}
                                                                    key={index}
                                                                >
                                                                    {item.name}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                                {/* size-by-detail */}
                                            </li>
                                            <li>
                                                <div className="quantity-in-detail">
                                                    <label htmlFor="quantity">Số lượng:</label>

                                                    {total <= 0 ? (
                                                        <p className="Out-of-stock">Hết hàng</p>
                                                    ) : (
                                                            <>
                                                                {total && (
                                                                    <input
                                                                        type="number"
                                                                        value={quantity}
                                                                        onChange={(e) => setQuantity(e.target.value)}
                                                                        min="1"
                                                                        max={total}
                                                                    />
                                                                )}
                                                                <p className="count-product-detail">
                                                                    {total}
                                                                    <span>sản phẩm</span>
                                                                </p>
                                                            </>
                                                        )}
                                                </div>
                                                {/* quantity-in-detail */}
                                            </li>
                                            {total >= 0 ? (
                                                <>
                                                    <li>
                                                        <p
                                                            className="buy-now-detail"
                                                            onClick={() => handleBuyNow(productOne, nameSize)}
                                                        >
                                                            mua ngay{" "}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p
                                                            className="cart-detail"
                                                            onClick={() => handleAddToCart(productOne, nameSize)}
                                                        >
                                                            thêm vào giỏ hàng{" "}
                                                        </p>

                                                    </li>
                                                </>
                                            ) : null}
                                        </ul>
                                    </div>
                                    {/* info-product-in-detail */}
                                </div>

                                {/* list-image-detail */}
                                <div className="list-product-suggestion-in-detail">
                                    <h3>Sản phẩm gợi ý</h3>
                                    <ProductSuggestion
                                        loadingRelate={loadingRelate}
                                        relateProduct={relateProduct}
                                    />
                                </div>
                                {/* list-product-suggestion-in-detail */}
                                <div className="description-product-in-detail">
                                    <Comments productOne={productOne} />
                                </div>
                                {/* description-product-in-detail */}
                            </>
                        )}
                    </>
                )}
        </div>
        // detail
    );
};

export default Detail;
