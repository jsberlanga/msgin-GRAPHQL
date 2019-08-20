import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

const Signout = props => {
  const [signout, { error, loading }] = useMutation(SIGNOUT_MUTATION);
  return (
    <>
      <h1>{props.title}</h1>
      {loading && <p>Loading...</p>}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <button onClick={() => signout()}>Signout</button>
    </>
  );
};

export default Signout;
