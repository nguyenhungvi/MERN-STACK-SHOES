import React from 'react';
import './index.css';

const PaginationProduct = (props) => {
    const { pageNumbers } = props;
    return (
        <ul id="page-numbers" className="pagination">
            {props.renderPrevBtn()}
            {props.renderDecrementBtn()}
            {pageNumbers &&
                // eslint-disable-next-line array-callback-return
                pageNumbers.map((item, index) => {
                    if (item === 0 && props.currentPage === 0) {
                        return (
                            <li key={item} className="active" id={item}>
                                <div
                                    style={{ cursor: "pointer" }}
                                    id={item}
                                    onClick={() => props.handleClick(item)}
                                >
                                    {item}
                                </div>
                            </li>
                        );
                    } else if (item < props.upperPageBound + 1 && item > props.lowerPageBound) {
                        return (
                            <li key={item} className={index === 1 ? "active" : undefined} id={item}>
                                <div
                                    style={{ cursor: "pointer" }}
                                    id={item}
                                    onClick={() => props.handleClick(item)}
                                >
                                    {item}
                                </div>
                            </li>
                        );
                    }
                })}
            {props.renderIncrementBtn()}
            {props.renderNextBtn()}
        </ul>

    );
}

export default PaginationProduct;
