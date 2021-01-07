import React, { useEffect, useState } from "react";
import "./Signin.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmail from "validator/lib/isEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import { signinAction, signinFacebookAction, signinGoogleAction } from "../../Actions/authAction";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Redirect, useHistory } from 'react-router-dom';

window.$ = $;
/**
 * BsPeopleCircle
 * AiOutlineMail
 * RiLockPasswordLine
 * AiFillGoogleCircle
 * AiOutlineFacebook
 * @param {*} props
 */
const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const Signin = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState("luutrudulieuhoc1505@gmail.com");
    const [notifyError, setNotifyError] = useState("");
    const [password, setPassword] = useState("123456AbS!");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { loading, errorGG, errorFB } = auth;
    // eslint-disable-next-line no-unused-vars
    // console.log("errorGG", errorGG);

    useEffect(() => {
        if (!Object.is(errorGG, undefined)) {
            toast.error(errorGG, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!Object.is(errorFB, undefined)) {
            toast.error(errorFB, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [errorGG, errorFB])

    const handleError = () => {
        let flag = true;

        if (email.length === 0 || !isEmail(email)) {
            $("#error_email").show();
            $("#error_email").text(
                "Email không được để trống hoặc không chính xác!!!"
            );
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (password.length === 0 || !REGEX_PASS.test(password)) {
            $("#error_password").show();
            $("#error_password").text(
                "Mật khẩu tối thiểu 6 ký tự và có ký tự đặt biệt hoặc hoa thường!!!"
            );
            flag = false;
        } else {
            $("#error_password").hide();
        }
        return flag;
    };

    const handleSignIn = () => {
        if (handleError()) {
            dispatch(signinAction(email, password, props.history));
        }
    };

    const handleLoginGoogleSuccess = (e) => {
        dispatch(signinGoogleAction(e.tokenId, history));
    };

    const handleResponseFacebook = (res) => {
        console.log("res by handleResponseFacebook", res);
        dispatch(signinFacebookAction(res.accessToken, res.userID, history));
    };

    // if (authenticate) {
    //     return <Redirect to={`/tai-khoan`} />;
    // }


    return (
        <div className="signin">
            <ToastContainer />
            <h4>đăng nhập</h4>
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
            <div className="register" onClick={() => handleSignIn()}>
                đăng nhập
      </div>
            <div className="login-google-and-facebook ">
                <GoogleLogin
                    clientId="1046614447632-i3hsc5liq1scjj818s6kfdj74hihu4oj.apps.googleusercontent.com"
                    buttonText="Đăng nhập Google"
                    onSuccess={(e) => handleLoginGoogleSuccess(e)}
                    cookiePolicy={"single_host_origin"}
                    className="login-google"
                />
                {/* login-google */}
                <FacebookLogin
                    appId="318179935914783"
                    autoLoad={false}
                    callback={(e) => handleResponseFacebook(e)}
                    icon="fa-facebook"
                />
                {/* login-google */}
            </div>
            {/* login-google-and-facebook */}
            <div className="forgot-register">
                <Link to="/dang-ky">Đăng ký</Link>{" "}
            </div>
            {/* form-group */}
        </div>
    );
};

export default Signin;
