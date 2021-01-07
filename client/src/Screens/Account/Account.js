/* eslint-disable jsx-a11y/alt-text */
/**
 * https://www.w3resource.com/javascript/form/phone-no-validation.php
 * https://stackoverflow.com/questions/45213755/swift-regular-expressions-name-validate-vietnamese-name
 */
import React, { useEffect, useRef, useState } from "react";
import "./Account.css";
import { convertPrice } from "../../HOC/Help";
import pcVN from "pc-vn";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
    logoutAction,
    updateAvatarAction,
    updateInfoCusAction,
} from "../../Actions/authAction";
import { useHistory } from "react-router-dom";
import Input from "../../Components/Input";
import $ from "jquery";
window.$ = $;

const REGEX_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const getCharacterLast = (str) => {
    return str.substr(str.length - 5);
};

const getDateOrder = (day) => {
    return day.substring(0, 10);
};

const Account = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const refAvatar = useRef(null);
    const [notifySuccess, setNotifySuccess] = useState("");
    const auth = useSelector((state) => state.auth);
    const { messageSignin, user, listOrder, authenticate, messageGG, messageFB } = auth;
    const [updateInfoCustommer, setUpdateInfoCustommer] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [listCity, setListCity] = useState([]);
    const [listDistructs, setListDistructs] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [city, setCity] = useState(undefined);
    const [distruct, setDistruct] = useState(undefined);
    const [ward, setWard] = useState(undefined);
    const [street, setStreet] = useState("");
    const cart = useSelector(state => state.cart.items);

    useEffect(() => {
        if (!Object.is(messageGG, undefined)) {
            toast.success(messageGG, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!Object.is(messageFB, undefined)) {
            toast.success(messageFB, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        const id = setTimeout(() => {
            dispatch(logoutAction(cart));
        }, 8000);//cho nay nha ong, ok
        return () => { clearTimeout(id) };
    }, [messageGG, messageFB]);

    const handleError = () => {
        let flag = true;
        if (typeof (phone) === 'undefined' || phone.length === 0 || !REGEX_PHONE.test(phone)) {
            $("#error_phone").show();
            $("#error_phone").text(
                "Số điện thoại không được để trống hoặc tối thiểu 10 chữ số!!!"
            );
            flag = false;
        } else {
            $("#error_phone").hide();
        }

        // if (address.length === 0) {
        //     $("#error_address").show();
        //     $("#error_address").text("Địa chỉ không được để trống!!!");
        //     flag = false;
        // } else {
        //     $("#error_address").hide();
        // }

        return flag;
    };

    const handleUpdate = () => {
        // console.log("handleError", handleError());
        // if (handleError()) {
        const d1 = listCity.find((x) => x.code.toString() === city.toString());
        const d2 = listDistructs.find((x) => x.code.toString() === distruct.toString());
        const d3 = listWards.find((x) => x.code.toString() === ward.toString());
        let newAddress = '';
        if (d1 || d2 || d3) {
            console.log("d1", d1.name);
            console.log("d2", d2.name);
            console.log("d3", d3.name);
            newAddress = `${street}, ${d3.name}, ${d2.name}, ${d1.name}`;
        }
        console.log("newAddress", newAddress);
        // console.log("d1", d1);
        dispatch(updateInfoCusAction(phone, newAddress));
        // setUpdateInfoCustommer(false);
        // }
    };

    const handleUpdateInfo = () => {
        if (updateInfoCustommer) {
            return (
                <>
                    <div className="form-group-account">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <br />
                        <Input
                            type={"text"}
                            value={phone}
                            placeholder={"Bạn nhập số điện thoại"}
                            handleOnChange={(e) => setPhone(e)}
                            id_error={"error_phone"}
                        />
                    </div>
                    {/* form-group-account */}

                    <div className="form-group-account">
                        <label htmlFor="address">Địa chỉ:</label>
                        <br />
                        <div className="option-account">
                            <div className="city-account">
                                <div>
                                    <label htmlFor="city">Thành phố:</label>
                                    <br />
                                    <select
                                        value={city}
                                        name={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="" disabled selected>
                                            Mời bạn chọn thành phố:{""}
                                        </option>
                                        {listCity &&
                                            listCity.map((item) => (
                                                <option key={item.code} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                    <br />
                                    <span id="error_city" style={{ color: "red" }} >Bạn chưa chọn thành phố</span>
                                </div>
                                <div>
                                    {
                                        city && (
                                            <>
                                                <label htmlFor="distruct">Quận/Huyện:</label>
                                                <br />
                                                <select
                                                    value={distruct}
                                                    name={distruct}
                                                    onChange={(e) => setDistruct(e.target.value)}
                                                >
                                                    <option value="" disabled selected>
                                                        Mời bạn chọn quận/huyện:{""}
                                                    </option>
                                                    {listDistructs &&
                                                        listDistructs.map((item) => (
                                                            <option key={item.code} value={item.code}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select>
                                                <br />
                                                <span id="error_distruct" style={{ color: "red" }} >Bạn chưa chọn quận/huyện</span>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            {/* city-account */}
                            <div className="city-account">

                                {
                                    distruct && (
                                        <>
                                            <label htmlFor="wards">Phường/Xã:</label>
                                            <br />
                                            <select
                                                value={ward}
                                                name={ward}
                                                onChange={(e) => setWard(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Mời bạn chọn phường/xã/ấp
          </option>
                                                {listWards &&
                                                    listWards.map((item) => (
                                                        <option key={item.code} value={item.code}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            {/* ward */}
                                            <br />
                                            <span id="error_ward" style={{ color: "red" }} >Bạn chưa chọn phường/xã</span>
                                        </>
                                    )
                                }
                            </div>
                            {/* city-account */}

                        </div>

                        {
                            ward && (
                                <div className="option-account">
                                    <label htmlFor="phone">Số nhà và tên đường:</label>
                                    <br />
                                    <Input
                                        type={"text"}
                                        value={street}
                                        placeholder={"Vui lòng nhập số nhà và đường!!"}
                                        handleOnChange={(e) => setStreet(e)}
                                        id_error={"error_street"}
                                    />
                                </div>
                            )
                        }

                    </div>
                </>
            );
        }
        return (
            <>
                <div className="form-group-account">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <span className="phone-account">
                        {phone.length > 0 ? phone : "Mời bạn cập nhật thêm thông tin"}
                    </span>
                </div>
                {/* form-group-account */}

                <div className="form-group-account">
                    <label htmlFor="address">Địa chỉ:</label>
                    <span className="address-account">
                        {address.length > 0 ? address : "Mời bạn cập nhật thêm thông tin"}
                    </span>
                </div>
            </>
        );
    };

    useEffect(() => {
        if (user && user.address !== null && user.phone !== null) {
            setAddress(user.address);
            setPhone(user.phone);
        }
        const getProvinces = pcVN.getProvinces();
        setListCity(getProvinces);
        if (typeof (city) !== "undefined") {
            let data = pcVN.getDistrictsByProvinceCode(city);
            setListDistructs(data);
        }
        if (typeof (distruct) !== "undefined") {
            let dataWards = pcVN.getWardsByDistrictCode(distruct);
            setListWards(dataWards);
        }
    }, [city, dispatch, distruct, user]);

    const handleUpdateAvatar = () => {
        refAvatar.current.click();
    };

    const handleOnChangeAvatar = (file) => {
        let data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "instagram-clone");
        data.append("cloud_name", "không có");
        fetch("	https://api.cloudinary.com/v1_1/kh-ng-c/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    dispatch(updateAvatarAction(result.url));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="account">
            <ToastContainer />
            <h3>tài khoản của bạn</h3>
            <div className="info">
                <div className="info-account">
                    <ul>
                        <li>
                            <span>thông tin tài khoản</span>
                        </li>
                        <li>
                            <div className="info-account-user">
                                <div className="form-group-account">
                                    <label htmlFor="name">Họ và tên:</label>
                                    <span className="name-account">{user?.name}</span>
                                </div>
                                {/* form-group-account */}
                                <div className="form-group-account">
                                    <label htmlFor="email">Email:</label>
                                    <span className="email-account">{user?.email}</span>
                                </div>
                                {/* form-group-account */}
                                {handleUpdateInfo()}
                                {/* form-group-account */}
                            </div>
                            {/* info-account-user */}
                        </li>
                    </ul>
                    {/* end ul */}
                </div>
                {/* info-account */}
                <div className="update-avatar-account">
                    <div className="avatar-account">
                        {user?.avatar && <img src={user?.avatar} alt={user?.name} />}
                        <input
                            type="file"
                            hidden
                            ref={refAvatar}
                            onChange={(e) => handleOnChangeAvatar(e.target.files[0])}
                        />
                        <p className="update-avatar" onClick={() => handleUpdateAvatar()}>
                            Cập nhật ảnh đại diện
            </p>
                    </div>
                    {/* avatar-account */}
                    {updateInfoCustommer ? (
                        <p className="update-address" onClick={() => handleUpdate()}>
                            Cập nhật thông tin khách hàng
                        </p>
                    ) : (
                            <p
                                className="update-address"
                                onClick={() => setUpdateInfoCustommer(true)}
                            >
                                Cập nhật thông tin
                            </p>
                        )}
                    <p
                        className="logout-account"
                        onClick={() => {
                            dispatch(logoutAction(cart));
                        }}
                    >
                        đăng xuất{""}
                    </p>
                </div>
                {/* update-avatar-account */}
            </div>
            {/* info */}
            {/* <div className="list-order-in-account">
                <p>Danh sách đơn hàng mới nhất</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Ngày đặt</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Vận chuyển</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder &&
                            listOrder.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textTransform: "uppercase" }}>
                                        #{getCharacterLast(item._id)}
                                    </td>
                                    <td>{getDateOrder(item.createdAt)}</td>
                                    <td>{convertPrice(item.total)}</td>
                                    <td>{item.status}</td>
                                    <td>Miễn phí vận chuyển</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div> */}
            {/* list-order-in-account */}
        </div>
    );
};

export default Account;