import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../services/userContext";

export default function LoginRoute({ component: Component, ...rest }) {
  const user = useContext(UserContext)[0];

  return !user.id ? (
    <Route {...rest}>
      <Component {...rest} />
    </Route>
  ) : (
    <Redirect to="/" />
  );
}
