import React from "react";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet";

import { useQuery, useSubscription } from "@apollo/react-hooks";

import Error from "../../globals/Error";
import CreateComment from "../../Comments/CreateComment";

const GET_MESSAGE_QUERY = gql`
  query GET_MESSAGE_QUERY($id: ID!) {
    getMessage(id: $id) {
      id
      title
      body
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

const COMMENTS_SUBSCRIPTION = gql`
  subscription commentAdded($messageId: String!) {
    commentAdded(messageId: $messageId) {
      id
      text
    }
  }
`;

const NewCommentSubscription = ({ messageId }) => {
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

const SingleMessage = props => {
  const { data, error, loading } = useQuery(GET_MESSAGE_QUERY, {
    variables: { id: props.match.params.id }
  });

  if (loading) return <div className="lds-dual-ring" />;
  if (error) return <Error>{JSON.stringify(error)}</Error>;
  if (!data.getMessage)
    return <Error>The queried message does not exist.</Error>;

  return (
    <>
      <Helmet>
        <title>Message | {data.getMessage.title} </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1>{data.getMessage.title}</h1>
      <p>{data.getMessage.body}</p>
      <p>This message was written by {data.getMessage.author.name}</p>
      <CreateComment messageId={data.getMessage.id} />
      {data.getMessage.comments.length ? (
        <>
          <h3>Checkout the Comments:</h3>
          <NewCommentSubscription messageId={props.match.params.id} />
          <ul>
            {data.getMessage.comments.map(comment => (
              <li key={comment.id}>
                {comment.text}
                <p>Posted by {comment.postedBy.name}</p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <button
        className="btn go-back--btn"
        onClick={() => props.history.goBack()}
      >
        Go back
      </button>
    </>
  );
};

export default SingleMessage;
export { GET_MESSAGE_QUERY };
