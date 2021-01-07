import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { FaMinus } from "react-icons/fa";
import { convertPrice } from "../../HOC/Help";
import { useDispatch, useSelector } from "react-redux";
import {
    clearCartAction,
    deleteByProductAction,
    minusQuantityAction,
    plusQuantityAction,
} from "../../Actions/cartAction";

const Cart = (props) => {
    const cart = useSelector((state) => state.cart.items);
    const product = useSelector(state => state.product);
    const { listProduct } = product;
    const dispatch = useDispatch();

    const handlePlusQtyProduct = (item) => {
        const data = listProduct.find((x) => x._id.toString() === item._id.toString());
        if (data) {
            const totalNameSize = data.sizes.find((x) => x.name.toString() === item.nameSize.toString());
            if (totalNameSize && item.quantity < totalNameSize.count) {
                dispatch(plusQuantityAction(item))
            }
        }
    }

    return (
        <div className="cart">
            <h4>Giỏ hàng</h4>

            {cart.length > 0 ? (
                <>
                    <table style={{ margin: "10px auto" }} cellpadding="0px" cellspacing="0px" class="PerformanceTable">
                        <tr>
                            <th style={{ padding: "0px!important" }} class="TableHeader">Hình Ảnh</th>
                            <th style={{ padding: "0px!important" }} class="TableHeader">Tên sản phẩm</th>
                            <th style={{ padding: "0px!important" }} class="TableHeader">Số lượng</th>
                            <th style={{ padding: "0px!important" }} class="TableHeader">Giá tiền</th>
                            <th style={{ padding: "0px!important" }} class="TableHeader">
                                <p
                                    className="clear-cart"
                                    onClick={() => dispatch(clearCartAction())}
                                >
                                    Xóa giỏ hàng{""}
                                </p>
                            </th>
                        </tr>
                        {cart &&
                            cart.map((item, index) => (
                                <tr key={index} class="TableRow">
                                    <td>
                                        <img src={item.images[0].img} alt={item.name} />
                                    </td>
                                    <td class="PerformanceCell">
                                        <div className="info-product-cart">
                                            <Link
                                                to={`/chi-tiet/giay-tay/${item.slug}`}
                                                className="name-product-in-cart"
                                                style={{ fontWeight: "600", textTransform: "capitalize" }}
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="size-product-cart">
                                                Kích thước: <span>{item.nameSize}</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="quantity-minus-plus-page-cart">
                                            <p
                                                className="minus-quantity"
                                                onClick={() => dispatch(minusQuantityAction(item))}
                                            >
                                                <FaMinus />
                                            </p>
                                            <p className="quantity-page-cart">{item.quantity}</p>
                                            <p
                                                className="plus-quantity"
                                                onClick={() => handlePlusQtyProduct(item)}
                                            >
                                                <BiPlusMedical />
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="total-money-by-product-in-cart">
                                            {convertPrice(item.price)}
                                        </p>
                                    </td>
                                    <td>
                                        <AiOutlineDelete
                                            onClick={() => dispatch(deleteByProductAction(item))}
                                            className="icon-delete-cart"
                                        />
                                    </td>
                                </tr>
                            ))}
                        {/* TableRow */}
                    </table>
                    {/* end table */}
                    <div className="total-cart">
                        <p
                            style={{
                                fontSize: "25px",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                            }}
                        >
                            Tổng cộng:{""}
                        </p>
                        <p
                            style={{
                                fontSize: "25px",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                            }}
                            className="total-money-in-cart"
                        >
                            {convertPrice(
                                parseInt(
                                    cart.reduce((a, c) => a + c.price * c.quantity, 0),
                                    10
                                )
                            )}
                        </p>
                        <Link to="/thanh-toan" className="button-checkout-cart">
                            Thanh toán{""}
                        </Link>
                    </div>
                </>
            ) : (
                    <div className="empty-cart">
                        <p>Giò hàng bị rỗng</p>
                        <Link to="/">Tiếp tục mua hàng</Link>
                    </div>
                )}

            {/* title-cart */}
        </div>
    );
};

export default Cart;
