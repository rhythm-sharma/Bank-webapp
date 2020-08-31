import React from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/HOC/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/HOC/PublicRoute/PublicRoute";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <PublicRoute component={Login} path="/login" exact />
        <PublicRoute component={SignUp} path="/signup" exact />
        <PrivateRoute component={Dashboard} path="/dashboard" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
