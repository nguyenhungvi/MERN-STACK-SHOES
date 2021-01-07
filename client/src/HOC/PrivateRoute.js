import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} component={(props) => {
            const token = window.localStorage.getItem("token");
            // return <Component {...props} />;
            if (token) {
                return <Component {...props} />;
            }
            else {
                return <Redirect to={`/dang-nhap`} />
                // return <Redirect to="/" />
            }
        }} />
    );
}

export default PrivateRoute;
