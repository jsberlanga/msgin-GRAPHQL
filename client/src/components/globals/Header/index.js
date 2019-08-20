import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Signout from "../../Signout";

import { gql } from "apollo-boost";

import UserContext from "../../../context/UserContext";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

const Header = props => {
  const user = React.useContext(UserContext);

  if (!user.me) {
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
        <Link to="/messages">Messages</Link>
      </div>
      <div className="navbar__auth">
        <span>Welcome {user.me.name}</span>
        <Signout history={props.history} />
      </div>
    </nav>
  );
};

export default withRouter(Header);
export { ME_QUERY };
