import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../globals/Header/index";
import Home from "../Home";
import Signup from "../Signup";
import Signin from "../Signin";
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
    </>
  );
};

export default UnauthenticatedApp;
