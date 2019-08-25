import React from "react";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/react-hooks";

import Error from "../../globals/Error";
import CreateComment from "../../Comments/CreateComment";
import CommentsByMessage, {
  NewCommentPopup
} from "../../Comments/CommentsByMessage";

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
      <div className="message--single">
        <h1 className="message--single__title">{data.getMessage.title}</h1>
        <p className="message--single__body">{data.getMessage.body}</p>
        <p className="message--single__author">
          This message was written by {data.getMessage.author.name}
        </p>
      </div>
      <>
        <h3>Checkout the Comments:</h3>
        <CommentsByMessage messageId={props.match.params.id} />
        <NewCommentPopup messageId={props.match.params.id} />
        <CreateComment messageId={data.getMessage.id} />
      </>
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
