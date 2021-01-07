import React from 'react';
import './index.css';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SigninCheckout = (props) => {
    const cart = useSelector((state) => state.cart.items);

    return (
        <div className="signin-checkout">
            <div className="info-signin-checkout">
                <AiOutlineExclamationCircle />
                <div >
                    <span>Đăng nhập để nhận được nhiều ưu đãi hơn.</span><br />
                    <span>Tips: Nếu bạn muốn quản lý nhiều địa chỉ mua hàng, hãy đăng nhập.</span>
                </div>
            </div>
            {/* info-signin-checkout */}
            {
                cart.length > 0 && (
                    <div className="handle-click-signin-checkout">
                        <p className="continue-payment-signin-checkout" onClick={() => props.handleNext()} >tiếp tục mua hàng</p>
                        <p className="no-account-signin-checkout">
                            <span>Bạn chưa có tài khoản?</span>
                            <Link to="/dang-nhap">Đăng nhập</Link>
                        </p>
                    </div>
                )
            }

        </div>
    );
}

export default SigninCheckout;
