import axios from "axios";

const API = axios.create({
  baseURL: "https://tbackend-production-0a45.up.railway.app/api/items",
});

export const getItems      = ()         => API.get("/").then(r => r.data);
export const getItemById   = (id)       => API.get(`/${id}`).then(r => r.data);
export const createItem    = (data)     => API.post("/", data).then(r => r.data);
export const updateItem    = (id, data) => API.put(`/${id}`, data).then(r => r.data);
export const deleteItem    = (id)       => API.delete(`/${id}`).then(r => r.data);
