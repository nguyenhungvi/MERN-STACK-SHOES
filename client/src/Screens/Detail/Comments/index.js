import React, { useEffect, useState } from "react";
import "./index.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Form, Button } from "react-bootstrap";
import BeautyStars from "beauty-stars";
import isEmail from "validator/lib/isEmail";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { postReviewAction } from "../../../Actions/reviewAction";
window.$ = $;

const Comments = (props) => {
    const { productOne } = props;

    const [countRating, setCountRating] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contentReview, setContentReview] = useState("");
    const review = useSelector((state) => state.review);
    const auth = useSelector((state) => state.auth);
    const { user } = auth;
    const dispatch = useDispatch();
    const { reviews } = review;

    const handleError = () => {
        let flag = true;

        if (typeof name === "undefined" || name.length === 0) {
            $("#error_name").show();
            $("#error_name").text("Vui lòng nhập tên!!!");
            flag = false;
        } else {
            $("#error_name").hide();
        }

        if (typeof email === "undefined" || email.length === 0 || !isEmail(email)) {
            $("#error_email").show();
            $("#error_email").text(
                "Vui lòng nhập email hoặc đúng định dạng email!!!"
            );
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (contentReview.length === 0) {
            $("#error_content_review").show();
            $("#error_content_review").text("Vui lòng nhập nội dung!!!");
            flag = false;
        } else {
            $("#error_content_review").hide();
        }

        if (countRating === 0) {
            toast.error("Vui lòng đánh giá!!!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        return flag;
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSendReview = (e) => {
        e.preventDefault();
        if (handleError()) {
            let data = {
                name,
                email,
                contentReview,
                countRating,
                id: productOne._id,
                userID: user ? user._id : null,
                avatar: user && user.avatar,
            };

            console.log("data", data);
            dispatch(postReviewAction(data));
            setName(Object.keys(user).length > 0 ? user.name : "");
            setEmail(Object.keys(user).length > 0 ? user.email : "");
            setContentReview("");
            setCountRating(0);
        }
    };

    const handleShowRating = (x) => {
        const arr = [];
        for (let i = 1; i <= x; i++) {
            arr.push(<AiFillStar />);
        }
        for (let k = 1; k <= 5 - x; k++) {
            arr.push(<AiOutlineStar />);
        }
        return arr;
    };

    const handleShowTotalRating = (list) => {
        const totalStar = list.reduce((a, c) => a + c.star, 0);
        const arr = [];
        for (let i = 1; i <= Math.ceil(totalStar / list.length); i++) {
            arr.push(<AiFillStar />);
        }
        for (let k = 1; k <= 5 - Math.ceil(totalStar / list.length); k++) {
            arr.push(<AiOutlineStar />);
        }
        return arr;
    };

    return (
        <div className="comments">
            <ToastContainer />
            {productOne && (
                <div className="title-customer-comments">
                    <ul>
                        <li>
                            <span>
                                Khách hàng đánh giá (
                                {
                                    reviews && reviews.length === 0
                                        ? 0
                                        : Math.round(reviews.reduce((a, c) => a + c.star, 0) / reviews.length)
                                }
                                /5){""}
                            </span>
                        </li>
                        <li>
                            {productOne.reviews && productOne.reviews.length > 0 ? (
                                handleShowTotalRating(productOne.reviews)
                            ) : (
                                    <>
                                        <AiOutlineStar />
                                        <AiOutlineStar />
                                        <AiOutlineStar />
                                        <AiOutlineStar />
                                        <AiOutlineStar />
                                    </>
                                )}
                        </li>
                        <li>
                            <span>Hiện có tất cả {reviews && reviews.length} đánh giá</span>
                        </li>
                    </ul>
                </div>
            )}

            {/* title-customer-comments */}
            <div className="list-comments">
                <ul>
                    {reviews &&
                        reviews.map((item) => (
                            <li key={item._id}>
                                <div className="info-customer-in-comment">
                                    <div className="info-in-comment">
                                        <img src={item.avatar} alt={item.name} />
                                        <div className="name-and-content-in-comment">
                                            <p className="name-user-in-comment">{item.name}</p>
                                            <div>{handleShowRating(item.star)}</div>
                                        </div>
                                        {/* name-and-content-in-comment */}
                                    </div>
                                    {/* info-in-comment */}
                                    <p className="content-comment">{item.content}</p>
                                </div>
                                {/* info-customer-in-comment */}
                            </li>
                        ))}
                    {/* end li */}
                </ul>
            </div>
            {/* list-comments */}
            <div className="form-comments">
                <Form
                    onSubmit={(e) => {
                        handleSendReview(e);
                    }}
                >
                    <Form.Group>
                        {/* <Form.Label>Họ và Tên:</Form.Label><br /> */}
                        <h5>Đánh giá của bạn</h5>
                        <BeautyStars
                            value={countRating}
                            onChange={(e) => setCountRating(e)}
                            size={30}
                            inactiveColor="gray"
                            activeColor="yellow"
                        />
                        <Form.Text className="text-muted " id="error_star" />
                    </Form.Group>
                    <div className="name-and-email-comment">
                        <Form.Group
                            controlId="formBasicEmail"
                            className="form-name-and-email-comment"
                        >
                            <Form.Label>Họ và Tên:</Form.Label>
                            <br />
                            <Form.Control
                                type="type"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Mời bạn nhập họ và tên"
                            />
                            <br />
                            <Form.Text className="text-muted " id="error_name" />
                        </Form.Group>
                        <Form.Group
                            controlId="formBasicEmail"
                            className="form-name-and-email-comment"
                        >
                            <Form.Label>Email:</Form.Label>
                            <br />
                            <Form.Control
                                type="email"
                                style={{ textTransform: "none" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Mời bạn nhập email"
                            />
                            <br />
                            <Form.Text
                                className="text-muted"
                                style={{ color: "red" }}
                                id="error_email"
                            />
                        </Form.Group>
                    </div>
                    {/* name-and-email-comment */}

                    <Form.Group
                        controlId="exampleForm.ControlTextarea1"
                        className="form-comment"
                    >
                        <Form.Label>Nhận xét của bạn:</Form.Label> <br />
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={contentReview}
                            onChange={(e) => setContentReview(e.target.value)}
                        />
                        <br />
                        <Form.Text
                            className="text-muted error_content_review"
                            id="error_content_review"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        đánh giá{""}
                    </Button>
                </Form>
            </div>
        </div>
        // comments
    );
};

export default Comments;
