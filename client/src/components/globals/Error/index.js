import React from "react";

const styles = {
  color: "red",
  backgroundColor: "#fff",
  padding: "1rem",
  // fontSize: "1.4rem",
};

const Error = props => {
  return <h2 style={styles}>{props.children}</h2>;
};

export default Error;
