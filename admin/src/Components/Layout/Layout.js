import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Header from "../Header";
import { AiFillHome, AiOutlineBars, AiOutlineCreditCard, AiOutlineLogout } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import "./Layout.css";
import { useSelector } from "react-redux";
import { RiAdminFill } from 'react-icons/ri';
import { MdRateReview, MdComment } from 'react-icons/md';
import {useDispatch} from 'react-redux';
import { logout } from "../../Actions/authAction";

const Layout = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { loading, error, user } = auth;
    return (
        <>
            {/* <Header /> */}
            {props.sidebar ? (
                <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li>
                                    {
                                        user && (
                                            <div className="info-admin">
                                                <div className="avatar-admin">
                                                    <Link to="/detail" >
                                                        <img src={user.avatar} alt={user.name} />
                                                    </Link>
                                                </div>
                                                <div className="email-name-admin">
                                                    <p style={{ textTransform: "capitalize" }} >{user.name}</p>
                                                    <p>{user.email}</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/* info-admin */}
                                    <br />
                                    <span>Menu</span>
                                </li>
                                <li>
                                    <NavLink exact to={`/`}>
                                        {" "}
                                        <AiFillHome className="icon-layout" /> Trang Chủ {" "}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/category`}>
                                        <AiOutlineBars className="icon-layout" />
                                        Thể Loại
                                        </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/product`}>
                                        <FaProductHunt className="icon-layout" />
                                        Sản Phẩm
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/order`}>
                                        <AiOutlineCreditCard className="icon-layout" />
                                        Đơn Hàng
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/account`}>
                                        <BsFillPeopleFill className="icon-layout" />
                                        Khách hàng
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/review`}>
                                        <MdComment className="icon-layout" />
                                        Đánh giá
                                    </NavLink>
                                </li>
                                <li>
                                    <div onClick={()=> dispatch(logout())} className="logout-layout">
                                        <AiOutlineLogout className="icon-layout" />
                                        Đăng xuất
                                    </div>
                                </li>
                            </ul>
                        </Col>
                        <Col md={10} className="content-layout">
                            {props.children}
                        </Col>
                    </Row>
                </Container>
            ) : (
                    props.children
                )}
        </>
    );
};

export default Layout;