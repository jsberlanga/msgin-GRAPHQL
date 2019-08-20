import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Signout from "./Signout";
import CreateMessage from "./CreateMessage";
import MessageList from "./MessageList/MessageList";

const App = () => {
  return (
    <div className="container">
      <Signup title="Signup" />
      <Signin title="Signin" />
      <Signout title="Signout" />
      <CreateMessage title="CreateMessage" />
      <MessageList title="Message List" />
    </div>
  );
};

export default App;
