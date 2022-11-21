import { apiInstance } from "./index";

const api = apiInstance();
//getSchoolList
function getParkingList(param, gugunName, gugunCode, success, fail) {
  api.get(`/parking/${gugunName}/${gugunCode}`, { params: param }).then(success).catch(fail);
}

export { getParkingList };
