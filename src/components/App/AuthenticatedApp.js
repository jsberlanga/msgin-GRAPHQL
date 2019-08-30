import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../globals/Header";
import Footer from "../globals/Footer";
import Home from "../Home";
import Signin from "../Auth/Signin";
import CreateMessage from "../Messages/CreateMessage";
import MessageList from "../Messages/MessageList/MessageList";
import SingleMessage from "../Messages/MessageList/SingleMessage";
import Profile from "../User/Profile";
import NotFound from "../NotFound";

const AuthenticatedApp = ({ user }) => {
  return (
    <div data-testid="authenticated-app">
      <Header user={user} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/add" component={CreateMessage} />
          <Route exact path="/messages" component={MessageList} />
          <Route path="/message/:id" component={SingleMessage} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedApp;
