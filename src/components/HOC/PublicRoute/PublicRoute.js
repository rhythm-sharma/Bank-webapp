import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../../utils/authentication/authentication";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
