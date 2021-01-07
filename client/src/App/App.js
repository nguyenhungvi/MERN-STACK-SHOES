import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Components/Header/Header";
import Home from "../Screens/Home/Home";
import Account from "../Screens/Account/Account";
import Cart from "../Screens/Cart/Cart";
import Checkout from "../Screens/Checkout/Checkout";
import Detail from "../Screens/Detail/Detail";
import Signin from "../Screens/Signin/Signin";
import Signup from "../Screens/Signup/Signup";
import ProductByCategory from '../Screens/ProductByCategory';
import Footer from "../Screens/Footer/Footer";
import './App.css';
import { useDispatch, useSelector, } from "react-redux";
import { getCategoryAction } from "../Actions/categoryAction";
import PrivateRoute from "../HOC/PrivateRoute";
import { getOrderByCustomerAction, isUserSigninAction } from "../Actions/authAction";
import Search from "../Screens/Search";
import { getProductAllAction } from "../Actions/productAction";
import Error from "../Screens/Error";

const App = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { authenticate } = auth;
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    dispatch(getCategoryAction());
    if (!authenticate) {
      dispatch(isUserSigninAction());
    }
    dispatch(getProductAllAction());
  }, [authenticate, cart, dispatch]);



  return (
    <BrowserRouter>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/tai-khoan" exact component={Account} />
          <Route path="/gio-hang" exact component={Cart} />
          <Route path="/thanh-toan" exact component={Checkout} />
          <Route path="/chi-tiet/:name/:id" exact component={Detail} />
          <Route path="/the-loai/:nameCategory" exact component={ProductByCategory} />
          <Route path="/dang-nhap" exact component={Signin} />
          <Route path="/dang-ky" exact component={Signup} />
          <Route path="/tim-kiem" exact component={Search} />
          <Route path="/404" component={Error} />
        </Switch>
      </div>
      {/* content */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
