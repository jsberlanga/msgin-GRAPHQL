import React from "react";
import { gql } from "apollo-boost";

import { useQuery, useSubscription } from "@apollo/react-hooks";

const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription commentAdded($messageId: String!) {
    commentAdded(messageId: $messageId) {
      id
      text
      postedBy {
        id
        name
      }
    }
  }
`;
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
  const { subscribeToMore, ...result } = useQuery(GET_COMMENTS_QUERY, {
    variables: { messageId }
  });
  return (
    <>
      <CommentsPage
        {...result}
        subscribeToNewComments={() =>
          subscribeToMore({
            document: NEW_COMMENTS_SUBSCRIPTION,
            variables: { messageId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.commentAdded;
              const obj = Object.assign({}, prev, {
                getCommentsByMessage: [
                  ...prev.getCommentsByMessage,
                  newFeedItem
                ]
              });
              // console.log(obj);
              return obj;
            }
          })
        }
      />
    </>
  );
};

const CommentsPage = props => {
  React.useEffect(() => {
    props.subscribeToNewComments();
  }, []);
  if (props.loading) return <p>loading</p>;
  return (
    <ul>
      {props.data.getCommentsByMessage.map(comment => (
        <li className="comment" key={comment.id}>
          <p className="comment__text">{comment.text}</p>
          <p className="comment__author">Posted by {comment.postedBy.name}</p>
        </li>
      ))}
    </ul>
  );
};

const NewCommentPopup = ({ messageId }) => {
  const { data, loading } = useSubscription(NEW_COMMENTS_SUBSCRIPTION, {
    variables: { messageId }
  });

  return (
    <p className={!loading && data.commentAdded ? "comment--notification" : ""}>
      {!loading && data.commentAdded.text
        ? `NEW COMMENT: ${short(data.commentAdded.text)}`
        : null}
    </p>
  );
};

function short(string) {
  return string.length > 20 ? `${string.slice(0, 20).trim()}...` : string;
}

export default CommentsByMessage;
export { NewCommentPopup };
