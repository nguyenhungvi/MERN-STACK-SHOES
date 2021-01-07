import React from "react";
import {
    Button,
    Col,
    Container,
    Jumbotron,
    Row,
    Accordion,
    Card,
} from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import "./Home.css";
import { Link, NavLink } from "react-router-dom";
import formatCurrency from "../../util";
import { RiAccountPinCircleFill } from "react-icons/ri";
import {
    MdRateReview,
    MdShoppingCart,
    MdAttachMoney,
    MdStars,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
/**
 * @param {*} props
 * MdAttachMoney
 * MdShoppingCart
 * MdRateReview
 * RiAccountPinCircleFill
 */

const Home = (props) => {
    const order = useSelector((state) => state.order);
    const review = useSelector((state) => state.review);
    const auth = useSelector((state) => state.auth);
    const { orderNew, totalMoney } = order;
    const { reviews } = review;
    const { accountNew } = auth;

    const handleShowTotalRating = (item) => {
        const arr = [];
        for (let i = 1; i <= item; i++) {
            arr.push(<MdStars fontSize={20} />);
        }
        return arr;
    };

    const handleUpdateDay = (item) => {
        const data = item.split("-");
        return `${data[2]}-${data[1]}-${data[0]}`;
    };

    const handleGetTime = (item) => {
        item = new Date(item);
        const h = item.getHours();
        const m = item.getMinutes();
        const s = item.getSeconds();
        return `${h}:${m}:${s}`;
    }

    return (
        <Layout sidebar>
            <Container className="page">
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Trang chủ</h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Row>
                            <Col className="border-page-home">
                                <Row>
                                    <Col xs={4}>
                                        <MdAttachMoney className="icon-page-home" />
                                    </Col>
                                    <Col className="detail-page-home">
                                        <span>Tổng tiền</span>
                                        <br />
                                        <span className="number-page-home">
                                            {totalMoney && totalMoney !== 0
                                                ? formatCurrency(totalMoney)
                                                : 0}
                                        </span>
                                    </Col>
                                    <Col xs={1}></Col>
                                </Row>
                            </Col>
                            <Col className="border-page-home">
                                <Row>
                                    <Col xs={4}>
                                        <MdShoppingCart className="icon-page-home" />
                                    </Col>
                                    <Col className="detail-page-home">
                                        <span>Đơn hàng</span>
                                        <br />
                                        <span>
                                            {orderNew && orderNew.length !== 0 ? orderNew.length : 0}
                                        </span>
                                    </Col>
                                    <Col xs={1}></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: "-25px", marginRight: "-25px" }}>
                            <Col>
                                <Jumbotron
                                    style={{
                                        boxShadow: "4px 4px 6px 3px #2347665e",
                                        background: "white",
                                        zIndex: "20",
                                    }}
                                >
                                    <h3 style={{ marginTop: "-50px" }}>Đơn hàng mới</h3>
                                    {orderNew &&
                                        orderNew.slice(0, 9).map((item, index) => (
                                            <Accordion
                                                defaultActiveKey="0"
                                                key={index}
                                                style={{
                                                    width: "113%",
                                                    marginLeft: "-48px",
                                                    marginBottom: "-32px",
                                                    display: "inline-block",
                                                }}
                                            >
                                                <Card
                                                    style={{
                                                        boxShadow: "none",
                                                        border: "none",
                                                        width: "99%",
                                                        padding: "0",
                                                        boxShadow: "none",
                                                    }}
                                                >
                                                    <Card.Header
                                                        style={{
                                                            width: "100%",
                                                            padding: "0",
                                                        }}
                                                    >
                                                        <Card.Body
                                                            style={{
                                                                background: "transparent",
                                                                width: "100%",
                                                                background: "#e1e1c",
                                                                padding: "5px 26px",
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <div>
                                                                <span style={{ fontWeight: "600" }}>
                                                                    {handleUpdateDay(item.createdAt.slice(0, 10))},
                                                                    {handleGetTime(item.createdAt)}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    <span style={{ textTransform: "capitalize" }}>
                                                                        {item.name}
                                                                    </span>{" "}
                                  , {item.cart.length} sản phẩm
                                </span>
                                                            </div>
                                                            <div>{formatCurrency(item.total)}</div>
                                                        </Card.Body>
                                                    </Card.Header>
                                                </Card>
                                                {/* Card */}
                                            </Accordion>
                                        ))}

                                    {/* Accordion */}
                                </Jumbotron>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <Row>
                            <Col className="border-page-home">
                                <Row>
                                    <Col xs={4}>
                                        <MdRateReview className="icon-page-home" />
                                    </Col>
                                    <Col className="detail-page-home">
                                        <span>Đánh giá</span>
                                        <br />
                                        <span>
                                            {reviews && reviews.length !== 0 ? reviews.length : 0}
                                        </span>
                                    </Col>
                                    <Col xs={1}></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="list-reviews">
                                <Row className="one-review-page-home">
                                    <Col>
                                        {reviews &&
                                            reviews.map((item, index) => (
                                                <Row style={{ marginBottom: "8px" }}>
                                                    <Col xs={4}>
                                                        <img
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius: "50%",
                                                                lineHeight: "20px",
                                                                marginTop: "10px",
                                                            }}
                                                            src={item.avatar}
                                                            alt={item.content}
                                                        />
                                                    </Col>
                                                    <Col
                                                        style={{ marginLeft: "-20px", lineHeight: "22px" }}
                                                    >
                                                        <>{handleShowTotalRating(item.star)}</>
                                                        <br />
                                                        <>
                                                            <span>{item.name}</span>
                                                            <br />
                                                            <span>
                                                                {item.content.length > 16
                                                                    ? item.content.substr(0, 13) + "...."
                                                                    : item.content}
                                                            </span>
                                                        </>
                                                    </Col>
                                                </Row>
                                            ))}
                                        {/* Row */}
                                    </Col>
                                </Row>

                                <Row className="one-customer-page-home">
                                    <Col>
                                        <NavLink to="/review" className="nav-link">
                                            Xem tất cả đánh giá
                    </NavLink>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <Row>
                            <Col className="border-page-home">
                                <Row>
                                    <Col xs={4}>
                                        <RiAccountPinCircleFill className="icon-page-home" />
                                    </Col>
                                    <Col className="detail-page-home">
                                        <span>Tài khoản admin</span>
                                        <br />
                                        <span>
                                            {accountNew && accountNew.length !== 0
                                                ? accountNew.length
                                                : 0}
                                        </span>
                                    </Col>
                                    <Col xs={1}></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="list-customer">
                                {accountNew &&
                                    accountNew.map((item, index) => (
                                        <Row key={index} className="one-customer-page-home">
                                            <Col>
                                                <img
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                    }}
                                                    src={item.avatar}
                                                    alt="demo"
                                                />
                                                <span>{item.name}</span>
                                            </Col>
                                        </Row>
                                    ))}

                                {/* <Row className="one-customer-page-home">
                                    <Col>
                                        <NavLink to="/account" className="nav-link">
                                            Xem tất cả khách hàng
                    </NavLink>
                                    </Col>
                                </Row> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Home;
