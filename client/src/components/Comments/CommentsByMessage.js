import React from "react";
import { gql } from "apollo-boost";

import { useQuery, useSubscription } from "@apollo/react-hooks";

const COMMENTS_SUBSCRIPTION = gql`
  subscription commentAdded($messageId: String!) {
    commentAdded(messageId: $messageId) {
      id
      text
    }
  }
`;

export const NewCommentSubscription = ({ messageId }) => {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { messageId }
  });

  return (
    <p className={!loading && data.commentAdded ? "comment--notification" : ""}>
      {!loading && data.commentAdded.text
        ? `A new comment has been added`
        : null}
    </p>
  );
};

const GET_COMMENTS_QUERY = gql`
  query GET_COMMENTS_QUERY($messageId: ID!) {
    getCommentsByMessage(messageId: $messageId) {
      id
      text
      postedBy {
        id
        name
      }
    }
  }
`;

const CommentsByMessage = ({ messageId }) => {
  const {
    data: { getCommentsByMessage },
    error,
    loading
  } = useQuery(GET_COMMENTS_QUERY, {
    variables: {
      messageId
    }
  });
  if (loading) return <p>loading</p>;
  return (
    <>
      <ul>
        {getCommentsByMessage.map(comment => (
          <li className="comment" key={comment.id}>
            <p className="comment__text">{comment.text}</p>
            <p className="comment__author">Posted by {comment.postedBy.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentsByMessage;
