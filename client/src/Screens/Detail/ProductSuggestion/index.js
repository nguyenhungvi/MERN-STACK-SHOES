import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { convertPrice } from "../../../HOC/Help";

const ProductSuggestion = (props) => {
    const { relateProduct, loadingRelate } = props;

    const handleShowTotalRating = (totalReview, totalStar) => {
        if (totalReview > 0 && totalStar > 0) {
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
            );
        }
    };

    return (
        <div className="product-suggestion">
            <ul>
                {loadingRelate ? (
                    <div>Loading....</div>
                ) : (
                        <>
                            {relateProduct &&
                                relateProduct.map((item, index) => (
                                    <li key={index}>
                                        <div className="one-product-suggestion-by-category">
                                            <Link to={`/chi-tiet/giay-tay/${item.slug}`}>
                                                <img
                                                    src={item.images && item.images[0].img}
                                                    alt={item.name}
                                                />
                                            </Link>
                                            <p className="name-by-product-suggestion">{item.name}</p>
                                            {/* name-by-product-safe-off-page-category-right */}

                                            <div className="star-by-product-suggestion">
                                                {handleShowTotalRating(item.totalReview, item.totalStar)}
                                            </div>
                                            {/* star-by-product-in-category-right */}
                                            <div className="price-by-product-suggestion">
                                                {convertPrice(item.price)}
                                            </div>
                                            {/* price-by-product-in-category-right */}
                                        </div>
                                        {/* product-safe-off-page-home */}
                                    </li>
                                ))}
                        </>
                    )}

                {/* end li */}
            </ul>
        </div>
    );
};

export default ProductSuggestion;
