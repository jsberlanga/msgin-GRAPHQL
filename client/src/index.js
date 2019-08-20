import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
const App = React.lazy(() => import("./components/App"));

const client = new ApolloClient({
  uri: "http://localhost:4000/__graphql",
  credentials: "include"
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.Suspense
        fallback={
          <h1 className="container container__loading">Loading Application</h1>
        }
      >
        <App />
      </React.Suspense>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
