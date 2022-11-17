import { apiInstance } from "./index.js";

const api = apiInstance();
function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success1, success2, fail) {
  api.get(`/board/${articleno}`).then(success1).then(success2).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}

function writeComment(param, success, fail) {
  api.post(`/comment/write`, param).then(success).catch(fail);
}

function getComment(articleno, success) {
  api.get(`/comment/list/${articleno}`).then(success);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle, writeComment, getComment };