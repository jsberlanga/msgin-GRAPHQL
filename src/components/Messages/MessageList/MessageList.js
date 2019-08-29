import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Message from "./Message";

const GET_MESSAGES_QUERY = gql`
  query GET_MESSAGES_QUERY($skip: Int, $first: Int) {
    getMessages(skip: $skip, first: $first) {
      id
      title
      body
      createdAt
      author {
        id
        name
      }
      comments {
        id
      }
    }
  }
`;

const MessageList = props => {
  const { data, error, loading, fetchMore } = useQuery(GET_MESSAGES_QUERY, {
    variables: {
      skip: 0,
      first: 4,
    },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <div data-testid="loading" className="lds-dual-ring" />;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <h1>The Latest Messages</h1>
      <div className="messagelist__container">
        <div data-testid="messagelist" className="messagelist">
          {data &&
            data.getMessages.map(message => (
              <Message key={message.id} message={message} />
            ))}
        </div>
        <button
          className="messagelist__more"
          onClick={() => {
            fetchMore({
              variables: {
                skip: data.getMessages.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                const obj = Object.assign({}, prev, {
                  getMessages: [
                    ...prev.getMessages,
                    ...fetchMoreResult.getMessages,
                  ],
                });
                return obj;
              },
            });
          }}
        >
          more...
        </button>
      </div>
    </>
  );
};
export default MessageList;
export { GET_MESSAGES_QUERY };
