import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import useForm from "../../../lib/hooks/useForm";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($title: String!, $body: String!) {
    createMessage(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const CreateMessage = props => {
  const { values, handleChange } = useForm({
    title: "",
    body: "",
  });
  const { title, body } = values;
  const [createMessage, { error, loading }] = useMutation(
    CREATE_MESSAGE_MUTATION
  );
  return (
    <>
      {loading && <div data-testid="loading" className="lds-dual-ring" />}
      {error && <p key="somekey">{JSON.stringify(error.message)}</p>}
      <form
        data-testid="createmessage-form"
        className="form"
        onSubmit={async e => {
          e.preventDefault();
          await createMessage({ variables: { title, body } });
          props.history.push("/messages");
        }}
      >
        <h1>Publish a Message</h1>

        <label htmlFor="title">
          <h5>Message</h5>
        </label>
        <input
          data-testid="createmessage-title"
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="body">
          <h5>Body</h5>
        </label>
        <textarea
          data-testid="createmessage-body"
          id="body"
          name="body"
          type="text"
          value={body}
          onChange={handleChange}
          rows="7"
        />

        <input
          type="submit"
          value="Publish"
          data-testid="createmessage-submit"
        />
      </form>
    </>
  );
};

export default CreateMessage;
export { CREATE_MESSAGE_MUTATION };
