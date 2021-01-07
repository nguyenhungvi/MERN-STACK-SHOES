import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategoryAction,
    updateCategoryAction,
} from "../../../Actions/categoryAction";
import "./index.css";
import $ from "jquery";
import Input from "../../../Components/Input";
window.$ = $;

const REGEX_NAME = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;

const Add = (props) => {
    const refImage = useRef(null);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { loading, categories, error, categoryOne } = category;

    const uploadImage = (file) => {
        // const reader = new FileReader();
        // reader.onload = (upload) => {
        //     setImage(reader.result);
        // };
        // reader.readAsDataURL(file);

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
                setImage(result.url);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleError = () => {
        let flag = true;
        if (typeof (name) === 'undefined' || name.length === 0) {
            $("#error-name-category").show();
            $("#error-name-category").text("Tên không được để trống!!");
            flag = false;
        } else {
            $("#error-name-category").hide();
        }

        if (typeof (image) === 'undefined' || image.length === 0) {
            $("#error-image-category").show();
            flag = false;
            $("#error-image-category").text("Bạn chưa chọn ảnh!!");
        } else {
            $("#error-image-category").hide();
        }
        return flag;
    };

    const handleAddCategory = () => {
        if (handleError()) {
            dispatch(addCategoryAction(name, image));
            setImage("");
            setName("");
            props.setShow(false);
        }
    };

    useEffect(() => {
        if (typeof categoryOne !== "undefined") {
            setName(categoryOne.name);
            setImage(categoryOne.image);
        }
    }, [categoryOne]);

    return (
        <Col md={4} className="insert-update-category">
            <h3 style={{ textAlign: "center" }}>
                {categoryOne._id ? "Cập nhật sản phẩm" : "Thêm loại sản phẩm"}
            </h3>
            <Input
                nameLabel={"Tên loại sản phẩm"}
                type={"text"}
                placeholder={"Mời bạn nhập tên thể loại"}
                value={name}
                handleOnChange={(e) => setName(e)}
                id_error={"error-name-category"}
            />

            <Form.Group controlId="formBasicImage">
                <Form.Label style={{ fontWeight: "bold", fontSize: "21px" }}>
                    Hình ảnh:{""}
                </Form.Label>
                <br />
                <>
                    <input
                        ref={refImage}
                        type="file"
                        hidden
                        onChange={(e) => uploadImage(e.target.files[0])}
                    />
                    <div className="image">
                        {image ? (
                            <>
                                <img src={image} alt={image} className="image-category" />
                                <span
                                    className="delete-image-add-category"
                                    onClick={() => setImage("")}
                                >
                                    x
                </span>
                            </>
                        ) : (
                                <p
                                    className="select-image"
                                    onClick={() => refImage.current.click()}
                                ></p>
                            )}
                    </div>
                </>
                <Form.Control.Feedback id="error-image-category" />
            </Form.Group>
            <Form.Group controlId="formBasicSendData">
                {categoryOne._id ? (
                    <>
                        <Button
                            variant="primary"
                            size="lg"
                            block
                            onClick={() => {
                                dispatch(updateCategoryAction(name, categoryOne._id, image));
                                setImage("");
                                setName("");
                                props.setShow(false);
                            }}
                        >
                            Cập nhật
            </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            block
                            onClick={() => {
                                setImage("");
                                setName("");
                                props.setShow(false);
                            }}
                        >
                            CANCEL
            </Button>
                    </>
                ) : (
                        <>
                            <Button
                                variant="primary"
                                size="lg"
                                block
                                onClick={() => handleAddCategory()}
                            >
                                Thêm mới
            </Button>
                            <Button
                                variant="danger"
                                size="lg"
                                block
                                onClick={() => {
                                    setImage("");
                                    setName("");
                                    props.setShow(false);
                                }}
                            >
                                CANCEL
            </Button>
                        </>
                    )}
            </Form.Group>
        </Col>
        // add-category
    );
};

export default Add;
