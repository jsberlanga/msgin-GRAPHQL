import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../globals/Header";
import Footer from "../globals/Footer";

import Home from "../Home";
import Signup from "../Auth/Signup";
import Signin from "../Auth/Signin";
import NotFound from "../NotFound";

const UnauthenticatedApp = ({ user, loading }) => {
  if (loading) return null;
  return (
    <>
      <Header user={user} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default UnauthenticatedApp;
