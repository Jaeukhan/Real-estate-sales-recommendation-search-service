import { apiInstance } from "./index";

const api = apiInstance();
//getSchoolList
function getMartlist(gugunName, gugunCode, success, fail) {
  api.get(`/mart/${gugunName}/${gugunCode}`).then(success).catch(fail);
}

export { getMartlist };
