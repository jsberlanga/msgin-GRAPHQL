import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ME_QUERY } from "./globals/Header";

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const Signin = props => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123qwe");
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION);
  const { refetch } = useQuery(ME_QUERY);
  return (
    <>
      <h1>Login to your account</h1>
      {loading && <p>Loading...</p>}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await signin({ variables: { email, password } });
          props.history.push("/");
          refetch();
        }}
      >
        <label htmlFor="sigin-email">Email</label>
        <input
          id="sigin-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="signin-password">Password</label>
        <input
          id="signin-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
};

export default Signin;
