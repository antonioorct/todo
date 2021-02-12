import axios from "axios";
import { getJwtFromLocal } from "./storageService";

const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use(
  (conf) => {
    const jwt = getJwtFromLocal();

    if (jwt) conf.headers = { ...conf.headers, Authorization: "Bearer " + jwt };
    conf.url = baseApiUrl + conf.url;

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
