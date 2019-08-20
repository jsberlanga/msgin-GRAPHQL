import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./globals/Header/index";

import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import CreateMessage from "./CreateMessage";
import MessageList from "./MessageList/MessageList";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={CreateMessage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/messages" component={MessageList} />
        </Switch>
      </div>
    </>
  );
};

export default App;
