import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_MESSAGES_QUERY } from "./MessageList/MessageList";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($title: String!) {
    createMessage(title: $title) {
      id
      title
    }
  }
`;

const CreateMessage = props => {
  const [title, setTitle] = useState("");
  const [createMessage, { error, loading }] = useMutation(
    CREATE_MESSAGE_MUTATION
  );
  const { refetch } = useQuery(GET_MESSAGES_QUERY);
  return (
    <>
      <h1>Create a new message</h1>
      {loading && <p>Loading...</p>}
      {error &&
        error.graphQLErrors.map(err => <p key={err.message}>{err.message}</p>)}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await createMessage({ variables: { title } });
          await refetch();
          props.history.push("/messages");
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input type="submit" value="submit" />
      </form>
    </>
  );
};

export default CreateMessage;
