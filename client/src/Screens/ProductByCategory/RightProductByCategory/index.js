/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { convertPrice } from "../../../HOC/Help";
import "./index.css";
import ReactLoading from "react-loading";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import $ from "jquery";
window.$ = $;

const RightProductByCategory = (props) => {
    const { product } = props;
    // begin pagination
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [todosPerPage, setTodosPerPage] = useState(9);
    const [upperPageBound, setUpperPageBound] = useState(3);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
    const [isNextBtnActive, setIsNextBtnActive] = useState("");
    const [pageBound, setPageBound] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    // end pagination
    const [Reviews, setReviews] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const { loading, error, productByCategory } = product;


    // handle pagination
    const setPrevAndNextBtnClass = (item) => {
        let totalPage = Math.ceil(productByCategory.length / todosPerPage);
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
        if (productByCategory.length >= 0) {
            setPageNumbers([
                ...Array(Math.ceil(productByCategory.length / todosPerPage)).keys(),
            ]);
        }
    }, [productByCategory, setPageNumbers, todosPerPage]);

    const handleShowRating = (totalReview, totalStar) => {

        if (totalStar > 0) {
            const arr = [];
            for (let i = 1; i <= Math.ceil(totalStar / totalReview); i++) {
                arr.push(<AiFillStar />);
            }
            for (let k = 1; k <= 5 - Math.ceil(totalStar / totalReview); k++) {
                arr.push(<AiOutlineStar />);
            }
            return arr;
        } else {
            return (
                <>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                </>
            )
        }
    };

    return (
        <div className="right-product-by-category">
            <div className="list-product-by-category-right">
                <ul>
                    {loading ? (
                        <ReactLoading
                            type={"spokes"}
                            className="loading-detail"
                            color={"gray"}
                            height={"10%"}
                            width={"10%"}
                        />
                    ) : productByCategory.length > 0 ? (
                        productByCategory
                            .slice(
                                (currentPage - 1) * todosPerPage,
                                currentPage * todosPerPage
                            )
                            .map((item, index) => (
                                <li key={index}>
                                    <div className="one-product-by-category-right">
                                        <Link to={`/chi-tiet/giay-tay/${item.slug}`}>
                                            <img src={item.images[0].img} alt={item.slug} />
                                        </Link>
                                        <p className="name-by-product-safe-off-page-category-right">
                                            {item.name}
                                        </p>
                                        {/* name-by-product-safe-off-page-category-right */}
                                        <div className="star-by-product-in-category-right">
                                            {handleShowRating(item.totalReview, item.totalStar)}
                                        </div>
                                        {/* star-by-product-in-category-right */}
                                        <div className="price-by-product-in-category-right">
                                            <span className="price-by-product-in-category-safe-off-right">
                                                {convertPrice(parseInt(item.price, 10))}
                                            </span>
                                        </div>
                                        {/* price-by-product-in-category-right */}
                                    </div>
                                    {/* product-safe-off-page-home */}
                                </li>
                            ))
                    ) : (
                                <div className="no-find-product-page">
                                    KHONG TIM THAY SAN PHAM NAO
                                </div>
                            )}

                    {/* end li */}
                </ul>
            </div>
            {productByCategory.length > 0 ? (
                <Pagination
                    pageNumbers={pageNumbers}
                    renderPrevBtn={() => renderPrevBtn()}
                    renderDecrementBtn={() => renderDecrementBtn()}
                    renderIncrementBtn={() => renderIncrementBtn()}
                    renderNextBtn={() => renderNextBtn()}
                    currentPage={currentPage}
                    handleClick={(item) => handleClick(item)}
                    upperPageBound={upperPageBound}
                    lowerPageBound={lowerPageBound}
                />
            ) : null}
        </div>
        // right-product-by-category
    );
};

export default RightProductByCategory;
