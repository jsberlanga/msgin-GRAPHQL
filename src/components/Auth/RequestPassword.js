import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Error from "../globals/Error";

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

const RequestPassword = () => {
  const [email, setEmail] = React.useState("hi@juliosoto.dev");
  const [requestPasswordReset, { data, error }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION
  );
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPasswordReset({ variables: { email } });
          setEmail("");
        }}
      >
        <h1>Password Reset</h1>
        <h5>Forgot your password?</h5>
        <label htmlFor="reset-email">
          <h5>Email</h5>
        </label>
        <input
          id="reset-email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="submit" value="Send" />
      </form>
      {data ? <h3>{data.requestPasswordReset.message}</h3> : null}
      {error ? <Error>{error.message}</Error> : null}
    </div>
  );
};

export default RequestPassword;
