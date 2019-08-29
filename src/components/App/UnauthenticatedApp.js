import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../globals/Header";
import Footer from "../globals/Footer";

import Home from "../Home";
import Signup from "../Auth/Signup";
import Signin from "../Auth/Signin";
import PasswordReset from "../Auth/PasswordReset";
import NotFound from "../NotFound";

const UnauthenticatedApp = ({ user }) => {
  return (
    <div data-testid="unauthenticated-app">
      <Header user={user} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route path="/reset/resetToken=:id" component={PasswordReset} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default UnauthenticatedApp;
