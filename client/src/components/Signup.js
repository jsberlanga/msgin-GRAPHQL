import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ME_QUERY } from "../context/UserContext";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION);

  const { refetch } = useQuery(ME_QUERY);

  return (
    <>
      {loading && <div className="lds-dual-ring" />}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await signup({ variables: { name, email, password } });
          props.history.push("/");
          refetch();
        }}
      >
        <h1>Register an account</h1>

        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={e => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Signup;
