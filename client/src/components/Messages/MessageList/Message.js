import React from "react";
import { Link } from "react-router-dom";
import Helpers from "../../../lib/utils/helpers";

const Message = ({ message }) => {
  return (
    <div className="message">
      <h3>{message.title}</h3>
      <p>{message.body}</p>
      <p>
        {message.comments.length
          ? message.comments.length > 1
            ? `This message have ${message.comments.length} comments`
            : `This message has ${message.comments.length} comment`
          : null}
      </p>
      <p className="message__created">
        This message was written {Helpers.formatDate(message.createdAt)} by{" "}
        {message.author.name}
      </p>
      <p className="message__more">
        <Link to={`/message/${message.id}`}>know more</Link>
      </p>
    </div>
  );
};

export default Message;
