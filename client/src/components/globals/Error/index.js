import React from "react";

const styles = {
  color: "red",
  backgroundColor: "#fff",
  padding: "1rem",
  fontSize: "2rem",
  border: "3px solid red"
};

const Error = props => {
  return <div style={styles}>{props.children}</div>;
};

export default Error;
