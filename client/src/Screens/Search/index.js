/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../HOC/Help';
import $ from 'jquery';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import './index.css';
window.$ = $;

const Search = (props) => {
    const product = useSelector(state => state.product);
    const { listProduct, error, loading } = product;
    const [products, setProducts] = useState([]);
    // begin pagination
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [todosPerPage, setTodosPerPage] = useState(9);
    const [upperPageBound, setUpperPageBound] = useState(3);
    const [lowerPageBound, setLowerPageBound] = useState(0);
    const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
    const [isNextBtnActive, setIsNextBtnActive] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [pageBound, setPageBound] = useState(3);
    const [pageNumbers, setPageNumbers] = useState([]);
    // end pagination

    useEffect(() => {
        if (listProduct.length >= 0) {
            setProducts(listProduct);
        }
    }, [listProduct]);

    const setPrevAndNextBtnClass = (item) => {
        let totalPage = Math.ceil(products.length / todosPerPage);
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
        if (products) {
            setPageNumbers([
                ...Array(Math.ceil(products.length / todosPerPage)).keys(),
            ]);
        }
    }, [products, setPageNumbers, todosPerPage]);

    return (
        <div className="search">
            {
                loading ? <span>Loading...</span> : (
                    <>
                        <div className="list-product-by-category-right list-search">
                            <ul>
                                {products.length > 0 ? (
                                    products.slice(
                                        (currentPage - 1) * todosPerPage,
                                        currentPage * todosPerPage
                                    )
                                        .map((item, index) => (
                                            <li key={index}>
                                                <div className="one-product-by-category-right one-search">
                                                    {item.safeoff !== 0 && (
                                                        <span className="percent-discount-product-safe-off-page-category-right">
                                                            {item.safeoff}%
                                                        </span>
                                                    )}
                                                    {/* percent-discount-product-safe-off-page-category-right */}
                                                    <Link to={`/chi-tiet/giay-tay/${item.slug}`}>
                                                        <img src={item.images[0].img} alt={item.slug} />
                                                    </Link>
                                                    <p className="name-by-product-safe-off-page-category-right">
                                                        {item.name}
                                                    </p>
                                                    {/* name-by-product-safe-off-page-category-right */}
                                                    <div className="star-by-product-in-category-right">
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                    </div>
                                                    {/* star-by-product-in-category-right */}
                                                    <div className="price-by-product-in-category-right">
                                                        {item.safeoff === 0 ? (
                                                            <span className="price-by-product-in-category-safe-off-right">
                                                                {convertPrice(parseInt(item.price, 10))}
                                                            </span>
                                                        ) : null}

                                                        {/* price-by-product-in-category-safe-off-right */}

                                                        {/* price-cost-in-category-right */}
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
                        {/* list-product-by-category-right list-search */}
                        {
                            products.length > 1 && (
                                <ul id="page-numbers" className="pagination search-pagination">
                                    {renderPrevBtn()}
                                    {renderDecrementBtn()}
                                    {pageNumbers &&
                                        pageNumbers.map((item, index) => {
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
                                            } else if (item < upperPageBound + 1 && item > lowerPageBound) {
                                                return (
                                                    <li key={item} className={index === 1 && 'active'} id={item}>
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
                            )
                        }
                        {/* #"page-numbers */}
                    </>
                )
            }
        </div>
        // search
    );
}

export default Search;
