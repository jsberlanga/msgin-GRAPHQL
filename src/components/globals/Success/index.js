import React from "react";

const styles = {
  color: "green",
  backgroundColor: "#fff",
  padding: "1rem",
};

const Success = props => {
  return <h2 style={styles}>{props.children}</h2>;
};

export default Success;
