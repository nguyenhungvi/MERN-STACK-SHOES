import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout/Layout";
import formatCurrency from "../../util";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "./index.css";
import $ from "jquery";
import { AiOutlineClose } from "react-icons/ai";
import { deleteOrderAction, getOrderAction, updateOrderAction } from "../../Actions/orderAction";
window.$ = $;

const getDateOrder = (day) => {
    return day.substring(0, 10);
};

const StatusOrder = [
    { key: 0, name: "Đã hủy" },
    { key: 1, name: "Đặt hàng thành công" },
    { key: 2, name: "Đã nhận hàng" },
];

const Order = (props) => {
    const [Orders, setOrders] = useState([]);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const { loading, error, listOrder, orderDetail } = order;
    //begin
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(5);
    const [upperPageBound, setUpperPageBound] = useState(3);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
    const [isNextBtnActive, setIsNextBtnActive] = useState("");
    const [pageBound, setPageBound] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    //end
    const [IndexStatus, setIndexStatus] = useState(undefined);

    useEffect(() => {
        if (listOrder.length >= 0) {
            setOrders(listOrder);
        }
    }, [listOrder]);

    //   begin
    const setPrevAndNextBtnClass = (item) => {
        let totalPage = Math.ceil(Orders.length / todosPerPage);
        setIsNextBtnActive("disabled");
        setIsPrevBtnActive("disabled");

        if (totalPage === item && totalPage > 1) {
            setIsPrevBtnActive("");
        } else if (item === 1 && totalPage > 1) {
            setIsNextBtnActive("");
        } else if (totalPage > 1) {
            setIsNextBtnActive("");
            setIsPrevBtnActive("");
        }
    };

    // xử lý click
    const handleClick = (item) => {
        setCurrentPage(item);
        $("ul li.active").removeClass("active");
        $("ul li#" + item).addClass("active");
        setPrevAndNextBtnClass(item);
    };

    //begin render nextBtn
    const btnNextClick = () => {
        if (currentPage + 1 > upperPageBound) {
            let d1 = upperPageBound + pageBound;
            let d2 = lowerPageBound + pageBound;
            setUpperPageBound(d1);
            setLowerPageBound(d2);
        }
        let listid = currentPage + 1;
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    };

    const renderNextBtn = () => {
        let nextButton = [];
        if (isNextBtnActive === "disabled") {
            nextButton.push(
                <li className={isNextBtnActive}>
                    <span style={{ cursor: "pointer" }} id="btnNext">
                        {" "}
            Next{" "}
                    </span>
                </li>
            );
        } else {
            nextButton.push(
                <li className={isNextBtnActive}>
                    <div
                        style={{ cursor: "pointer" }}
                        id="btnNext"
                        onClick={() => btnNextClick()}
                    >
                        {" "}
            Next{" "}
                    </div>
                </li>
            );
        }
        return nextButton;
    };
    //end render nextBtn

    //begin render prevBtn
    const btnPrevClick = () => {
        if ((currentPage - 1) % pageBound === 0) {
            let d1 = upperPageBound - pageBound;
            let d2 = lowerPageBound - pageBound;
            setUpperPageBound(d1);
            setLowerPageBound(d2);
        }
        let listid = currentPage - 1;
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    };
    const renderPrevBtn = () => {
        let prevButton = [];
        if (isPrevBtnActive === "disabled") {
            prevButton.push(
                <li className={isPrevBtnActive}>
                    <span style={{ cursor: "pointer" }} id="btnPrev">
                        {" "}
            Prev{" "}
                    </span>
                </li>
            );
        } else {
            prevButton.push(
                <li className={isPrevBtnActive}>
                    <div
                        style={{ cursor: "pointer" }}
                        id="btnPrev"
                        onClick={() => btnPrevClick()}
                    >
                        {" "}
            Prev{" "}
                    </div>
                </li>
            );
        }
        return prevButton;
    };
    //end render prevBtn

    //begin render decrementBtn
    const btnDecrementClick = () => {
        let d1 = upperPageBound - pageBound;
        let d2 = lowerPageBound - pageBound;
        setUpperPageBound(d1);
        setLowerPageBound(d2);
        let listid = upperPageBound - pageBound;
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    };
    const renderDecrementBtn = () => {
        const pageDecrementBtn = [];
        if (lowerPageBound >= 1) {
            pageDecrementBtn.push(
                <li className="">
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => btnDecrementClick()}
                    >
                        <GrLinkPrevious />
                    </div>
                </li>
            );
        }
        return pageDecrementBtn;
    };
    //end render decrementBtn

    // begin render IncrenmentBtn
    const btnIncrementClick = () => {
        let d1 = upperPageBound + pageBound;
        let d2 = lowerPageBound + pageBound;
        setUpperPageBound(d1);
        setLowerPageBound(d2);

        let listid = upperPageBound + 1;
        setCurrentPage(listid);
        setPrevAndNextBtnClass(listid);
    };

    const renderIncrementBtn = () => {
        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = (
                <li className="">
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => btnIncrementClick()}
                    >
                        <GrLinkNext />
                    </div>
                </li>
            );
        }
        return pageIncrementBtn;
    };
    // end render IncrenmentBtn

    useEffect(() => {
        if (currentPage) {
            // eslint-disable-next-line no-undef
            $("ul li.active").removeClass("active");
            // eslint-disable-next-line no-undef
            $("ul li#" + currentPage).addClass("active");
        }
    }, [currentPage]);
    useEffect(() => {
        if (Orders) {
            setPageNumbers([
                ...Array(Math.ceil(Orders.length / todosPerPage)).keys(),
            ]);
        }
    }, [Orders, setPageNumbers]);
    //   end

    const handleShowDetailOrder = (id) => {
        if (id) {
            $(".backgroud-account").addClass("active");
            dispatch(getOrderAction(id));
        }
    };

    const { cart } = orderDetail;

    useEffect(() => {
        if (Object.keys(orderDetail).length > 0) {
            setIndexStatus(orderDetail.status);
        }
    }, [orderDetail]);

    const handleUpdate = (orderDetail, IndexStatus) => {
        dispatch(updateOrderAction(orderDetail, IndexStatus));
    };

    const handleDelete = (id) => {
        dispatch(deleteOrderAction(id))
        $(".backgroud-account").removeClass("active");
    }

    return (
        <Layout sidebar>
            <Container className="page">
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Danh sách đơn hàng</h3>
                        </div>
                    </Col>
                    <Row />

                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr className="class-order-th">
                                        <th
                                            style={{
                                                width: "10rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Tên{" "}
                                        </th>
                                        <th
                                            style={{
                                                width: "7rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Số điện thoại{""}
                                        </th>
                                        <th
                                            style={{
                                                width: "10rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Địa chỉ{""}
                                        </th>
                                        <th
                                            style={{
                                                width: "7rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Tổng Tiền{""}
                                        </th>
                                        <th
                                            style={{
                                                width: "10rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Trạng thái đơn hàng{""}
                                        </th>
                                        <th
                                            style={{
                                                width: "7rem",
                                                textTransform: "capitalize",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Ngày Đặt{""}
                                        </th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <tbody>Loading...</tbody>
                                ) : (
                                        <>
                                            {Order &&
                                                Orders.slice(
                                                    (currentPage - 1) * todosPerPage,
                                                    currentPage * todosPerPage
                                                ).map((item, index) => (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    textTransform: "capitalize",
                                                                    cursor: "pointer",
                                                                    fontWeight: "bold",
                                                                }}
                                                                onClick={() => handleShowDetailOrder(item._id)}
                                                            >
                                                                {item.name}
                                                            </td>
                                                            <td>{item.phone}</td>
                                                            <td className="td-address-order">
                                                                {item.address}{" "}
                                                            </td>
                                                            <td> {formatCurrency(item.total)} </td>
                                                            <td>
                                                                {
                                                                    StatusOrder.find((x) => x.key === item.status)
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>{getDateOrder(item.createdAt)}</td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                        </>
                                    )}
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ul id="page-numbers" className="pagination">
                                {renderPrevBtn()}
                                {renderDecrementBtn()}
                                {pageNumbers &&
                                    pageNumbers.map((item, index) => {
                                        if (item === 0 && currentPage === 0) {
                                            return (
                                                <li key={item} className="active" id={item}>
                                                    <div
                                                        onClick={() => handleClick(item)}
                                                        style={{ cursor: "pointer" }}
                                                        id={item}
                                                    >
                                                        {item}
                                                    </div>
                                                </li>
                                            );
                                        } else if (
                                            item < upperPageBound + 1 &&
                                            item > lowerPageBound
                                        ) {
                                            return (
                                                <li
                                                    key={index}
                                                    className={index === 1 && "active"}
                                                    id={item}
                                                >
                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        id={item}
                                                        onClick={() => handleClick(item)}
                                                    >
                                                        {item}
                                                    </div>
                                                </li>
                                            );
                                        }
                                    })}
                                {renderIncrementBtn()}
                                {renderNextBtn()}
                            </ul>
                        </Col>
                    </Row>

                    <Row>
                        <div className="backgroud-account b-order">
                            <p className="close-background-account">
                                <AiOutlineClose
                                    onClick={() => {
                                        $(".backgroud-account").removeClass("active");
                                    }}
                                />
                            </p>
                            <div className="info-order-in-page-order">
                                <h4>đơn hàng</h4>
                                {orderDetail && (
                                    <Row>
                                        <Col xs={4}>
                                            <div className="header-order">
                                                <div className="left-detail-order">
                                                    <div className="name-order">
                                                        <b>Tên:</b> <br /> <span>{orderDetail.name}</span>
                                                    </div>
                                                    <div className="phone-order">
                                                        <b>Số điện thoại:</b> <br />{" "}
                                                        <span>{orderDetail.phone}</span>
                                                    </div>
                                                    <div className="phone-order">
                                                        <b>Ngày đặt:</b>
                                                        <br /> <span>{orderDetail.createdAt}</span>
                                                    </div>
                                                    <div className="address-order">
                                                        <b>Địa chỉ giao hàng:</b>
                                                        <br /> <span>{orderDetail.address}</span>
                                                    </div>
                                                    <div className="address-order">
                                                        <b>Trạng thái đơn hàng:</b>
                                                        <br />
                                                        {/* {orderDetail.status === item.key ? "selected" : null} */}
                                                        <select
                                                            style={{
                                                                outline: "none",
                                                                width: "14rem",
                                                                borderRadius: "10px",
                                                                fontSize: "20px",
                                                                padding: "8px 10px",
                                                                fontWeight: "bold",
                                                            }}
                                                            value={IndexStatus}
                                                            onChange={(e) => setIndexStatus(e.target.value)}
                                                        >
                                                            {StatusOrder.map((item) => (
                                                                <option
                                                                    selected={
                                                                        item.key === orderDetail.status
                                                                            ? "selected"
                                                                            : null
                                                                    }
                                                                    key={item.key}
                                                                    value={item.key}
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* left-detail-order */}
                                                <div className="right-detail-order">
                                                    <div className="total-money-order">
                                                        <b>Tổng tiền:</b><br />
                                                        <span>
                                                            {formatCurrency(parseInt(orderDetail.total, 10))}
                                                        </span>
                                                    </div>
                                                    {/* total-money-order */}
                                                </div>
                                                {/* right-detail-order */}
                                            </div>
                                            {/* header-order */}
                                        </Col>
                                        {/* Col */}
                                        <Col>
                                            <div className="info-order">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: "1rem",
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "600",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                Tên sản phẩm{" "}
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: "1rem",
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "600",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                Giá{" "}
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: "1rem",
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "600",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                Số lượng{" "}
                                                            </th>
                                                            <th
                                                                style={{
                                                                    width: "1rem",
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "600",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                Tổng tiền{" "}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {typeof cart !== "undefined" &&
                                                        cart.map((item, index) => (
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td className="class-tr-detail-order">
                                                                        {item.productID.name}
                                                                    </td>
                                                                    <td style={{ color: "white" }}>
                                                                        {formatCurrency(item.productID.price)}
                                                                    </td>
                                                                    <td style={{ color: "white" }}>
                                                                        {item.quantity}
                                                                    </td>
                                                                    <td style={{ color: "white" }}>
                                                                        {formatCurrency(
                                                                            item.quantity * item.productID.price
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))}
                                                </Table>
                                            </div>
                                            {/* info-order */}
                                        </Col>
                                        {/* Col */}
                                    </Row>
                                )}
                                <div className="button-order">
                                    <div className="save-order" onClick={() => handleUpdate(orderDetail, IndexStatus)} >
                                        <FaSave fontSize={40} color={"#29d8b4"} />
                                        Lưu
                                    </div>
                                    {/* save-order */}
                                    {" "}

                                    <div className="delete-order" onClick={() => handleDelete(orderDetail._id)}  >
                                        <RiDeleteBin2Fill fontSize={40} color="red" />{""}
                                        Xóa{""}
                                    </div>
                                    {/* delete-order */}

                                </div>
                                {/* button-order */}
                            </div>
                            {/* info-order-in-page-order */}
                        </div>
                        {/* backgroud-account */}
                    </Row>
                    {/* Row Modal */}
                </Row>
            </Container>
        </Layout>
    );
};

export default Order;
