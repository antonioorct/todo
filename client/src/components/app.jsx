import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./todoList";
import Login from "./login";
import Register from "./register";
import { UserContext } from "../services/userContext";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Switch>
        <Route path="/" component={TodoList} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </UserContext.Provider>
  );
}
