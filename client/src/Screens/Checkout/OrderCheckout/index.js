import React, { useEffect, useState } from "react";
import "./index.css";
import { BsCheckCircle } from "react-icons/bs";
import { convertPrice } from "../../../HOC/Help";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

/**
 * BsCheckCircle
 * @param {1} props
 */
const OrderCheckout = (props) => {
    const { namePayment, info } = props;
    const category = useSelector((state) => state.category);
    const { listCategory } = category;
    const order = useSelector((state) => state.order);
    const product = useSelector((state) => state.product);
    const { listProduct } = product;
    // eslint-disable-next-line no-unused-vars
    const { error, message, postOrder } = order;
    const [notifySuccess, setNotifySuccess] = useState("");

    useEffect(() => {
        if (message !== null) {
            setNotifySuccess(message);
        }
    }, [message]);

    if (notifySuccess !== "") {
        toast.success(notifySuccess, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setNotifySuccess("");
    }

    const handleLink = (item) => {
        let data = listCategory.find((x) => x._id === item.categoryID);

        if (data) {
            return (
                <Link
                    to={`/chi-tiet/${data.slug}/${item.slug}`}
                    style={{ textTransform: "capitalize" }}
                    className="name-product-cart-in-page-address-checkout page-payment-checkout"
                >
                    {item.name.substring(0, 10)} ....
                </Link>
            );
        }
    };

    const handleShowCart = (cart) => {
        let arr = [];
        // eslint-disable-next-line array-callback-return
        cart.map((item) => {
            let data = listProduct.find((x) => x._id === item.productID);
            if (data) {
                arr.push({
                    _id: data._id,
                    name: data.name,
                    slug: data.slug,
                    price: data.price,
                    images: data.images,
                    quantity: item.quantity,
                    nameSize: item.nameSize,
                    categoryID: data.categoryID._id
                });
            }
        });

        if (arr.length > 0) {
            return (
                <>
                    {
                        arr.map((item, index) => (
                            <div key={index} className="list-product-cart-in-page-address-checkout page-payment-checkout">
                                <div>
                                    <div className="image-by-product-cart-in-page-address-checkout page-payment-checkout">
                                        <span className="quantity-product-cart-in-page-address-checkout page-payment-checkout">
                                            {" "}
                                            {item.quantity}{" "}
                                        </span>
                                        <img
                                            src={item.images[0].img}
                                            alt={item.name}
                                        />
                                    </div>
                                    {handleLink(item)}
                                </div>
                                <spam className="total-money-by-product-cart-page-address-checkout">
                                    {convertPrice(item.price * item.quantity)}
                                </spam>
                            </div>
                        ))
                    }
                    <div className="total-money-page-payment-checkout page-order-checkout">
                        <span>Thành tiền:</span>
                        <span>{convertPrice(arr.reduce((a, c) => a + c.price * c.quantity, 0))} </span>
                    </div>
                </>
            )
        }
    };

    return (
        <div className="order-checkout">
            <ToastContainer />
            <div className="thank-customer-page-order-checkout">
                <BsCheckCircle className="icon-success-page-order-checkout" />
                <h3>Cảm ơn bạn đã đặt hàng!</h3>
                <p>Đơn hàng của bạn đã được đặt thành công</p>
                <p className="code-page-order-checkout">
                    Mã đơn hàng: 235 - <span>{namePayment}</span>{" "}
                </p>
            </div>
            {/* thank-customer-page-order-checkout */}
            <div className="info-order-address-page-order-checkout">
                <div className="order-page-payment-checkout page-order-checkout">
                    <div className="title-delivery-address-page-payment-checkout">
                        <h4>Đơn hàng</h4>
                    </div>
                    {postOrder.cart && handleShowCart(postOrder.cart)}
                </div>
                {/* order-page-payment-checkout page-order-checkout */}
                <div className="address-page-order-checkout page-order-checkout">
                    <div className="delivery-address-page-payment-checkout">
                        <div className="title-delivery-address-page-payment-checkout">
                            <h4>Địa chỉ giao hàng</h4>
                        </div>
                        {/* title-delivery-address-page-payment-checkout */}
                        <div>
                            <p>{info.name}</p>
                            <p>
                                <span>Số điện thoại:</span> {info.phone}
                            </p>
                            <p>{info.address}</p>
                        </div>
                    </div>
                </div>
                {/* address-page-order-checkout */}
            </div>
            {/* info-order-address-page-order-checkout page-order-checkout*/}
            <Link
                to="/"
                className="ordered-page-payment-checkout page-order-checkout"
                onClick={() => {
                    props.handleReset();
                }}
            >
                Tiếp tục mua hàng
      </Link>
        </div>
    );
};

export default OrderCheckout;
