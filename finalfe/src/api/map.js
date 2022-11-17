import { apiInstance } from "./index";

const api = apiInstance();
// const apartapi = apartInstance();

function getSidoCode(success, fail) {
    api.get("/map/sido").then(success).catch(fail);
}

function getGugunsCode(param, success, fail) {
    api.get(`/map/gugun`, {params: param}).then(success).catch(fail);
}

function getApartList(param, gCode, date, success, fail) {
    api.get(`/map/aptlist/${gCode}/${date}`, {params: param}).then(success).catch(fail);
}

export { getSidoCode, getGugunsCode, getApartList };
