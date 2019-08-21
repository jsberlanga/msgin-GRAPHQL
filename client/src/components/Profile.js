import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { ME_QUERY } from "../context/UserContext";

const Profile = () => {
  const { data } = useQuery(ME_QUERY);
  return (
    <div className="profile--grid">
      <div>
        <h1>Your messages:</h1>
        <ul>
          {data.me.messages.map((message, idx) => (
            <li key={message.id}>
              {idx + 1}. {message.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Your comments:</h1>
        <ul>
          {data.me.comments.map((comment, idx) => (
            <li key={comment.id}>
              {idx + 1}. {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
