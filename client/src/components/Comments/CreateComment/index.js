import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($text: String!, $messageId: ID!) {
    createComment(text: $text, messageId: $messageId) {
      id
      text
    }
  }
`;

const CreateComment = ({ messageId }) => {
  const [text, setText] = React.useState("");
  const [createComment, { error, loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  if (error) return `There was an error! Please try again`;
  return (
    <>
      <form
        className="form"
        data-testid="createcomment"
        onSubmit={async e => {
          e.preventDefault();
          if (text) {
            await createComment({ variables: { text, messageId } });
            setText("");
          }
        }}
      >
        <label htmlFor="text-comment">
          <h1>New Comment</h1>
        </label>
        <input
          data-testid="createcomment-text"
          id="text-comment"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        {text ? (
          <p
            data-testid="createcomment-preview"
            style={{
              wordWrap: "break-word",
              maxWidth: "25rem",
              fontStyle: "italic",
              color: "silver",
              marginTop: "1rem",
            }}
          >
            Preview: {text}
          </p>
        ) : null}
        <input
          data-testid="createcomment-submit"
          type="submit"
          value={loading ? "Sending" : "Send"}
        />
      </form>
    </>
  );
};

const commentTemplate =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

export default CreateComment;
export { CREATE_COMMENT_MUTATION };
