import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { MdStars } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteReviewAction } from "../../Actions/reviewAction";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import $ from "jquery";
import { MdSelectAll, MdDelete } from "react-icons/md";
window.$ = $;


const Reviews = (props) => {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review);

  const { loading, listReview, error } = review;
  console.log("listReview", listReview);

  const handleShowTotalRating = (item) => {
    const arr = [];
    for (let i = 1; i <= item; i++) {
      arr.push(<MdStars fontSize={20} key={i} />);
    }
    return arr;
  };
  const handleUpdateDay = (item) => {
    const data = item.split("-");
    return `${data[2]}/${data[1]}/${data[0]}`;
  };

  /**
   * begin pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(8);
  const [upperPageBound, setUpperPageBound] = useState(3);
  const [lowerPageBound, setLowerPageBound] = useState(0);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
  const [isNextBtnActive, setIsNextBtnActive] = useState("");
  const [pageBound, setPageBound] = useState(3);
  const [pageNumbers, setPageNumbers] = useState([])

  // setPrevAndNextBtnClass
  const setPrevAndNextBtnClass = (item) => {
    let totalPage = Math.ceil(listReview.length / todosPerPage);
    setIsNextBtnActive("disabled");
    setIsPrevBtnActive("disabled");

    if (totalPage === item && totalPage > 1) {
      setIsPrevBtnActive("");
    } else if (item === 1 && totalPage > 1) {
      setIsNextBtnActive("");
    } else if (totalPage > 1) {
      setIsNextBtnActive("");
      setIsPrevBtnActive("");
    }
  };

  // xử lý click
  const handleClick = (item) => {
    // console.log("handleClick", item);
    setCurrentPage(item);
    $("ul li.active").removeClass("active");
    $("ul li#" + item).addClass("active");
    setPrevAndNextBtnClass(item);
  };

  //begin render nextBtn
  const btnNextClick = () => {
    if (currentPage + 1 > upperPageBound) {
      let d1 = upperPageBound + pageBound;
      let d2 = lowerPageBound + pageBound;
      setUpperPageBound(d1);
      setLowerPageBound(d2);
    }
    let listid = currentPage + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const renderNextBtn = () => {
    let nextButton = [];
    if (isNextBtnActive === "disabled") {
      nextButton.push(
        <li className={isNextBtnActive}>
          <span style={{ cursor: "pointer" }} id="btnNext">
            {" "}
          Next{" "}
          </span>
        </li>
      );
    } else {
      nextButton.push(
        <li className={isNextBtnActive}>
          <div
            style={{ cursor: "pointer" }}
            id="btnNext"
            onClick={() => btnNextClick()}
          >
            {" "}
          Next{" "}
          </div>
        </li>
      );
    }
    return nextButton;
  };
  //end render nextBtn

  //begin render prevBtn
  const btnPrevClick = () => {
    if ((currentPage - 1) % pageBound === 0) {
      let d1 = upperPageBound - pageBound;
      let d2 = lowerPageBound - pageBound;
      setUpperPageBound(d1);
      setLowerPageBound(d2);
    }
    let listid = currentPage - 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };
  const renderPrevBtn = () => {
    let prevButton = [];
    if (isPrevBtnActive === "disabled") {
      prevButton.push(
        <li className={isPrevBtnActive}>
          <span style={{ cursor: "pointer" }} id="btnPrev">
            {" "}
          Prev{" "}
          </span>
        </li>
      );
    } else {
      prevButton.push(
        <li className={isPrevBtnActive}>
          <div
            style={{ cursor: "pointer" }}
            id="btnPrev"
            onClick={() => btnPrevClick()}
          >
            {" "}
          Prev{" "}
          </div>
        </li>
      );
    }
    return prevButton;
  };
  //end render prevBtn

  //begin render decrementBtn
  const btnDecrementClick = () => {
    let d1 = upperPageBound - pageBound;
    let d2 = lowerPageBound - pageBound;
    setUpperPageBound(d1);
    setLowerPageBound(d2);
    let listid = upperPageBound - pageBound;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };
  const renderDecrementBtn = () => {
    const pageDecrementBtn = [];
    if (lowerPageBound >= 1) {
      pageDecrementBtn.push(
        <li className="">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => btnDecrementClick()}
          >
            <GrLinkPrevious />
          </div>
        </li>
      );
    }
    return pageDecrementBtn;
  };
  //end render decrementBtn

  // begin render IncrenmentBtn
  const btnIncrementClick = () => {
    let d1 = upperPageBound + pageBound;
    let d2 = lowerPageBound + pageBound;
    setUpperPageBound(d1);
    setLowerPageBound(d2);

    let listid = upperPageBound + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const renderIncrementBtn = () => {
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = (
        <li className="">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => btnIncrementClick()}
          >
            <GrLinkNext />
          </div>
        </li>
      );
    }
    return pageIncrementBtn;
  };

  // end render IncrenmentBtn

  useEffect(() => {
    if (currentPage) {
      // eslint-disable-next-line no-undef
      $("ul li.active").removeClass("active");
      // eslint-disable-next-line no-undef
      $("ul li#" + currentPage).addClass("active");
    }
  }, [currentPage]);

  useEffect(() => {
    if (listReview) {
      // setListUser(listUser);
      setPageNumbers([...Array(Math.ceil(listReview.length / todosPerPage)).keys()]);
    }
  }, [listReview, setPageNumbers]);

  console.log("list", pageNumbers);


  /**
   * end pagination
   */


  return (
    <Layout sidebar>
      <Container className="page">
        <Row>
          <Col md={12}>
            <div>
              <h3>Danh sách bình luận</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th
                    style={{ textTransform: "capitalize" }}
                  >
                    Date
                  </th>
                  <th
                    style={{ textTransform: "capitalize" }}
                  >
                    Khách hàng
                  </th>
                  <th
                    style={{ textTransform: "capitalize" }}
                  >
                    Sản phẩm
                  </th>
                  <th
                    style={{ textTransform: "capitalize" }}
                  >
                    Xếp hạng
                  </th>
                  <th
                    style={{ textTransform: "capitalize" }}
                  >
                    Bình luận
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>Loading...</>
                ) : (
                    <>
                      {listReview &&
                        listReview.map((item, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: "bold" }}>
                              {handleUpdateDay(item.createdAt.slice(0, 10))}
                            </td>
                            <td
                              style={{

                                textTransform: "capitalize",
                                fontWeight: "bold",
                              }}
                            >
                              {item.name}
                            </td>
                            <td
                              style={{

                                textTransform: "capitalize",
                                fontWeight: "600",
                              }}
                            >
                              {item.productID.name}
                            </td>
                            <td style={{}}>
                              {handleShowTotalRating(item.star)}
                            </td>
                            <td style={{}}>{item.content}</td>
                            <td>
                              <TiDeleteOutline
                                style={{ cursor: "pointer", color: "red" }}
                                fontSize={28}
                                onClick={() => dispatch(deleteReviewAction(item._id))}
                              />
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {
          (listReview && listReview.length > 8) ? (
            <Row>
              <Col>
                <ul id="page-numbers" className="pagination">
                  {renderPrevBtn()}
                  {renderDecrementBtn()}
                  {pageNumbers &&
                    pageNumbers.map((item, index) => {
                      if (item === 0 && currentPage === 0) {
                        return (
                          <li key={item} className="active" id={item}>
                            <div
                              style={{ cursor: "pointer" }}
                              id={item}
                              onClick={() => handleClick(item)}
                            >
                              {item}
                            </div>
                          </li>
                        );
                      } else if (item < upperPageBound + 1 && item > lowerPageBound) {
                        return (
                          <li key={item} className={index === 1 && 'active'} id={item}>
                            <div
                              style={{ cursor: "pointer" }}
                              id={item}
                              onClick={() => handleClick(item)}
                            >
                              {item}
                            </div>
                          </li>
                        );
                      }
                    })}
                  {renderIncrementBtn()}
                  {renderNextBtn()}
                </ul>
              </Col>
            </Row>
          ) : null
        }


      </Container>
    </Layout>
  );
};

export default Reviews;
