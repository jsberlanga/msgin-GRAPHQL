import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../globals/Header/index";

import Home from "../Home";
import Signup from "../Signup";
import Signin from "../Signin";
import CreateMessage from "../CreateMessage";
import MessageList from "../MessageList/MessageList";

import UserContext from "../../context/UserContext";

import NotFound from "../NotFound";

import { ME_QUERY } from "../globals/Header";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router";

const App = props => {
  // console.log(props);
  const { data } = useQuery(ME_QUERY);

  if (!data.me) {
    return (
      <UserContext.Provider value={data}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider value={data}>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={CreateMessage} />
          <Route exact path="/messages" component={MessageList} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default withRouter(App);
