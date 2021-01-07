import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
    postProductAction,
    updateProductAction,
} from "../../../Actions/productAction";
import { getCategoriesAction } from "../../../Actions/categoryAction";
import validator from "validator";
import $ from "jquery";
import formatCurrency from "../../../util";
window.$ = $;

const LISTSIZES = [37, 38, 39, 40, 41, 42, 43, 44];
const REGEXT_NUMBER_TP = /^\d*(\.)?\d+$/;
const REGEX_NAME = /^[a-zA-Z ]+$/;
const REGEX_NUMBER = /^\d+$/;

const LIST = [
    { nameSize: "37", count: "14" },
    { nameSize: "38", count: "13" },
    { nameSize: "39", count: "16" },
    { nameSize: "40", count: "15" },
    { nameSize: "41", count: "11" },
    { nameSize: "42", count: "13" },
    { nameSize: "43", count: "16" },
];

const AddProduct = (props) => {
    let [SIZES, setSIZES] = useState([37, 38, 39, 40, 41, 42, 43, 44]);
    const refImage = useRef(null);
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [sizes, setSizes] = useState("");
    const [count, setCount] = useState("");
    const [price, setPrice] = useState(0);
    const [categoryID, setCategoryID] = useState(undefined);
    const [nameSize, setNameSize] = useState(undefined);
    //EDIT PRODUCT NEW
    const [productID, setProductID] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { categories } = category;
    const product = useSelector((state) => state.product);
    const { loading, products, error, productOne } = product;

    const uploadImageProduct = (file) => {
        // const reader = new FileReader();
        // reader.onload = (upload) => {
        //     let pic = {
        //         id: uuidv4(),
        //         img: reader.result,
        //     };
        //     setImages([...images, pic]);
        // };
        // reader.readAsDataURL(file);
        // console.log('====================================');
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
                let pic = {
                    id: uuidv4(),
                    img: result.url,
                };
                setImages([...images, pic]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        dispatch(getCategoriesAction());
        if (typeof productOne !== "undefined") {
            setName(productOne.name);
            setPrice(productOne.price);
            if (productOne.categoryID) {
                setCategoryName(productOne.categoryID.name);
            }
            if (productOne.sizes) {
                setSIZES(productOne.sizes);
            }
            if (productOne.images) {
                setImages(productOne.images);
            }
        }
    }, [productOne]);

    const postCount = (e) => {
        if (nameSize === undefined) {
            console.log("ban chua chon size!!!");
            return;
        }

        if (e.keyCode === 13) {
            if (!validator.isNumeric(count)) {
                return (
                    $("#error_quantity").text(
                        "Bạn chưa nhập số lượng hoặc không chính xác!!!"
                    ),
                    $("#error_quantity").show(),
                    setCount("")
                );
            } else {
                $("#error_quantity").hide();
            }

            const size = { nameSize, count };
            setSizes([...sizes, size]);
            if (productID) {
                SIZES = SIZES.filter((x) => x._id !== nameSize);
            } else {
                SIZES = SIZES.filter((x) => x !== parseInt(nameSize, 10));
            }
            setSIZES(SIZES);
            setCount("");
            setNameSize("");
        }
    };
    // console.log("price", REGEX_NUMBER.test(price));

    console.log("name", name);

    const handleError = () => {
        let flag = true;

        if (typeof name === "undefined" || name.length === 0) {
            $("#error_name").show();
            $("#error_name").text("Trường tên không được để trống!!!");
            flag = false;
        } else {
            $("#error_name").hide();
        }

        if (
            typeof price === undefined ||
            Object.is(price, 0) ||
            !REGEX_NUMBER.test(price)
        ) {
            $("#error_price").show();
            $("#error_price").text("Giá sản phẩm phải khác không!!");
            flag = false;
        } else {
            $("#error_price").hide();
        }

        // error_category
        if (typeof categoryID === "undefined") {
            $("#error_category").show();
            $("#error_category").text("Bạn chưa chọn thể loại!!!");
            flag = false;
        } else {
            $("#error_category").hide();
        }

        // error_size
        if (typeof categoryID === "undefined") {
            $("#error_category").show();
            $("#error_category").text("Bạn chưa chọn thể loại!!!");
            flag = false;
        } else {
            $("#error_category").hide();
        }

        // error_images
        if (images.length === 0) {
            $("#error_images").show();
            $("#error_images").text("Bạn chưa chọn hình ảnh!!!");
            flag = false;
        } else {
            $("#error_images").hide();
        }

        return flag;
    };

    const insertProduct = (productID) => {
        if (typeof productID !== "undefined") {
            const product = {
                name,
                price,
                sizes,
                images,
            };
            dispatch(updateProductAction(product, productID));
            setName("");
            setPrice("");
            setProductID("");
            setCategoryID(undefined);
            setCategoryName("");
            setSIZES(LISTSIZES);
            setImages([]);
            setSizes([]);
            setCount(0);
            setNameSize(undefined);
            props.setShow(false);
        }

        if (handleError()) {
            let data = price;
            sizes.sort((a, b) => {
                return a.nameSize.localeCompare(b.nameSize);
            });
            const product = {
                name,
                price: data,
                categoryID,
                sizes,
                images,
            };

            dispatch(postProductAction(product));
            setName("");
            setPrice("");
            setCategoryID("");
            setSIZES(LISTSIZES);
            setImages([]);
            setSizes([]);
            setCount(0);
            setNameSize(undefined);
            props.setShow(false);
        }
    };

    const selectSize = (productID) => {
        if (productOne._id) {
            return (
                <Form.Control
                    as="select"
                    custom
                    value={nameSize}
                    name={nameSize}
                    onChange={(e) => getCount(e.target.value)}
                >
                    <option value="">Chọn kích cỡ</option>
                    {SIZES.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </Form.Control>
            );
        } else {
            return (
                <Form.Control
                    as="select"
                    custom
                    value={nameSize}
                    name={nameSize}
                    onChange={(e) => setNameSize(e.target.value)}
                >
                    <option value="">Chọn kích cỡ</option>
                    {SIZES.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </Form.Control>
            );
        }
    };

    const handleDeleteImage = (id) => {
        let data = images.filter((x) => x.id !== id);
        setImages(data);
    };

    const getCount = (name) => {
        setNameSize(name);
        let data = SIZES.find((x) => x._id === name);
        setCount(data.count);
    };

    return (
        <div className="add-product">
            <Row style={{ marginTop: "50px" }}>
                <Col>
                    <Row>
                        <Col>
                            {productID ? (
                                <h3 style={{ textAlign: "center" }}>
                                    Cập nhật thông tin sản phẩm
                                </h3>
                            ) : (
                                    <h3 style={{ textAlign: "center" }}>Thêm mới sản phẩm</h3>
                                )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicNameCategory">
                                <Form.Label style={{ fontWeight: "bold", fontSize: "21px" }}>
                                    Tên sản phẩm:{""}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Mời bạn nhập tên sản phẩm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        textTransform: "capitalize",
                                        textAlign: "center"
                                    }}
                                />
                                <Form.Control.Feedback id={"error_name"} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicPrice">
                                        <Form.Label>Giá:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Mời bạn nhập giá của từng sản phẩm"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                textTransform: "capitalize",
                                                textAlign: "center"
                                            }}
                                        />
                                        <Form.Control.Feedback id="error_price" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {productOne._id ? (
                                <Form.Group controlId="formBasicCategory">
                                    <Form.Label>Thể loại:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        defaultValue={categoryName}
                                        style={{ textTransform: "capitalize", fontSize: "18px" }}
                                        disabled
                                    />
                                </Form.Group>
                            ) : (
                                    <Form.Group controlId="formBasicCategory">
                                        <Form.Label>Thể loại:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            custom
                                            value={categoryID}
                                            name={categoryID}
                                            onChange={(e) => setCategoryID(e.target.value)}
                                        >
                                            <option value="">Chọn thể loại</option>
                                            {categories &&
                                                categories.map((item) => (
                                                    <option
                                                        style={{
                                                            textTransform: "capitalize",
                                                            fontSize: "18px",
                                                        }}
                                                        value={item._id}
                                                        key={item._id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                        <Form.Control.Feedback id="error_category" />
                                    </Form.Group>
                                )}
                            {/* <Form.Control.Feedback id="error_category" />
                            </Form.Group> */}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicSize">
                                        <Form.Label>Sizes:</Form.Label>
                                        {selectSize(productID)}
                                    </Form.Group>
                                </Col>
                                {nameSize && (
                                    <Col>
                                        <Form.Group controlId="formBasicCount">
                                            <Form.Label>Số lượng:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Mời bạn nhập số lượng sản phẩm"
                                                value={count}
                                                onChange={(e) => setCount(e.target.value)}
                                                onKeyUp={(e) => postCount(e)}
                                            />
                                        </Form.Group>
                                        <Form.Control.Feedback id="error_quantity" />
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicImage">
                                <Form.Label>Chọn ảnh:</Form.Label>
                                <input
                                    ref={refImage}
                                    type="file"
                                    hidden
                                    onChange={(e) => uploadImageProduct(e.target.files[0])}
                                />
                                <div className="list-images-product">
                                    {images.length > 0 &&
                                        images.map((item) => (
                                            <div key={item.id} className="one-image-in-list-image">
                                                <img
                                                    src={item.img}
                                                    alt="product"
                                                    className="image-product"
                                                />
                                                <span
                                                    onClick={() => handleDeleteImage(item.id)}
                                                    className="delete-image-product"
                                                >
                                                    x{""}
                                                </span>
                                            </div>
                                        ))}
                                    <p
                                        className="click-image"
                                        onClick={() => refImage.current.click()}
                                    ></p>
                                </div>
                                <Form.Control.Feedback id="error_images" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                type="submit"
                                onClick={() => insertProduct(productOne._id)}
                                variant="primary"
                                size="lg"
                                block
                            >
                                {productOne._id ? "Cập nhật" : "Thêm mới"}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="reset"
                                onClick={() => {
                                    props.setShow(false);
                                }}
                                variant="danger"
                                size="lg"
                                block
                            >
                                Hủy
              </Button>
                        </Col>
                    </Row>
                    {/* </Form> */}
                </Col>
            </Row>
        </div>
    );
};

export default AddProduct;
{
    /* <Col>
      <Form.Group controlId="formBasicPrice">
          <Form.Label>Phần trăm giảm giá:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Mời bạn nhập phần trăm giảm giá "
              // value={safeOff}
              // onChange={(e) => setSafeOff(e.target.value)}
              onChange={(e) => handleErrorSafeOff(e.target.value)}
              handleErrorSafeOff
          />
          <Form.Control.Feedback id="error_safeoff" />
      </Form.Group>
  </Col>
  // const handleErrorSafeOff = (value) => {
  setSafeOff(value);
  console.log(/^[1-9]\d*$/.test(value));
  const REGEX_ND = /^[1-9]\d*$/;
  if (!validator.isNumeric(value)) {
      $("#error_safeoff").show();
      $("#error_safeoff").text("Số lượng phải số!!!");
  } else if (!REGEX_ND.test(value)) {
      $("#error_safeoff").show();
      $("#error_safeoff").text("Số lượng phải số không âm !!!");
  } else {
      $("#error_safeoff").hide();
  }
      }; */
}
