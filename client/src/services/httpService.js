import axios from "axios";
import { getJwtFromLocal } from "./storageService";

axios.interceptors.request.use(
  (conf) => {
    const jwt = getJwtFromLocal();

    if (jwt) conf.headers = { ...conf.headers, Authorization: "Bearer " + jwt };
    conf.url = `http://${window.location.hostname}:3001/api${conf.url}`;

    return conf;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err.response.data.error)
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
