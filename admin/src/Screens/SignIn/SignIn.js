import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Toast,
} from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { signinAdminAction } from "../../Actions/authAction";
import { Redirect, useHistory } from "react-router-dom";
import Input from "../../Components/Input";
import validator from "validator";
import $ from "jquery";

window.$ = $;

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { authenticate, error, loading, success } = auth;

    if (authenticate) {
        return <Redirect to={`/`} />;
    }

    const handleError = () => {
        let flag = true;
        if (!validator.isEmail(email)) {
            $("#error_email").text("Email không hợp lệ hoặc không được để trống!!!");
            $("#error_email").show();
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (!REGEX_PASSWORD.test(password)) {
            $("#error_password").text(
                "Mật khẩu tối thiểu phải 6 ký tự và ký tự đặt biệt hoa thường!!!"
            );
            $("#error_password").show();
            flag = false;
        } else {
            $("#error_password").hide();
        }
        return flag;
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        if (handleError()) {
            dispatch(signinAdminAction(email, password));
        }
    };

    return (
        <Layout>
            <Container fluid="md">
                <Row>
                    {/* <Col xs={3}></Col> */}
                    <Col>
                        <Card className="card-signin">
                            <h1 style={{ textAlign: "center" }}>Admin</h1>
                            {error && (
                                <h3 style={{ textAlign: "center" }} className="text-muted">
                                    {error}
                                </h3>
                            )}
                            <Form onSubmit={(e) => onSubmitSignIn(e)}>
                                <Input
                                    nameLabel={"Email"}
                                    type={"email"}
                                    placeholder={"Mời bạn nhập email"}
                                    value={email}
                                    handleOnChange={(e) => setEmail(e)}
                                    id_error={"error_email"}
                                />

                                <Input
                                    nameLabel={"Mật khẩu"}
                                    type={"password"}
                                    placeholder={"Mời bạn nhập mật khẩu"}
                                    value={password}
                                    handleOnChange={(e) => setPassword(e)}
                                    id_error={"error_password"}
                                />

                                <Button variant="primary" block type="submit">
                                    Đăng nhập
                </Button>
                            </Form>
                        </Card>
                    </Col>
                    {/* <Col xs={3}></Col> */}
                </Row>
            </Container>
        </Layout>
    );
};

export default SignIn;
