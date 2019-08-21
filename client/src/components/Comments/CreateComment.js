import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_MESSAGE_QUERY } from "../Messages/MessageList/SingleMessage";

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
  const [createComment, { data, error, loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      variables: { text, messageId }
    }
  );
  const { refetch } = useQuery(GET_MESSAGE_QUERY, {
    variables: { id: messageId }
  });
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await createComment();
        setText("");
        refetch();
      }}
    >
      <label htmlFor="text-comment">New Comment</label>
      <input
        id="text-comment"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

const commentTemplate =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

export default CreateComment;
