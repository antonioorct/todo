import http from "./httpService";
import { deleteJwtFromLocal } from "./storageService";

const sendLoginInfo = async (username, password) => {
  const { data } = await http.post("/auth", { username, password });

  return data.jwt;
};

const sendRegisterInfo = async (username, email, password) => {
  await http.post("/users", { username, email, password });
};

const logout = () => {
  deleteJwtFromLocal();
};

export { sendLoginInfo, sendRegisterInfo, logout };
