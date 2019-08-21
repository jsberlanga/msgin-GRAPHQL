import React from "react";

import { ME_QUERY } from "../../context/UserContext";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router";
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));
const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

const App = props => {
  const { data } = useQuery(ME_QUERY);
  return !data.me ? (
    <React.Suspense
      fallback={<h1 className="container container__loading">Loading</h1>}
    >
      <UnauthenticatedApp user={data} />
    </React.Suspense>
  ) : (
    <React.Suspense
      fallback={<h1 className="container container__loading">Loading</h1>}
    >
      <AuthenticatedApp user={data} />
    </React.Suspense>
  );
};

export default withRouter(App);
