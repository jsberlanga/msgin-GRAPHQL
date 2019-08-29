import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useForm from "../../lib/hooks/useForm";
import Error from "../globals/Error";

import { ME_QUERY } from "../../context/UserContext";
import RequestPassword from "./RequestPassword";

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
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const { email, password } = values;

  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION);
  const { refetch } = useQuery(ME_QUERY);
  return (
    <div>
      {loading && <div data-testid="loading" className="lds-dual-ring" />}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await signin({ variables: { email, password } });
          props.history.push("/");
          refetch();
        }}
      >
        <h1>Login to your account</h1>

        <label htmlFor="sigin-email">
          <h5>Email</h5>
        </label>
        <input
          id="sigin-email"
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="signin-password">
          <h5>Password</h5>
        </label>
        <input
          id="signin-password"
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      {error &&
        error.graphQLErrors.map(err => (
          <Error key={err.message}>{err.message}</Error>
        ))}
    </div>
  );
};

const SigninPage = props => {
  return (
    <div className="signin">
      <Signin {...props} />
      <RequestPassword {...props} />
    </div>
  );
};

export default SigninPage;
