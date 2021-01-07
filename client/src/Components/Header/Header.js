/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPhoneCall, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StyledContentLoader from 'styled-content-loader'
import { searchProductAction } from "../../Actions/productAction";

const Header = (props) => {
    const [text, setText] = useState("");
    const category = useSelector((state) => state.category);
    const auth = useSelector((state) => state.auth);
    // eslint-disable-next-line no-unused-vars
    const { loading, error, listCategory } = category;
    const cart = useSelector((state) => state.cart.items);
    const { authenticate } = auth;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCategory = (list) => {
        if (list.length > 5) {
            return (
                <>
                    {listCategory &&
                        listCategory.slice(0, 4).map((item, index) => (
                            <li key={index}>
                                <Link to={`/the-loai/${item.slug}`}>{item.name}</Link>
                            </li>
                        ))}
                    <li>
                        <a href="#" title="xem thêm">
                            xem thêm{""}
                        </a>
                        <ul>
                            {list &&
                                list.slice(4, list.length).map((item, index) => (
                                    <li key={index}>
                                        <Link to={`/the-loai/${item.slug}`}>{item.name}</Link>
                                    </li>
                                ))}
                        </ul>
                    </li>
                </>
            );
        }
    };

    const handleSearch = () => {
        if (text.length === 0) {
            toast.error("Bạn chưa nhập nội dung để tìm kiếm!!!", {
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
        dispatch(searchProductAction(text, history));
        // history.push('/tim-kiem');
        // setText("");
    };

    return (
        <div className="header">
            <ToastContainer />
            <div className="header-top">
                <div className="header-top-logo">
                    <Link to="/">giày store</Link>
                </div>
                <div />
                <div />
                <div />
                <div className="header-top-right">
                    <div className="header-top-right-account">
                        <ul>
                            <li>
                                <BiPhoneCall className="icon-header-top-right-account-phone" />
                                0338122760{""}
                            </li>
                            {authenticate ? (
                                <li>
                                    <Link to="/tai-khoan">tài khoản của bạn</Link>
                                </li>
                            ) : (
                                    <>
                                        <li>
                                            <Link to="/dang-ky">đăng ký</Link>
                                        </li>
                                        <li>
                                            <Link to="/dang-nhap">đăng nhập</Link>
                                        </li>
                                    </>
                                )}
                        </ul>
                        <p>Miễn phí vận chuyển toàn quốc</p>
                    </div>
                    <div className="header-top-right-cart">
                        <div className="header-top-right-cart-count">
                            <span>{cart && cart.length}</span>
                            <Link to="/gio-hang">
                                <AiOutlineShoppingCart className="icon-header-top-right-account-cart" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <ul>{listCategory && handleCategory(listCategory)}</ul>
                <div />
                <div />
                <div className="header-bottom-search">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm"
                    />
                    <BiSearch
                        onClick={() => handleSearch()}
                        className="icon-header-bottom-search"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
