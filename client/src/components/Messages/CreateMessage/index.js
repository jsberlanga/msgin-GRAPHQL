import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_MESSAGES_QUERY } from "../MessageList/MessageList";

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
  const [title, setTitle] = useState(titleTemplate);
  const [body, setBody] = useState(bodyTemplate);
  const [createMessage, { error, loading }] = useMutation(
    CREATE_MESSAGE_MUTATION
  );
  const { refetch } = useQuery(GET_MESSAGES_QUERY);
  return (
    <>
      {loading && <div data-testid="loading" className="lds-dual-ring" />}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <form
        className="form"
        onSubmit={async e => {
          e.preventDefault();
          await createMessage({ variables: { title, body } });
          await refetch();
          props.history.push("/messages");
        }}
      >
        <h1>Publish a Message</h1>

        <label htmlFor="title">
          <h5>Message</h5>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="body">
          <h5>Body</h5>
        </label>
        <textarea
          id="body"
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows="7"
        />

        <input type="submit" value="Publish" />
      </form>
    </>
  );
};

const bodyTemplate =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const titleTemplate = "Lorem ipsum";

export default CreateMessage;
