import axios from "axios";

import { getItem } from "../utils/storage.js";

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  Authorization: `Bearer ${getItem("hcp-app")?.token}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const multiFormheaders = {
  Authorization: `Bearer ${getItem("hcp-app")?.token}`,
  "Content-Type": "multipart/form-data",
};

export const post = async (url, body, isPrivate = true) =>
  await axios.post(`${API_URL}/${url}/`, body, isPrivate ? { headers } : "");
export const put = async (url, body) =>
  await axios.put(`${API_URL}/${url}`, body, { headers });
export const get = async (url) =>
  await axios.get(`${API_URL}/${url}`, { headers });
export const destroy = async (url) =>
  await axios.delete(`${API_URL}/${url}`, { headers });

export const postMultiForm = async (url, formData) =>
  await axios.post(`${API_URL}/${url}/`, formData, {
    headers: multiFormheaders,
  });

export const putMultiForm = async (url, formData) =>
  await axios.put(`${API_URL}/${url}/`, formData, {
    headers: multiFormheaders,
  });
