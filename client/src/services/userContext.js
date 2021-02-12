import { createContext } from "react";

const initialState = {
  id: null,
  username: null,
};

const UserContext = createContext(initialState);

export { initialState, UserContext };
