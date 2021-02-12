import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./todoList";
import Login from "./login";
import Register from "./register";
import { UserContext } from "../services/userContext";
import { getLoggedInUser } from "../services/userService";
import ProtectedRoute from "./protectedRoute";
import LoginRoute from "./loginRoute";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    tryLogin();
  }, []);

  const tryLogin = async () => {
    const loggedInUser = await getLoggedInUser();

    setUser(loggedInUser);
  };

  return (
    user && (
      <UserContext.Provider value={[user, setUser]}>
        <Switch>
          <ProtectedRoute path="/" component={TodoList} exact />
          <LoginRoute path="/login" component={Login} exact />
          <LoginRoute path="/register" component={Register} exact />
        </Switch>
      </UserContext.Provider>
    )
  );
}
