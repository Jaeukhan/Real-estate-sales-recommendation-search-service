import axios from "axios";

function houseInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:9999/finalbe",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { houseInstance };
