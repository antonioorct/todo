import jwtDecode from "jwt-decode";

const getUserFromJwt = (jwt) => jwtDecode(jwt);

export { getUserFromJwt };
