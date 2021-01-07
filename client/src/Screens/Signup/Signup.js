import React, { useEffect, useState } from "react";
import "./Signup.css";
import { BsPeopleCircle } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, Redirect } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import $ from "jquery";
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from "../../Actions/authAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.$ = $;

const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const Signup = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [notifyError, setNotifyError] = useState("");
    const [password, setPassword] = useState("123456AbS!");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    // eslint-disable-next-line no-unused-vars
    const { loading, error, message, authenticate } = auth;

    const handleError = () => {
        let flag = true;

        if (name.length === 0) {
            $("#error_name").show();
            $("#error_name").text("Tên không được để trống!!!");
            flag = false
        } else {
            $("#error_name").hide();
        }

        if (email.length === 0 || !isEmail(email)) {
            $("#error_email").show();
            $("#error_email").text("Email khong duoc de trong hoac khong chinh xác!!!");
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (password.length === 0 || !REGEX_PASS.test(password)) {
            $("#error_password").show();
            $("#error_password").text("Mật khẩu tối thiểu 6 ký tự và có ký tự đặt biệt hoặc hoa thường!!!");
            flag = false;
        } else {
            $("#error_password").hide();
        }

        return flag;
    };

    const handleRegister = () => {
        if (handleError()) {
            dispatch(signupAction(name, email, password));
        }
    }

    useEffect(() => {
        if (error !== null) {
            setNotifyError(error);
        }
    }, [error]);



    if (notifyError !== "") {
        toast.error(notifyError, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setNotifyError("");
    }

    if (authenticate) {
        return <Redirect to={`/tai-khoan`} />;
    }

    return (
        <div className="signin">
            <ToastContainer />
            <h4>Tạo tài khoản</h4>
            <div className="form-group">
                <BsPeopleCircle className="icon-signin" />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Họ và Tên"
                />
                <p id="error_name" />
            </div>
            <div className="form-group">
                <AiOutlineMail className="icon-signin" />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <p id="error_email" />
            </div>
            <div className="form-group">
                <RiLockPasswordLine className="icon-signin" />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                />
                <p id="error_password" />
            </div>
            <div className="register" onClick={() => handleRegister()} >đăng ký</div>
            <div className="forgot-register">
                <Link to="/">
                    <AiOutlineArrowLeft className="icon-arrow-left" />
          Quay lại trang chủ
        </Link>
            </div>
            {/* form-group */}
        </div>
    );
};

export default Signup;
