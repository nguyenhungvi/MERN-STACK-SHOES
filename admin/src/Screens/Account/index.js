import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout/Layout";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./index.css";
import $ from "jquery";
import { AiOutlineClose } from "react-icons/ai";
import formatCurrency from "../../util";
import { BiDetail } from "react-icons/bi";
window.$ = $;

const Account = (props) => {
    const auth = useSelector((state) => state.auth);
    const order = useSelector((state) => state.order);
    const review = useSelector((state) => state.review);
    const [accounts, setAccounts] = useState([]);
    const { loading, error, listAccount, listCart } = auth;
    const { listOrder } = order;
    const { listReview } = review;

    //begin
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(8);
    const [upperPageBound, setUpperPageBound] = useState(3);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
    const [isNextBtnActive, setIsNextBtnActive] = useState("");
    const [pageBound, setPageBound] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    //end

    useEffect(() => {
        if (listAccount.length >= 0) {
            setAccounts(listAccount);
        }
    }, [listAccount]);

    const handleInfoCustommer = (id) => {
        // console.log(id);
        if (id) {
            $(".backgroud-account").addClass("active");
        }
    };

    //   begin
    const setPrevAndNextBtnClass = (item) => {
        let totalPage = Math.ceil(listAccount.length / todosPerPage);
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
        // console.log("handleClick", item);
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
        if (listAccount) {
            setPageNumbers([
                ...Array(Math.ceil(listAccount.length / todosPerPage)).keys(),
            ]);
        }
    }, [listAccount, setPageNumbers]);
    //   end

    const handleShownDay = (item) => {
        const data = item.split("-");
        return `${data[2]}/${data[1]}/${data[0]}`;
    };

    const handleShowOrder = (id) => {
        const data = listOrder.find(
            (x) => x.userID !== null && x.userID.toString() === id.toString()
        );
        return typeof data !== "undefined" ? Object.keys(data).length : 0;
    };

    const handleShowMoney = (id) => {
        const data = listOrder.find(
            (x) => x.userID !== null && x.userID.toString() === id.toString()
        );

        return typeof data !== "undefined" ? formatCurrency(data.total) : 0;
    };

    const handleShowQtyCart = (id) => {
        const data = listCart.find((x) => x.userID.toString() === id.toString());
        return typeof data !== "undefined" ? data.cartItems.length : 0;
    };

    const handleShowReview = (id) => {
        const data = listReview.filter(
            (x) => x.userID.toString() === id.toString()
        );
        return data.length > 0 ? data.length : 0;
    };

    console.log("listAccount", listAccount);

    return (
        <Layout sidebar>
            <Container className="page">
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Danh sách tài khoản</h3>
                        </div>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr className="class-th">
                                    <th>Khách Hàng</th>
                                    <th>Email</th>
                                    <th>Ngày Tạo</th>
                                    <th>Đơn Hàng</th>
                                    <th>Tổng Tiền</th>
                                    <th>Giỏ Hàng</th>
                                    <th>Đánh Giá</th>
                                    <th>Hoạt Động</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <>Loading...</>
                            ) : (
                                    <>
                                        {listAccount &&
                                            listAccount
                                                .slice(
                                                    (currentPage - 1) * todosPerPage,
                                                    currentPage * todosPerPage
                                                )
                                                .map((item, index) => (
                                                    <tbody key={index}>
                                                        <tr className="class-tr">
                                                            <td>
                                                                <img
                                                                    src={item.avatar}
                                                                    alt={item.name}
                                                                    style={{
                                                                        width: "50px",
                                                                        height: "49px",
                                                                        borderRadius: "50%",
                                                                        fontWeight: "600",
                                                                    }}
                                                                />
                                                                <span
                                                                    style={{
                                                                        textTransform: "capitalize",
                                                                        fontWeight: "bold",
                                                                        marginLeft: "10px",
                                                                        fontWeight: "600",
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                            </td>
                                                            <td
                                                                style={{ paddingTop: "25px", fontWeight: "600" }}
                                                            >
                                                                {item.email}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {handleShownDay(item.createdAt.slice(0, 10))}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {handleShowOrder(item._id)}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {handleShowMoney(item._id)}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {handleShowQtyCart(item._id)}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {handleShowReview(item._id)}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: "center",
                                                                    paddingTop: "25px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                <BiDetail
                                                                    fontSize={25}
                                                                    style={{ cursor: "pointer", color: "red" }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                    </>
                                )}
                            {/* </tbody> */}
                        </Table>
                    </Col>
                </Row>
                {
                    (listAccount && listAccount.length > 8) ? (
                        <Row>
                            <ul id="page-numbers" className="pagination">
                                {renderPrevBtn()}
                                {renderDecrementBtn()}
                                {listAccount &&
                                    listAccount
                                        .slice(
                                            (currentPage - 1) * todosPerPage,
                                            currentPage * todosPerPage
                                        )
                                        .map((item, index) => {
                                            if (item === 0 && currentPage === 0) {
                                                return (
                                                    <li key={item} className="active" id={item}>
                                                        <div
                                                            style={{ cursor: "pointer" }}
                                                            id={item}
                                                            onClick={() => handleClick(item)}
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
                                                        key={item}
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
                        </Row>
                    ) : null
                }
                <Row>
                    <div className="backgroud-account">
                        <p className="close-background-account">
                            {/* <AiOutlineClose
                                onClick={() => {
                                    $(".backgroud-account").removeClass("active");
                                }}
                            /> */}
                        </p>
                    </div>
                    {/* backgroud-account */}
                </Row>
            </Container>
        </Layout>
    );
};

export default Account;
