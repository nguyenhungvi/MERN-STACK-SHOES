import React, { useState, useEffect } from "react";
import "./index.css";
import pcVN from "pc-vn";
import { Link } from "react-router-dom";
import $ from "jquery";
import { convertPrice } from "../../../HOC/Help";
import { useSelector, useDispatch } from "react-redux";
import { GiCancel } from "react-icons/gi";
window.$ = $;

const REGEX_PHONE = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

const AddressCheckout = (props) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { listCategory } = category;

    const auth = useSelector((state) => state.auth);
    const { user } = auth;

    const [name, setName] = useState(
        Object.keys(user).length > 0 ? user.name : ""
    );
    const [phone, setPhone] = useState(
        Object.keys(user).length > 0 ? user.phone : ""
    );
    const [address, setAddress] = useState(
        Object.keys(user).length > 0 ? user.address : ""
    );
    const [newAddress, setNewAddress] = useState(false);
    const cart = useSelector((state) => state.cart.items);
    ///
    const [listCity, setListCity] = useState([]);
    const [listDistructs, setListDistructs] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [city, setCity] = useState(undefined);
    const [distruct, setDistruct] = useState(undefined);
    const [ward, setWard] = useState(undefined);
    const [street, setStreet] = useState("");
    ///
    useEffect(() => {
        const getProvinces = pcVN.getProvinces();
        setListCity(getProvinces);
        if (typeof city !== "undefined") {
            let data = pcVN.getDistrictsByProvinceCode(city);
            setListDistructs(data);
        }
        if (typeof distruct !== "undefined") {
            let dataWards = pcVN.getWardsByDistrictCode(distruct);
            setListWards(dataWards);
        }
    }, [city, dispatch, distruct]);

    const handleError = () => {
        let flag = true;
        if (name.length === 0) {
            flag = false;
            $("#error_name_client").show();
            $("#error_name_client").text("Họ tên không được để trống!!!");
        } else {
            $("#error_name_client").hide();
        }
        if (phone.length === 0 || !REGEX_PHONE.test(phone)) {
            flag = false;
            $("#error_phone_client").show();
            $("#error_phone_client").text("Số điện thoại không được để trống!!!");
        } else {
            $("#error_phone_client").hide();
        }

        if (Object.is(city, undefined)) {
            $("#error_city_client").text("Vui lòng chọn Thành Phố/Tỉnh!");
            $("#error_city_client").show();
            flag = false;
        } else {
            $("#error_city_client").hide();
        }

        if (Object.is(distruct, undefined)) {
            $("#error_distruct_client").text("Vui lòng chọn Quận/Huyện!");
            $("#error_distruct_client").show();
            flag = false;
        } else {
            $("#error_distruct_client").hide();
        }

        if (Object.is(ward, undefined)) {
            $("#error_ward_client").text("Vui lòng chọn Xã/Thị Trấn!");
            $("#error_ward_client").show();
            flag = false;
        } else {
            $("#error_ward_client").hide();
        }

        if (street.length === 0) {
            $("#error_street_client").text("Vui lòng nhập tên đường!");
            $("#error_street_client").show();
            flag = false;
        } else {
            $("#error_street_client").hide();
        }

        return flag;
    };

    const toUpper = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(function (Word) {
                return Word[0].toUpperCase() + Word.substr(1);
            })
            .join(' ');
    }

    const handleAddNewAddress = (e) => {
        e.preventDefault();
        if (handleError()) {
            const d1 = listCity.find((x) => x.code.toString() === city.toString());
            const d2 = listDistructs.find(
                (x) => x.code.toString() === distruct.toString()
            );
            const d3 = listWards.find((x) => x.code.toString() === ward.toString());
            let newAddress = "";
            if (d1 || d2 || d3) {
                newAddress = `${toUpper(street)}, ${d3.name}, ${d2.name}, ${d1.name}`;
            }
            
            setNewAddress(false);
            const item = {
                name,
                phone,
                address: newAddress,
                id: null,
            };
            
            setName("");
            setPhone("");
            setCity(undefined);
            setDistruct(undefined);
            setWard(undefined);
            setStreet("");
            props.handleGetInfo(item);
        }
    };

    const handleLink = (item) => {
        let data = listCategory.find((x) => x._id === item.categoryID);
        if (data) {
            return (
                <Link
                    to={`/chi-tiet/${data.slug}/${item.slug}`}
                    style={{ textTransform: "capitalize" }}
                    className="name-product-cart-in-page-address-checkout"
                >
                    {item.name}
                </Link>
            );
        }
    };

    const handleDeleteAddressOrder = () => {
        setName("");
        setAddress("");
        setPhone("");
        setNewAddress(false);
    };

    const handleShipToAddress = () => {
        props.handleNext();
        const item = {
            name,
            phone,
            address,
            id: null,
        };
        props.handleGetInfo(item);
    };

    return (
        <div className="address-checkout">
            <div className="info-order-address-checkout">
                <div className="title-address-checkout">
                    <div>
                        <span>đơn hàng</span>
                        <br />
                        <span>(1 sản phẩm)</span>
                    </div>
                    {/* title-address-checkout */}
                    <Link to="/gio-hang" className="edit-order-address-checkout">
                        sửa
          </Link>
                </div>
                {/* edit-order-address-checkout */}
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div
                            key={index}
                            className="list-product-cart-in-page-address-checkout"
                        >
                            <div>
                                <div className="image-by-product-cart-in-page-address-checkout">
                                    <span className="quantity-product-cart-in-page-address-checkout">
                                        {" "}
                                        {item.quantity}{" "}
                                    </span>
                                    <img src={item.images[0].img} alt={item.name} />
                                </div>
                                {/* image-by-product-cart-in-page-address-checkout */}
                                {handleLink(item)}
                            </div>
                            {/* name-product-cart-in-page-address-checkout */}
                            <spam className="total-money-by-product-cart-page-address-checkout">
                                {convertPrice(item.price)}
                            </spam>
                        </div>
                    ))
                ) : (
                        <div>loading...</div>
                    )}

                {/* list-product-cart-in-page-address-checkout */}

                <p className="total-money-address-checkout">
                    <span>Thành tiền:</span>
                    <span>
                        {convertPrice(cart.reduce((a, c) => a + c.price * c.quantity, 0))}
                    </span>
                </p>
                {/* total-money-address-checkout */}
            </div>
            {/* info-order-address-checkout */}
            <div className="delivery-address-checkout">
                <div className="title-delivery-address-checkout">
                    <div>
                        <h3>Địa chỉ giao hàng</h3>
                        <p>Chọn địa chỉ giao hàng</p>
                    </div>
                    {newAddress ? (
                        <div className="form-add-new-address-checkout">
                            <h4>Thêm địa chỉ</h4>
                            <form onSubmit={(e) => handleAddNewAddress(e)}>
                                <div className="div-input-address-checkout">
                                    <div className="input-in-address-checkout"  >
                                        <label htmlFor="name"> Họ tên: </label>
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Mời bạn nhập họ và tên"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ textTransform: "capitalize" }}
                                        />
                                        <br />
                                        <span
                                            style={{ color: "red", fontWeight: "bold", display: "none" }}
                                            id="error_name_client"
                                        />
                                    </div>
                                    {/* input-in-address-checkout */}
                                    <div className="input-in-address-checkout">
                                        <label htmlFor="phone"> Số điện thoại: </label>
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Mời bạn nhập số điện thoại"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <br />
                                        <span
                                            style={{ color: "red", fontWeight: "bold", display: "none" }}
                                            id="error_phone_client"
                                        />
                                    </div>
                                    {/* input-in-address-checkout */}
                                </div>
                                {/* end div input */}
                                <div className="div-textarea-in-address-checkout">
                                    <div
                                        style={{ display: "flex" }}
                                    >
                                        <div>
                                            <label htmlFor="city">Tỉnh/Thành Phố:</label>
                                            <br />
                                            <select
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                style={{
                                                    width: "16rem",
                                                    padding: "10px",
                                                    borderRadius: "20px",
                                                    fontSize: "18px",
                                                    outline: "none",
                                                    marginRight: "5px"
                                                }}
                                            >
                                                <option value="">Vui lòng chọn tỉnh/thành phố </option>
                                                {listCity &&
                                                    listCity.map((item, index) => (
                                                        <option key={index} value={item.code}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select><br />
                                            <span
                                                style={{ color: "red", fontWeight: "bold", display: "none" }}
                                                id="error_city_client"
                                            />
                                        </div>
                                        {/* city */}
                                        {city && (
                                            <div>
                                                <label htmlFor="distruct">Quận/Huyện:</label>
                                                <br />
                                                <select
                                                    value={distruct}
                                                    onChange={(e) => setDistruct(e.target.value)}
                                                    style={{
                                                        width: "16rem",
                                                        padding: "10px",
                                                        borderRadius: "20px",
                                                        fontSize: "18px",
                                                        outline: "none",
                                                        marginLeft: "6px",
                                                    }}
                                                >
                                                    <option value="">Vui lòng chọn Quận/Huyện </option>
                                                    {listDistructs &&
                                                        listDistructs.map((item, index) => (
                                                            <option key={index} value={item.code}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select><br />
                                                <span
                                                    style={{ color: "red", fontWeight: "bold", display: "none" }}
                                                    id="error_distruct_client"
                                                />
                                            </div>
                                            // distruct
                                        )}
                                    </div>
                                    <div
                                        style={{ display: "flex" }}
                                    >
                                        {distruct && (
                                            <div>
                                                <label htmlFor="ward">Xã/Thị Trấn:</label>
                                                <br />
                                                <select
                                                    value={ward}
                                                    onChange={(e) => setWard(e.target.value)}
                                                    style={{
                                                        width: "16rem",
                                                        padding: "10px",
                                                        borderRadius: "20px",
                                                        fontSize: "18px",
                                                        outline: "none",
                                                    }}
                                                >
                                                    <option value="">Vui lòng chọn Thị Trấn/Xã </option>
                                                    {listWards &&
                                                        listWards.map((item, index) => (
                                                            <option key={index} value={item.code}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select><br />
                                                <span
                                                    style={{ color: "red", fontWeight: "bold", display: "none" }}
                                                    id="error_ward_client"
                                                />
                                            </div>
                                            // distruct
                                        )}
                                        {ward && (
                                            <div>
                                                <label htmlFor="ward">Số nhà và Tên Đường:</label>
                                                <br />
                                                <input
                                                    type="text"
                                                    placeholder="Vui lòng nhập Số nhà và Tên Đường"
                                                    value={street}
                                                    onChange={(e) => setStreet(e.target.value)}
                                                    style={{
                                                        width: "15rem",
                                                        padding: "8px",
                                                        borderRadius: "20px",
                                                        fontSize: "16px",
                                                        outline: "none",
                                                        marginLeft: "9px",
                                                        textAlign: "center",
                                                        textTransform: "capitalize"
                                                    }}
                                                />
                                                <br />
                                                <span
                                                    style={{ color: "red", fontWeight: "bold", display: "none" }}
                                                    id="error_street_client"
                                                />
                                            </div>
                                            // distruct
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="button-finish-in-address-checkout"
                                    type="submit"
                                >
                                    hoàn thành{""}
                                </button>
                            </form>
                        </div>
                    ) : (
                            // form-add-new-address-checkout
                            name !== "" &&
                            phone !== "" &&
                            address !== "" && (
                                <div div className="info-delivery-address-checkout">
                                    {Object.keys(user).length > 0 ? null : (
                                        <div
                                            className="cancel-address-checkout"
                                            onClick={() => handleDeleteAddressOrder()}
                                        >
                                            <GiCancel />
                                        </div>
                                    )}
                                    <p style={{ textTransform: "capitalize" }}>{name}</p>
                                    <p>
                                        <span>Số điện thoại:</span> {phone}
                                    </p>
                                    <p>
                                        <span>Địa chỉ:</span>
                                        <span style={{ textTransform: "capitalize" }}>{address}</span>
                                    </p>
                                    <p
                                        className="continue-payment-signin-checkout"
                                        onClick={() => {
                                            handleShipToAddress();
                                        }}
                                    >
                                        giao đến địa chỉ này{" "}
                                    </p>
                                </div>
                            )

                            // info-delivery-address-checkout
                        )}
                    {Object.keys(user).length > 0
                        ? null
                        : !newAddress && (
                            <div
                                className="button-add-new-address-checkout"
                                onClick={() => setNewAddress(true)}
                            >
                                thêm địa chỉ mới
                            </div>
                        )}
                </div>
                {/* title-delivery-address-checkout */}
                <div className="ship-address-checkout"></div>
                {/* ship-address-checkout */}
            </div>
            {/* delivery-address-checkout */}
        </div>
        // address-checkout
    );
};

export default AddressCheckout;
