import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ME_QUERY } from "./globals/Header";

const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

const Signout = props => {
  const [signout, { error, loading }] = useMutation(SIGNOUT_MUTATION);
  const { client } = useQuery(ME_QUERY);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <button
        onClick={() => {
          signout();
          client.resetStore();
          props.history.push("/");
        }}
      >
        Signout
      </button>
    </>
  );
};

export default Signout;
