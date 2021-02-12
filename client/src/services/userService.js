import jwtDecode from "jwt-decode";
import { getJwtFromLocal } from "./storageService";
import { initialState } from "./userContext";

const getUserFromJwt = (jwt) => jwtDecode(jwt);

const getLoggedInUser = () => {
  const jwt = getJwtFromLocal();

  if (!jwt) return initialState;

  const user = getUserFromJwt(jwt);

  if (!user) return initialState;
  return user;
};

export { getUserFromJwt, getLoggedInUser };
