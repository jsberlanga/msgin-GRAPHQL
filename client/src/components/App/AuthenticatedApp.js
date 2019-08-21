import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../globals/Header/index";
import Home from "../Home";
import CreateMessage from "../CreateMessage";
import MessageList from "../MessageList/MessageList";
import NotFound from "../NotFound";

const AuthenticatedApp = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={CreateMessage} />
          <Route exact path="/messages" component={MessageList} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </>
  );
};

export default AuthenticatedApp;
