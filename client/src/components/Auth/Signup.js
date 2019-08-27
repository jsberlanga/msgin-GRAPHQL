import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useForm from "../../lib/hooks/useForm";

import { ME_QUERY } from "../../context/UserContext";

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
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION);

  const { refetch } = useQuery(ME_QUERY);

  return (
    <>
      {loading && <div data-testid="loading" className="lds-dual-ring" />}
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

        <label htmlFor="name">
          <h5>Name</h5>
        </label>
        <input id="name" type="text" onChange={handleChange} />
        <label htmlFor="email">
          <h5>Email</h5>
        </label>
        <input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">
          <h5>Password</h5>
        </label>
        <input id="password" type="password" onChange={handleChange} />
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Signup;
