import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Signout from "../../Auth/Signout";

const Header = props => {
  if (!props.user.me) {
    return (
      <nav className="navbar" data-testid="unauthenticated-header">
        <div className="navbar__options">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar__auth">
          <Link to="/signup">Register</Link>
          <Link to="/signin">Login</Link>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar" data-testid="authenticated-header">
      <div className="navbar__options">
        <Link to="/">Home</Link>
        <Link to="/add">New Message</Link>
        <Link to="/messages">Messages</Link>
      </div>
      <div className="navbar__auth">
        <Link to="/profile">
          <span data-testid="welcome">Welcome {props.user.me.name}</span>
        </Link>
        <Signout history={props.history} />
      </div>
    </nav>
  );
};

export default withRouter(Header);
