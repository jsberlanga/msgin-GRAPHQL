import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION);
  return (
    <>
      <h1>{props.title}</h1>
      {loading && <p>Loading...</p>}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await signin({ variables: { email, password } });
        }}
      >
        <label htmlFor="sigin-email">Email</label>
        <input
          id="sigin-email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="signin-password">Password</label>
        <input
          id="signin-password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
};

export default Signin;
