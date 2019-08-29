import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const SEND_EMAIL_MUTATION = gql`
  mutation SEND_EMAIL_MUTATION($email: String) {
    sendEmail(email: $email) {
      message
    }
  }
`;

const SendEmail = () => {
  const [email, setEmail] = React.useState("");
  const [sendEmail, { data }] = useMutation(SEND_EMAIL_MUTATION);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          sendEmail({ variables: { email } });
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
      {data ? <h3>{data.sendEmail.message}</h3> : null}
    </div>
  );
};

export default SendEmail;
