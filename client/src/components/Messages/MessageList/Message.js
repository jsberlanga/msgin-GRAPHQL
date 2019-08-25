import React from "react";
import { Link } from "react-router-dom";
import Helpers from "../../../lib/utils/helpers";

const Message = ({ message }) => {
  return (
    <div data-testid="message" className="message">
      <h3 data-testid="message-title">{message.title}</h3>
      <p data-testid="message-body">{Helpers.shortenText(message.body, 300)}</p>
      <p className="message__created">
        This message was written {Helpers.formatDate(message.createdAt)} by{" "}
        {message.author.name}
      </p>
      {message.comments.length ? (
        <p className="message__comments" data-testid="message-comments">
          {message.comments.length > 1
            ? `There are ${message.comments.length} comments`
            : `There is ${message.comments.length} comment`}
        </p>
      ) : null}
      <p className="message__more">
        <Link to={`/message/${message.id}`}>know more</Link>
      </p>
    </div>
  );
};

export default Message;
