import jwtDecode from "jwt-decode";
import { getJwtFromLocal } from "./storageService";
import { initialState } from "./userContext";
import { logout } from "./authService";

const getUserFromJwt = (jwt) => jwtDecode(jwt);

const getLoggedInUser = () => {
  const jwt = getJwtFromLocal();

  if (!jwt) return initialState;

  const user = getUserFromJwt(jwt);

  if (!user) return initialState;

  if (new Date().getTime() / 1000 > user.exp) {
    logout();
    return initialState;
  }

  return user;
};

export { getUserFromJwt, getLoggedInUser };
