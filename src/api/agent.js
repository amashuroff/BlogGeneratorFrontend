import axios from "axios";
import { ApiServerUrl } from "./urls";
import { OPEN_ERROR_TOAST } from "../state/actions/types";

axios.defaults.baseURL = ApiServerUrl;

export const interceptor = (store) => {
  axios.interceptors.request.use(
    (conf) => {
      // you can add some information before send it.
      // conf.headers['Auth'] = 'some token'
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      if (error.response?.data?.errors?.Name) {
        store.dispatch({
          type: OPEN_ERROR_TOAST,
          payload: error.response?.data?.errors?.Name,
        });
      } else {
        store.dispatch({
          type: OPEN_ERROR_TOAST,
          payload: error.message,
        });
      }

      return Promise.reject(error);
    }
  );
};

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => axios.get(url, params).then(responseBody),
  post: (url, data) => axios.post(url, data).then(responseBody),
  put: (url, data) => axios.put(url, data).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Articles = {
  list: (params) => requests.get("/articles", { params: params }),
  create: (data) => requests.post("/articles", data),
  update: (data) => requests.put("/articles", data),
  getById: (id) => requests.get("/articles/" + id),
  deleteById: (id) => requests.del("/articles/" + id),
  upload: (data) =>
    requests.post("/articles/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

const Languages = {
  list: (params) => requests.get("/language", { params: params }),
  create: (data) => requests.post("/language", data),
  update: (data) => requests.put("/language", data),
  deleteById: (id) => requests.del("/language/" + id),
};

const Topics = {
  list: (params) => requests.get("/topic", { params: params }),
  create: (name) => requests.post("/topic", name),
  update: (data) => requests.put("/topic", data),
  deleteById: (id) => requests.del("/topic/" + id),
};

const agent = {
  Articles,
  Topics,
  Languages,
};

export default agent;
