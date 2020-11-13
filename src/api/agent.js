import axios from "axios";
import { ApiServerUrl } from "./urls";

axios.defaults.baseURL = ApiServerUrl;

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

export default {
  Articles,
  Topics,
  Languages,
};
