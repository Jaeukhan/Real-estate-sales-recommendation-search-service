import { apiInstance } from "./index.js";

const api = apiInstance();
function listAvgPrice(name, success, fail) {
  api.get(`/chart`, name).then(success).catch(fail);
}
export { listAvgPrice };
