import { apiInstance } from "./index";

const api = apiInstance();
//getSchoolList
function getKinderList(param, gugunCode, gugunName, success, fail) {
  api.get(`/edu/kinder/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}
function getElement(param, gugunCode, gugunName, success, fail) {
  api.get(`/edu/element/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}
function getMiddle(param, gugunCode, gugunName, success, fail) {
  api.get(`/edu/middle/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}
function getHigh(param, gugunCode, gugunName, success, fail) {
  api.get(`/edu/high/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}

export { getKinderList, getElement, getMiddle, getHigh };
