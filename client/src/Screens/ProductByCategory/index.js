import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftProductByCategory from "./LeftProductByCategory";
import RightProductByCategory from "./RightProductByCategory";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { getProductByTypeAction } from "../../Actions/productAction";


const ProductByCategory = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const { nameCategory } = useParams();
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    // eslint-disable-next-line no-unused-vars
    const { listCategory, loading, error } = category;
    useEffect(() => {
        let data = listCategory.find(
            (x) => x.slug.toString() === nameCategory.toString()
        );
        if (data) {
            dispatch(getProductByTypeAction(data._id));
        }
        if (listCategory) {
            let x1 = listCategory.find(
                (x) => x.slug.toString() === nameCategory.toString()
            );
            if (x1) {
                setName(x1.name);
                setId(x1._id);
            }
        }
    }, [dispatch, listCategory, nameCategory]);

    return (
        <>
            <h3 className="name-product-by-category">{name}</h3>
            <div className="product-by-category">
                <div className="left-product-by-category-home">
                    <LeftProductByCategory id={id} />
                </div>
                <div className="right-product-by-category-home">
                    {/* <RightProductByCategory product={product} /> */}
                    <RightProductByCategory product={product} />
                </div>
            </div>
        </>
    );
};

export default ProductByCategory;
