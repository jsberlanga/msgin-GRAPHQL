import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <p>Title:{message.title}</p>
      <p>Author: {message.author.name}</p>
      <h3>Comments -tbd-</h3>
    </div>
  );
};

export default Message;
