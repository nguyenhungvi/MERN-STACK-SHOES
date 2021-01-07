import React, { useEffect, useState } from 'react';
import './index.css';
import { convertPrice } from '../../../HOC/Help';
import { useDispatch } from 'react-redux';
import { sortProductAction, filterProductAction, searchSizeProductAction } from '../../../Actions/productAction';
import $ from 'jquery';
window.$ = $;

const LeftProductByCategory = (props) => {
    const dispatch = useDispatch();
    const { id } = props;

    const [listSize, setListSize] = useState([]);
    const [save, setSave] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [countClick, setCountClick] = useState(0);
    const [sort, setSort] = useState("");
    const [selectFilter, setSelectFilter] = useState("");
    const [nameCategory, setNameCategory] = useState("");


    const handelLoop = () => {
        let arr = [];
        for (let i = 1; i <= 22; i++) {
            arr.push({
                id: i,
                name: (i + 23).toString(),
                quantity: i + 13,
            });
        }
        return arr;
    };

    useEffect(() => {
        let value = handelLoop();
        if (value.length > 0) {
            setListSize(value);
        }
    }, []);

    const handleClickSize = (item) => {
        let solan = countClick;
        let getQuantity = listSize.find((x) => x.id === item.id);
        if (getQuantity) {
            if (Object.keys(save).length === 0) {
                solan = solan + 1;
                setSave(item);
            }
            if (Object.keys(save).length > 0) {
                if (save.id === getQuantity.id) {
                    solan = solan + 1;
                }
                if (save.id !== getQuantity.id) {
                    solan = 1;
                    handelSendServer(getQuantity);
                    setSave(getQuantity);
                }
            }
        }
        if (solan === 1) {
            handelSendServer(getQuantity.name);
            setQuantity(getQuantity.quantity);
        }
        if (solan === 2) {
            setQuantity(0);
            handelSendServer("all");
            solan = 0;
        }
        setCountClick(solan);
    };


    const handelSendServer = (item) => {
        dispatch(searchSizeProductAction(item, id));
    }

    // begin sort
    const handleErrorSort = () => {
        let flag = true;
        if (sort.length === 0) {
            flag = false;
            $("#sort").show();
            $("#sort").text("Bạn chưa lựa chọn sắp xếp!!!");
        } else {
            $("#sort").hide();
        }
        return flag;
    }

    const handleSort = () => {
        if (handleErrorSort()) {
            const parameter = sort.split("+")[0];
            const value = sort.split("+")[1];
            dispatch(sortProductAction(parameter, value, id));
            setSelectFilter(undefined);
        }
    }
    // end sort

    // begin filter
    const handleErrorFilter = () => {
        let flag = true;
        if (selectFilter.length === 0) {
            flag = false;
            $("#filter").show();
            $("#filter").text("Bạn chưa lựa chọn sắp xếp!!!");
        } else {
            $("#filter").hide();
        }
        return flag;
    }
    const handleFilter = () => {
        if (handleErrorFilter()) {
            const min = selectFilter.split("-")[0];
            const max = selectFilter.split("-")[1];
            dispatch(filterProductAction(max, min, id));
            setSort(undefined);
        }
    }
    // end filter


    return (
        <div className="list-product-by-category">
            <div className="sort-layout">
                <label htmlFor="sort">sắp xếp theo</label><br />
                <select
                    className="browser-default"
                    name={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="" selected>
                        Sắp xếp:
            </option>
                    <option value="price+1">Giá: Tăng dần</option>
                    <option value="price+-1">Giá: Giảm dần</option>
                    <option value="createdAt+1">Cũ nhất</option>
                    <option value="createdAt+-1">Mới nhất</option>
                </select>
                <p id="sort" />
                <div className="filter-sort" onClick={() => handleSort()} >lọc</div>
            </div>
            {/* sort-layout */}
            <div className="filter-layout">
                <label htmlFor="filter">bộ lọc</label>
                <br />
                <select
                    name={selectFilter}
                    onChange={(e) => setSelectFilter(e.target.value)}
                    className="browser-default"
                >
                    <option value="" disabled selected>
                        Chọn mức giá
            </option>
                    <option value="ALL">All</option>
                    <option value="0-700000">Dưới {convertPrice(700000)}</option>
                    <option value="700000-800000">Từ {convertPrice(700000)} - {convertPrice(800000)}</option>
                    <option value="800000-900000">Từ {convertPrice(800000)} - {convertPrice(900000)}</option>
                    <option value="900000-10000000">Trên {convertPrice(900000)}</option>
                </select>
                <p id="filter" />
                <div className="filter-price" onClick={() => handleFilter()} >lọc theo giá</div>
            </div>
            {/* filter-layout */}

            <div className="size-layout">
                <label htmlFor="size">Kích thước:</label>
                <div className="list-size">
                    {listSize &&
                        listSize.map((item, index) => (
                            <div
                                onClick={() => handleClickSize(item)}
                                className={quantity === item.quantity ? "active" : ""}
                                id="element"
                                key={index}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
            </div>
            {/* size-layout */}
        </div>
        // list-product-by-category
    );
}

export default LeftProductByCategory;
