import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Message from "./Message";

const GET_MESSAGES_QUERY = gql`
  query GET_MESSAGES_QUERY {
    getMessages {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

const MessageList = props => {
  const { data, error, loading } = useQuery(GET_MESSAGES_QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! `;

  return (
    <>
      <h1>Messages</h1>
      <div className="message-list">
        {data &&
          data.getMessages.map(message => (
            <Message key={message.id} message={message} />
          ))}
      </div>
    </>
  );
};

export default MessageList;
export { GET_MESSAGES_QUERY };
