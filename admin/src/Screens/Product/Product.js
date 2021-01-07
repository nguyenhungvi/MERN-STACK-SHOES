import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
    Spinner,
} from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../Actions/categoryAction";
import {
    deleteProductAction,
    getAllProductAction,
    getProductAction,
    reloadGetProductAction,
    searchProductAction,
} from "../../Actions/productAction";
import formatCurrency from "../../util";
import AddProduct from "./AddProduct";
import PaginationProduct from "./PaginationProduct";
import { MdStars } from "react-icons/md";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { GiAlliedStar } from "react-icons/gi";
// import { FiArrowRight } from "react-icons/fi";
import $ from "jquery";
import { AiOutlineClose } from "react-icons/ai";
window.$ = $;

const Product = (props) => {
    const [Show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [productDetai, setProductDetail] = useState({});
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const { categories } = category;
    const { products, loading, productOne, loadingOne, errorOne } = product;

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(6);
    const [upperPageBound, setUpperPageBound] = useState(3);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
    const [isNextBtnActive, setIsNextBtnActive] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [pageBound, setPageBound] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        dispatch(getCategoriesAction());
        dispatch(getAllProductAction());
    }, []);

    useEffect(() => {
        if (products.length >= 0) {
            setListProduct(products);
        }
    }, [products]);

    const ProductDetail = (id) => {
        setShowModal(true);
        let data = products.find((x) => x._id === id);
        setProductDetail(data);
    };

    const getNameCategory = (id) => {
        let nameCategory = categories.find((x) => x._id === id).name;
        return nameCategory;
    };
    const searchProduct = () => {
        dispatch(searchProductAction(text));
    };

    const handleEdit = (id) => {
        dispatch(getProductAction(id));
        setShow(true);
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const setPrevAndNextBtnClass = (item) => {
        let totalPage = Math.ceil(listProduct.length / todosPerPage);
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
                <li className={isPrevBtnActive} key={1} >
                    <span style={{ cursor: "pointer" }} id="btnPrev">
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
    useEffect(() => {
        if (currentPage) {
            // eslint-disable-next-line no-undef
            $("ul li.active").removeClass("active");
            // eslint-disable-next-line no-undef
            $("ul li#" + currentPage).addClass("active");
        }
    }, [currentPage]);
    useEffect(() => {
        if (listProduct.length > 0) {
            // setListUser(listUser);
            setPageNumbers([
                ...Array(Math.ceil(listProduct.length / todosPerPage)).keys(),
            ]);
        }
    }, [listProduct.length, setPageNumbers, todosPerPage]);
    // end pagination

    const handleShowTotalRating = (totalReview, totalStar) => {
        const arr = [];
        for (let i = 1; i <= Math.ceil(totalStar / totalReview); i++) {
            arr.push(<MdStars fontSize={20} key={i} />);
        }
        return arr;
    };

    const handleShowDetailProduct = (id) => {
        if (id) {
            $(".backgroud-account").addClass("active");
            dispatch(getProductAction(id));
        }
    };

    const handleSearchProduct = (e) => {
        if (Object.is(e.keyCode,13)) {
            dispatch(searchProductAction(text));
        }
    }

    return (
        <Layout sidebar>
            <Container className="page">
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Danh sách sản phẩm</h3>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {!Show && (
                                    <Button
                                        onClick={() => {
                                            setShow(true);
                                        }}
                                    >
                                        Thêm mới
                                    </Button>
                                )}
                                <div className="search-category">
                                    <Form.Control
                                        type="text"
                                        placeholder="Tìm kiếm theo tên sản phẩm"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyUp={(e) => handleSearchProduct(e)}
                                    />
                                    <Button
                                        onClick={() => {
                                            searchProduct();
                                        }}
                                    >
                                        Tìm kiếm{""}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row />
                <hr />
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {/* <th>STT</th> */}
                                    <th style={{ width: "17rem" }}>Tên Sản Phẩm</th>
                                    <th>Giá Sản Phẩm</th>
                                    <th>Hình Ảnh</th>
                                    <th>Loại SP</th>
                                    <th>Đánh Giá</th>
                                    <th>Hoạt Động</th>
                                </tr>
                            </thead>
                            {/* <tbody> */}
                            {loading ? (
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                    style={{
                                        margin: "10px auto",
                                        marginLeft: "212%",
                                    }}
                                />
                            ) : (
                                    <>
                                        {listProduct &&
                                            listProduct
                                                .slice(
                                                    (currentPage - 1) * todosPerPage,
                                                    currentPage * todosPerPage
                                                )
                                                .map((item, index) => (
                                                    <tbody key={item._id}>
                                                        <tr>
                                                            <td>
                                                                <span
                                                                    style={{
                                                                        textTransform: "capitalize",
                                                                        cursor: "pointer",
                                                                        fontWeight: "600",
                                                                    }}
                                                                    onClick={() => {
                                                                        handleShowDetailProduct(item._id);
                                                                        setShow(false);
                                                                    }}
                                                                >
                                                                    {item.name.length === 28
                                                                        ? item.name
                                                                        : item.name.slice(0, 30) + "...."}
                                                                </span>
                                                            </td>
                                                            <td>{formatCurrency(parseInt(item.price, 10))}</td>
                                                            <td>
                                                                <img
                                                                    src={item.images[0].img}
                                                                    alt={item.name}
                                                                    className="table-image-category"
                                                                    style={{ borderRadius: "50%" }}
                                                                />
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                {item.categoryID.name ? (
                                                                    <span style={{ textTransform: "capitalize" }}>
                                                                        {item.categoryID.name}
                                                                    </span>
                                                                ) : (
                                                                        <span style={{ textTransform: "capitalize" }}>
                                                                            {getNameCategory(item.categoryID)}
                                                                        </span>
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {item.totalReview !== 0 &&
                                                                    item.totalStar !== 0 ? (
                                                                        handleShowTotalRating(
                                                                            item.totalReview,
                                                                            item.totalStar
                                                                        )
                                                                    ) : (
                                                                        <>
                                                                            <GiAlliedStar fontSize={21} />
                                                                            <GiAlliedStar fontSize={21} />
                                                                            <GiAlliedStar fontSize={21} />
                                                                            <GiAlliedStar fontSize={21} />
                                                                            <GiAlliedStar fontSize={21} />
                                                                        </>
                                                                    )}
                                                            </td>
                                                            <td colSpan={2}>
                                                                <Button
                                                                    variant="warning"
                                                                    onClick={() => handleEdit(item._id)}
                                                                >
                                                                    Edit{""}
                                                                </Button>{" "}
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() =>
                                                                        dispatch(deleteProductAction(item._id))
                                                                    }
                                                                >
                                                                    Delete{""}
                                                                </Button>
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
                <Row>
                    <PaginationProduct
                        pageNumbers={pageNumbers}
                        renderPrevBtn={() => renderPrevBtn()}
                        renderDecrementBtn={() => renderDecrementBtn()}
                        upperPageBound={upperPageBound}
                        lowerPageBound={lowerPageBound}
                        handleClick={(item) => handleClick(item)}
                        renderIncrementBtn={() => renderIncrementBtn()}
                        renderNextBtn={() => renderNextBtn()}
                        currentPage={currentPage}
                    />
                </Row>
                {Show && <AddProduct setShow={setShow} />}
                <Row>
                    <div className="backgroud-account b-order">
                        <p className="close-background-account">
                            <AiOutlineClose
                                onClick={() => {
                                    $(".backgroud-account").removeClass("active");
                                    // handleShowDetailProduct(null);
                                    dispatch(reloadGetProductAction());
                                }}
                            />
                        </p>
                        <div className="info-order-in-page-order">
                            <h4
                                style={{
                                    fontSize: "3rem",
                                    textAlign: "center",
                                    marginBottom: "60px",
                                }}
                            >
                                Thông tin sản phẩm{""}
                            </h4>
                            {loadingOne ? (
                                <>Loading...</>
                            ) : (
                                    <>
                                        {productOne && (
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <label
                                                            htmlFor="name"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            Tên sản phẩm:{""}
                                                        </label>
                                                        <h3 style={{ textTransform: "capitalize" }}>
                                                            {productOne.name}
                                                        </h3>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="review"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            Đánh giá sản phẩm:{""}
                                                        </label>
                                                        <br />
                                                        {productOne.totalReview !== 0 &&
                                                            productOne.totalStar !== 0 ? (
                                                                handleShowTotalRating(
                                                                    productOne.totalReview,
                                                                    productOne.totalStar
                                                                )
                                                            ) : (
                                                                <>
                                                                    <GiAlliedStar fontSize={21} />
                                                                    <GiAlliedStar fontSize={21} />
                                                                    <GiAlliedStar fontSize={21} />
                                                                    <GiAlliedStar fontSize={21} />
                                                                    <GiAlliedStar fontSize={21} />
                                                                </>
                                                            )}
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label
                                                            htmlFor="price"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            Giá sản phẩm:{""}
                                                        </label>
                                                        <br />
                                                        <span style={{ fontSize: "25px" }}>
                                                            {formatCurrency(parseInt(productOne?.price, 10))}
                                                            {/* {formatCurrency(parseInt(productOne.price, 10))} */}
                                                        </span>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label
                                                            htmlFor="category"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            Loại sản phẩm:{""}
                                                        </label>
                                                        <br />
                                                        <span
                                                            style={{
                                                                fontSize: "25px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            {productOne.categoryID?.name}
                                                        </span>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label
                                                            htmlFor="images"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            ảnh sản phẩm:{""}
                                                        </label>
                                                        <br />
                                                        <ul
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around",
                                                            }}
                                                        >
                                                            {productOne.images &&
                                                                productOne.images.map((item, index) => (
                                                                    <li
                                                                        style={{ listStyleType: "none" }}
                                                                        key={index}
                                                                    >
                                                                        <img
                                                                            style={{ width: "100px" }}
                                                                            src={item.img}
                                                                            alt={productOne.name}
                                                                        />
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <label
                                                            htmlFor="sizes"
                                                            style={{
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            Kích thước:{""}
                                                        </label>
                                                        <br />
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th
                                                                        style={{
                                                                            color: "white",
                                                                            fontWeight: "bold",
                                                                            width: "3rem",
                                                                        }}
                                                                    >
                                                                        Size{""}
                                                                    </th>
                                                                    <th
                                                                        style={{
                                                                            color: "white",
                                                                            fontWeight: "bold",
                                                                            width: "3rem",
                                                                        }}
                                                                    >
                                                                        Số lượng{""}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            {productOne.sizes &&
                                                                productOne.sizes.map((item, index) => (
                                                                    <tbody
                                                                        key={index}
                                                                        className="class-tbody-product"
                                                                    >
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                }}
                                                                            >
                                                                                {item.name}
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                }}
                                                                            >
                                                                                {item.count}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                ))}
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )}
                                    </>
                                )}
                        </div>
                        {/* info-order-in-page-order */}
                    </div>
                    {/* backgroud-account */}
                </Row>
                {/* MODAL */}
            </Container>
        </Layout >
    );
};

export default Product;
