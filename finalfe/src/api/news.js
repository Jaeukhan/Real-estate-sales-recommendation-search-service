import { apiInstance } from "./index.js";

const api = apiInstance();
function getNewsList(success, fail) {
  api.get(`/news/read`).then(success).catch(fail);
}

function newsInit(success, fail) {
  console.log("안으로");
  api.get(`/news`).then(success).catch(fail);
}

export { getNewsList, newsInit };
