import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  getAccountAction,
  getAccountNewAction,
  getCartAction,
  isUserSignIn,
} from "./Actions/authAction";
import PrivateRoute from "./Components/HOC/PrivateRoute";
import Home from "./Screens/Home/Home";
import Order from "./Screens/Order";
import Product from "./Screens/Product/Product";
import SignIn from "./Screens/SignIn/SignIn";
import Category from "./Screens/Category/Category";
import Account from "./Screens/Account";
import Detail from "./Screens/Detail";
import { getAllOrderAction, orderPageHome } from "./Actions/orderAction";
import Reviews from "./Screens/Reviews";
import { getAllReviewAction, getReviewsAction } from "./Actions/reviewAction";

const App = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { authenticate } = auth;

  useEffect(() => {
    if (!authenticate) {
      dispatch(isUserSignIn());
      // dispatch(getCategoriesAction());
    }
    if (authenticate) {
      dispatch(getAccountAction());
      dispatch(getAllOrderAction());
      dispatch(orderPageHome());
      dispatch(getReviewsAction());
      dispatch(getAccountNewAction());
      dispatch(getAllReviewAction());
    }
    dispatch(getCartAction());
  }, [authenticate]);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/product" component={Product} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/order" component={Order} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/detail" component={Detail} />
        <PrivateRoute path="/review" component={Reviews} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
