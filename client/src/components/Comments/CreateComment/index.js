import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import useForm from "../../../lib/hooks/useForm";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($text: String!, $messageId: ID!) {
    createComment(text: $text, messageId: $messageId) {
      id
      text
    }
  }
`;

const CreateComment = ({ messageId }) => {
  const { values, setValues, handleChange } = useForm({
    text: "",
  });
  const { text } = values;
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
          }
          setValues({ text: "" });
        }}
      >
        <label htmlFor="text-comment">
          <h1>New Comment</h1>
        </label>
        <input
          data-testid="createcomment-text"
          id="text-comment"
          name="text"
          type="text"
          value={text}
          onChange={handleChange}
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

export default CreateComment;
export { CREATE_COMMENT_MUTATION };
