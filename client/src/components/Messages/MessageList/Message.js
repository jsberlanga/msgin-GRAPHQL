import React from "react";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <div className="message">
      <h3>{message.title}</h3>
      <p>{message.body}</p>
      <p>Written by: {message.author.name}</p>
      <p>
        {message.comments.length
          ? message.comments.length > 1
            ? `This message have ${message.comments.length} comments`
            : `This message has ${message.comments.length} comment`
          : null}
      </p>
      <Link to={`/message/${message.id}`}>More</Link>
    </div>
  );
};

export default Message;
