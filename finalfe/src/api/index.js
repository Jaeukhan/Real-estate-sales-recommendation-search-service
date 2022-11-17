import axios from "axios";

function apartInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_APT_DEAL_URL,
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

export { houseInstance, apartInstance };
