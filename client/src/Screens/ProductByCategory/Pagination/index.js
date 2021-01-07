import React from 'react';
import './index.css';
import $ from 'jquery';
window.$ = $;


const Pagination = (props) => {

    const { pageNumbers, currentPage } = props;

    return (
        <div className="pagination"  >
            <ul id="page-numbers" className="pagination">
                {props.renderPrevBtn()}
                {props.renderDecrementBtn()}
                {pageNumbers &&
                    pageNumbers.map((item, index) => {
                        if (item === 0 && currentPage === 0) {
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
                                <li key={item} className={index === 1 && 'active'} id={item}>
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
        </div>
    );
}

export default Pagination;
