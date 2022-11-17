<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle.searchBar> 조건 선택 </b-button>
    </div>

    <b-collapse id="searchBar">
      <b-card title="conditions">
        <b-row class="mt-4 mb-4 text-center">
          <b-col cols="3">
            <b-form-select
              v-model="sido"
              :options="sidos"
              value-field="sidoCode"
              text-field="sidoName"
              @change="getGuguns(sido)"
            ></b-form-select>
          </b-col>
          <b-col cols="3">
            <b-form-select
              v-model="gugun"
              :options="guguns"
              value-field="gugunCode"
              text-field="gugunName"
            ></b-form-select>
          </b-col>
          <!-- <b-col cols="3">
            <b-form-select
              v-model="dong"
              :options="dongs"
              value-field="dongCode"
              text-field="dongName"
            ></b-form-select>
          </b-col> -->
          <b-col cols="3">
            <b-button @click="getAptList()">검색</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "ApartSearchBar",
  data() {
    return {
      sidos: [],
      guguns: [],
      dongs: [],
      aparts: [],
      sido: null,
      gugun: null,
      dong: null,
    };
  },
  created() {
    http.get("/map/sido").then(({ data }) => {
      this.sidos = data;
    });
  },
  methods: {
    getGuguns(sidoCode) {
      http.get(`/map/gugun?sido=${sidoCode}`).then(({ data }) => {
        this.guguns = data;
      });
    },
    getAptList() {
      http.get(`/map/aptlist/${this.gugun}/202110`).then(({ data }) => {
        this.aparts = data.response.body.items.item;
        this.$emit("getApartList", this.aparts);
      });
    },
  },
};
</script>

<style></style>
