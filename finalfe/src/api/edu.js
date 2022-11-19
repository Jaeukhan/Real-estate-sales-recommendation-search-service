import { apiInstance } from "./index";

const api = apiInstance();

function getKinderList(param, gugunName, gugunCode, success, fail) {
  api.get(`/edu/kinder/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}

export { getKinderList };
