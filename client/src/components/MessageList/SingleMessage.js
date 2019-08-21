import React from "react";
import { gql } from "apollo-boost";

import { useQuery } from "@apollo/react-hooks";

import Error from "../globals/Error";

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY($id: ID!) {
    getMessage(id: $id) {
      id
      title
      author {
        id
        name
        email
      }
      comments {
        id
        text
        postedBy {
          id
          name
          email
        }
      }
    }
  }
`;

const SingleMessage = props => {
  const { data, error, loading } = useQuery(GET_MESSAGE_QUERY, {
    variables: { id: props.match.params.id }
  });
  if (loading) return <p>Loading</p>;
  if (error) return <Error>{JSON.stringify(error)}</Error>;
  if (!data.getMessage)
    return <Error>The queried message does not exist.</Error>;
  return (
    <div>
      <h1>{data.getMessage.title}</h1>
      <p>Posted by: {data.getMessage.author.name}</p>
      <hr />
      <h3>Comments:</h3>
      <ul>
        {data.getMessage.comments.map(comment => (
          <li key={comment.id}>
            {comment.text}. Posted by {comment.postedBy.name}
          </li>
        ))}
      </ul>
      <button onClick={() => props.history.push("/messages")}>Go back</button>
    </div>
  );
};

export default SingleMessage;
