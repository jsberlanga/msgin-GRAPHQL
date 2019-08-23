import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_MESSAGE_QUERY } from "../../Messages/MessageList/SingleMessage";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($text: String!, $messageId: ID!) {
    createComment(text: $text, messageId: $messageId) {
      id
      text
    }
  }
`;

const CreateComment = ({ messageId }) => {
  const [text, setText] = React.useState(commentTemplate);
  const [createComment, { error, loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      variables: { text, messageId }
    }
  );
  const { refetch } = useQuery(GET_MESSAGE_QUERY, {
    variables: { id: messageId }
  });
  if (error) return `There was an error! Please try again`;
  return (
    <>
      <form
        className="form"
        onSubmit={async e => {
          e.preventDefault();
          if (text) {
            await createComment();
            setText("");
            refetch();
          }
        }}
      >
        <label htmlFor="text-comment">
          <h1>New Comment</h1>
        </label>
        <input
          id="text-comment"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" value={loading ? "Sending" : "Send"} />
      </form>
    </>
  );
};

const commentTemplate =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

export default CreateComment;
