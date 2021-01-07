import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { convertPrice } from '../../../HOC/Help';
// eslint-disable-next-line no-unused-vars
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { getProductHomeAction } from '../../../Actions/productAction';

function HomeItem(props) {
    const { item } = props;
    const dispatch = useDispatch();
    // console.log("item by HomeItem ", item);
    const product = useSelector(state => state.product);
    // eslint-disable-next-line no-unused-vars
    const { loadingHome, errorHome, productsHome, listProduct } = product;
    // console.log("listProduct", listProduct);

    // useEffect(() => {
    //     if (item) {
    //         dispatch(getProductHomeAction(item._id));
    //     }
    // }, [dispatch, item])
    console.log("item by HomeItem", item);

    // eslint-disable-next-line no-unused-vars
    const handleShowProduct = (products, item) => {
        // eslint-disable-next-line array-callback-return
        const result = products.filter((x) => x.categoryID._id === item._id);
        console.log("result", result);

        // // console.log("result", result);
        if (result.length > 0) {
            result.map((x, index) => (
                <li key={index} >
                    <div className="product-safe-off-page-home">
                        <Link to="/">
                            <img src={x.images[0]} alt={x.slug} />
                        </Link>
                        <p className="name-by-product-safe-off-page-home">
                            {x.name}
                        </p>
                        <div className="star-by-product-in-home">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div>
                        <div className="price-by-product-in-home">
                            <span className="price-cost-in-home">
                                {convertPrice(1440000)}
                            </span>
                        </div>
                    </div>
                </li>
            ))
        }
        // return (
        // <li>
        //     <div className="product-safe-off-page-home">
        //         <Link to="/">
        //             <img src="./giaytay.jpg" alt="giay-tay" />
        //         </Link>
        //         <p className="name-by-product-safe-off-page-home">
        //             Giày Lười Da Nam Nơ Chuông Cao Cấp GL45{""}
        //         </p>
        //         <div className="star-by-product-in-home">
        //             <AiFillStar />
        //             <AiFillStar />
        //             <AiFillStar />
        //             <AiFillStar />
        //             <AiFillStar />
        //         </div>
        //         {/* star-by-product-in-home */}
        //         <div className="price-by-product-in-home">
        //             <span className="price-cost-in-home">
        //                 {convertPrice(1440000)}
        //             </span>
        //         </div>
        //     </div>
        //     {/* product-safe-off-page-home */}
        // </li>
        // )
    }



    return (
        <div className="home">
            <div className="type-shoes-home">
                <div className="title-shoes-home">
                    <p className="name-title-page-home">{item?.name}</p>
                    {/* name-title-page-home */}
                    <p className="dotted-title-home" />
                </div>
                {/* title-shoes-home */}
            </div>
            {/* type-shoes-home */}
            <div className="list-product-safe-off-page-home">
                <ul>
                    {
                        loadingHome ? (
                            <div>Loading....</div>
                        ) : (
                                <>
                                    {productsHome && handleShowProduct(listProduct, item)}
                                </>
                            )
                    }
                    {/* end li */}
                </ul>
                {/* <Link to={`/the-loai/${item.slug}`} className="see-more-products-page-home">
                    xem thêm sản phẩm{" "}
                </Link> */}
            </div>
            {/* list-product-safe-off-page-home */}
        </div >
    )
}
export default HomeItem;