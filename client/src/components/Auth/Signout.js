import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ME_QUERY } from "../../context/UserContext";

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
      {loading && <div className="lds-dual-ring" />}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <button
        onClick={() => {
          signout();
          // To ensure that the UI and store state reflects the current user's permissions
          // is to call client.resetStore() after your login or logout process has completed.
          // This will cause the store to be cleared and all active queries to be refetched.
          // If you just want the store to be cleared and don't want to refetch active queries,
          // use client.clearStore() instead.
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
