import { apiInstance } from "./index";

const api = apiInstance();
//getSchoolList
function getKinderList(param, gugunName, gugunCode, success, fail) {
  api.get(`/edu/kinder/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}
function getSchoolList(param, sorting, gugunName, gugunCode, success, fail) {
  api.get(`/edu/school/${sorting}/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}

export { getKinderList, getSchoolList };
