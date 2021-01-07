import React, { useState } from "react";
import "./index.css";
import { convertPrice } from "../../../HOC/Help";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postOrderAction } from "../../../Actions/orderAction";
import $ from 'jquery';
import { clearCartAction } from "../../../Actions/cartAction";
window.$ = $;

const ArrPayment = [
    { id: 0, name: "Thanh toán qua payment" },
    { id: 1, name: "Thanh toán sau khi nhận sản phẩm" },
    { id: 2, name: "Nhận tại cữa hàng" },
];

const PaymentCheckout = (props) => {
    const auth = useSelector((state) => state.auth);
    const { user } = auth;
    const { info } = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const category = useSelector((state) => state.category);
    const { listCategory } = category;
    const [index, setIndex] = useState(undefined);
    const [namePayment, setNamePayment] = useState('');

    const handleLink = (item) => {
        let data = listCategory.find((x) => x._id === item.categoryID);
        if (data) {
            return (
                <Link
                    to={`/chi-tiet/${data.slug}/${item.slug}`}
                    style={{ textTransform: "capitalize" }}
                    className="name-product-cart-in-page-address-checkout page-payment-checkout"
                >
                    {(item.name).substring(0, 10)} ....
                </Link>
            );
        }
    }

    const handleChecked = (item) => {
        let result = ArrPayment.find((x) => x.id === item.id);
        setNamePayment(result.name);
        setIndex(result.id);
    }

    const handleOrder = () => {
        if (namePayment === '') {
            $("#error_payment").show();
            $("#error_payment").text("Bạn chưa chọn phương thức thanh toán");
            return;
        } else {
            $("#error_payment").hide();
        }
        let infoPayment = {
            info,
            namePayment,
            total: cart.reduce((a, c) => a + c.price * c.quantity, 0)
        }
        dispatch(postOrderAction(infoPayment, cart));
        dispatch(clearCartAction());
        props.handleNamePayment(namePayment);
        props.handleNext();

    }

    return (
        <div className="payment-checkout">
            <div className="select-method-page-payment-checkout">
                <h4>Chọn phương thức thanh toán</h4>
                <div className="option-payment-checkout">
                    <ul style={{ listStyleType: "none", lineHeight: "30px" }}>
                        {ArrPayment &&
                            ArrPayment.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleChecked(item)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        checked={index === item.id ? "checked" : null}
                                        name={item.name}
                                        value={item.name}
                                    />
                                    {item.name}
                                </li>
                            ))}
                        <li style={{ color: "red", display: "none" }} id="error_payment" />
                    </ul>
                    <p
                        className="ordered-page-payment-checkout"
                        onClick={() => handleOrder()}
                    >
                        đặt mua
          </p>
                </div>
                {/* option-payment-checkout */}
            </div>
            {/* select-method-page-payment-checkout */}
            <div className="info-address-order-page-payment-checkout">
                <div className="delivery-address-page-payment-checkout">
                    <div className="title-delivery-address-page-payment-checkout">
                        <h4>Địa chỉ giao hàng</h4>
                        <Link to="/gio-hang" className="edit-title-delivery-address-page-payment-checkout">
                            Sửa
            </Link>
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
                {/* delivery-address-page-payment-checkout */}
                <div className="order-page-payment-checkout">
                    <div className="title-delivery-address-page-payment-checkout">
                        <h4>Đơn hàng</h4>
                        <Link to="/gio-hang" className="edit-title-delivery-address-page-payment-checkout">
                            Sửa
            </Link>
                    </div>
                    {/* title-delivery-address-page-payment-checkout */}
                    {
                        cart && cart.map((item, index) => (
                            <div className="list-product-cart-in-page-address-checkout page-payment-checkout">
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
                                    {/* image-by-product-cart-in-page-address-checkout */}
                                    {handleLink(item)}
                                    {/* <Link to="/chi-tiet/giay-tay" className="name-product-cart-in-page-address-checkout page-payment-checkout">
                                        {(item.name).substring(0, 10)} ....
                            </Link> */}
                                </div>
                                {/* name-product-cart-in-page-address-checkout */}
                                <spam className="total-money-by-product-cart-page-address-checkout">
                                    {convertPrice(item.price)}
                                </spam>
                            </div>
                        ))
                    }

                    {/* list-product-cart-in-page-address-checkout page-payment-checkout */}

                    {/* title-delivery-address-page-payment-checkout */}
                    <div className="total-money-page-payment-checkout">
                        <span>Thành tiền:</span>
                        <span>{convertPrice(cart.reduce((a, c) => a + c.price * c.quantity, 0))} </span>
                    </div>
                    {/* total-money-page-payment-checkout */}
                </div>
                {/* order-page-payment-checkout */}
            </div>
            {/* info-address-order-page-payment-checkout */}
        </div>
        // payment-checkout
    );
};

export default PaymentCheckout;
