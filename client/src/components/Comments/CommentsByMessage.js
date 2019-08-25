import React from "react";
import { gql } from "apollo-boost";

import { useQuery, useSubscription } from "@apollo/react-hooks";
import Helpers from "../../lib/utils/helpers";

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
  // subscribeToMore is a function available on every query result in React Apollo. It works just like  fetchMore, except that the update function gets called every time the subscription returns, instead of only once.
  const { subscribeToMore, ...result } = useQuery(GET_COMMENTS_QUERY, {
    variables: { messageId }
  });
  return (
    <>
      <CommentsPage
        {...result}
        // Add a function called subscribeToNewComments that will subscribe using subscribeToMore and update the query's store with the new data using updateQuery.
        subscribeToNewComments={() =>
          subscribeToMore({
            document: NEW_COMMENTS_SUBSCRIPTION,
            variables: { messageId },
            // the updateQuery callback must return an object of the same shape as the initial query data, otherwise the new data won't be merged. Here the new comment is pushed in the comments list of the entry.
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.commentAdded;
              const newObjData = Object.assign({}, prev, {
                getCommentsByMessage: [
                  ...prev.getCommentsByMessage,
                  newFeedItem
                ]
              });
              return newObjData;
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
  if (props.loading) return <div className="lds-dual-ring" />;
  return (
    <ul>
      {props.data.getCommentsByMessage.map(comment => (
        <li id={comment.id} className="comment" key={comment.id}>
          <p className="comment__text">{comment.text}</p>
          <p className="comment__author">Posted by {comment.postedBy.name}</p>
        </li>
      ))}
    </ul>
  );
};

const NewCommentPopup = ({ messageId }) => {
  const [open, setOpen] = React.useState(false);
  const { data, loading } = useSubscription(NEW_COMMENTS_SUBSCRIPTION, {
    variables: { messageId }
  });

  React.useEffect(() => {
    setOpen(true);
  }, [data, loading]);

  return (
    <div
      className={
        !loading && data && open
          ? "comment--notification__open"
          : "comment--notification__closed"
      }
    >
      <button onClick={() => setOpen(false)}>x</button>
      {!loading && data.commentAdded.text && (
        <div
          onClick={() => {
            const comment = document.getElementById(data.commentAdded.id);
            if (comment) comment.scrollIntoView();
            setOpen(false);
          }}
        >
          <h4>New comment:</h4>
          <p>{Helpers.shortenText(data.commentAdded.text, 20)} </p>
        </div>
      )}
    </div>
  );
};

export default CommentsByMessage;
export { NewCommentPopup };
