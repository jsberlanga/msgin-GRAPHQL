import React from "react";

import { ME_QUERY } from "../../context/UserContext";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router";
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));
const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

const App = props => {
  const { data, loading } = useQuery(ME_QUERY);
  return !data.me ? (
    <React.Suspense
      fallback={<div data-testid="loading" className="lds-dual-ring" />}
    >
      <UnauthenticatedApp user={data} loading={loading} />
    </React.Suspense>
  ) : (
    <React.Suspense
      fallback={<div data-testid="loading" className="lds-dual-ring" />}
    >
      <AuthenticatedApp user={data} loading={loading} />
    </React.Suspense>
  );
};

export default withRouter(App);
