import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Signout from "../../Auth/Signout";

const Header = props => {
  if (!props.user.me) {
    return (
      <nav className="navbar">
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
    <nav className="navbar">
      <div className="navbar__options">
        <Link to="/">Home</Link>
        <Link to="/add">Add New Message</Link>
        <Link to="/messages">News</Link>
      </div>
      <div className="navbar__auth">
        <Link to="/profile">Welcome {props.user.me.name}</Link>
        <Signout history={props.history} />
      </div>
    </nav>
  );
};

export default withRouter(Header);
