import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useForm from "../../lib/hooks/useForm";
import Error from "../globals/Error";
import Success from "../globals/Success";

const PASSWORD_RESET_MUTATION = gql`
  mutation passwordReset(
    $resetToken: String!
    $resetTokenExpiry: String!
    $password: String!
  ) {
    passwordReset(
      resetToken: $resetToken
      resetTokenExpiry: $resetTokenExpiry
      password: $password
    ) {
      message
    }
  }
`;

const PasswordResetPage = props => {
  const { values, handleChange, setValues } = useForm({ password: "" });
  const { password } = values;
  const resetToken = props.match.params.id;
  const [passwordReset, { loading, error, data }] = useMutation(
    PASSWORD_RESET_MUTATION,
    {
      variables: {
        password,
        resetToken,
        resetTokenExpiry: String(Date.now()),
      },
    }
  );
  return (
    <div>
      {loading && <div data-testid="loading" className="lds-dual-ring" />}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await passwordReset();
          setValues({ password: "" });
        }}
      >
        <h1>Reset your password:</h1>
        <label htmlFor="signin-password">
          <h5>Enter a new password</h5>
        </label>
        <input
          id="signin-password"
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <input type="submit" value="Reset" />
      </form>
      {error &&
        error.graphQLErrors.map(err => (
          <Error key={err.message}>{err.message}</Error>
        ))}
      {data ? <Success>{data.passwordReset.message}</Success> : null}
    </div>
  );
};

export default PasswordResetPage;
