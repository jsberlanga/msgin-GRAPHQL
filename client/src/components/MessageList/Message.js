import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <p>Title:{message.title}</p>
      <p>Author: {message.author.name}</p>
    </div>
  );
};

export default Message;
