import React from "react";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <div className="message">
      <p>Title:{message.title}</p>
      <p>Author: {message.author.name}</p>
      <Link to={`/message/${message.id}`}>More</Link>
    </div>
  );
};

export default Message;
