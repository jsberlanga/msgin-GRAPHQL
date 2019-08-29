import React from "react";

const styles = {
  color: "red",
  backgroundColor: "#fff",
  padding: "1rem",
};

const Error = props => {
  const replaceContent = err => {
    if (err.includes("GraphQL error")) {
      return err.replace("GraphQL error: ", "");
    } else {
      return JSON.stringify(err);
    }
  };
  return <h2 style={styles}>{replaceContent(props.children)}</h2>;
};

export default Error;
