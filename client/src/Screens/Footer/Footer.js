import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { RiFacebookLine } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import {
    AiOutlineGooglePlus,
    AiOutlineYoutube,
    AiOutlineInstagram,
} from "react-icons/ai";

/**
 * RiFacebookLine
 * FaTwitter
 * AiOutlineGooglePlus
 * AiOutlineYoutube
 * AiOutlineInstagram
 * @param {*} props
 */
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Footer = (props) => {
    const [email, setEmail] = useState("");

    const handleSendMail = (e) => {
        if (Object.is(email, null) || !REGEX_EMAIL.test(email)) {
            return;
        }
        if (e.keyCode === 13) {
            setEmail("");
        }
    };

    return (
        <div className="footer">
            <ul>
                <li>
                    <h4>giới thiệu</h4>
                    <div className="info-footer">Sản phẩm clothing, bags, shoes</div>
                    <div className="address-footer">
                        180c Lê Văn Sỹ, P.10, Q.Phú Nhuận, HCM | 325-327 Nguyễn Trãi, P.7,
            Q.5, HCM | 46 Lê Duẩn, Đà Nẵng{""}
                    </div>
                    <div className="phone-footer">Hotline:0338122760</div>
                </li>
                <li>
                    <h4>hỗ trợ khách hàng</h4>
                    <ul>
                        <li>
                            <Link to="/">Hướng dẫn chọn size</Link>
                        </li>
                        <li>
                            <Link to="/">Hướng dẫn mua hàng</Link>
                        </li>
                        <li>
                            <Link to="/">Hình thức thanh toán</Link>
                        </li>
                        <li>
                            <Link to="/">Chính sách bảo hàng</Link>
                        </li>
                        <li>
                            <Link to="/">Chính sách bảo mật thông tin</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4>đăng ký nhận tin</h4>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        onKeyUp={(e) => handleSendMail(e)}
                    />
                    <p>Hãy nhập email của bạn vào đây để nhận tin! </p>
                    <div className="icon-by-footer">
                        <RiFacebookLine className="icon-footer" />
                        <FaTwitter className="icon-footer" />
                        <AiOutlineGooglePlus className="icon-footer" />
                        <AiOutlineYoutube className="icon-footer" />
                        <AiOutlineInstagram className="icon-footer" />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
