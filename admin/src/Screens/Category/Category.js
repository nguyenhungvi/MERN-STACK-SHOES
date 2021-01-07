import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategoryAction,
    getCategoriesAction,
    getCategoryAction,
    searchCategoryAction,
} from "../../Actions/categoryAction";
import Add from "./Add";

const Category = (props) => {
    const [Show, setShow] = useState(false);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { loading, categories, error, categoryOne } = category;

    useEffect(() => {
        dispatch(getCategoriesAction());
    }, []);

    const searchCategory = () => {
        dispatch(searchCategoryAction(text));
    }

    return (
        <Layout sidebar>
            <Container className="page">
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Danh sách thể loại</h3>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {!Show && (
                                    <Button
                                        onClick={() => {
                                            setShow(true);
                                        }}
                                    >
                                        Thêm mới
                                    </Button>
                                )}
                                <div className="search-category">
                                    <Form.Control
                                        type="text"
                                        placeholder="Tìm kiếm thể loại"
                                        value={text}

                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <Button
                                        onClick={() => { searchCategory() }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {categories.length > 0 ?
                            categories.map((item) =>
                                (
                                    <Card key={item._id} style={{ width: "18rem" }}>
                                        <Card.Img
                                            variant="top"
                                            src={`${item.image}`}
                                            style={{
                                                width: "250px",
                                                height: "250px",
                                            }}
                                        />
                                        <Card.Body>
                                            <Card.Title style={{ textTransform: "capitalize" }}>
                                                {item.name}
                                            </Card.Title>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    dispatch(getCategoryAction(item._id));
                                                    setShow(true);
                                                }}
                                            >
                                                Cập nhật
                                </Button>{" "}
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    dispatch(deleteCategoryAction(item._id));
                                                }}
                                            >
                                                Xóa
                                </Button>{" "}
                                        </Card.Body>
                                    </Card>
                                )
                            )
                            : <div>Khoong tim thay san pham</div>
                        }
                    </Col>
                    {Show && <Add setShow={setShow} />}
                </Row>
            </Container>
        </Layout>
    );
};

export default Category;
