<template>
  <div>
    <apart-search-bar @getApartList="getApartList"></apart-search-bar>
    <b-container v-if="items.length>0" class="bv-example-row mt-3">
      <b-row>
      <b-table hover :items="items" :fields="fields" id="aptlist-table" :per-page="perPage" :current-page="currentPage"></b-table>
      </b-row>
      <b-row class="justify-content-md-center">
      <b-pagination v-model="currentPage" pills :total-rows="rows" :per-page="perPage" aria-controls="aptlist-table"></b-pagination>
    </b-row>
    </b-container>
    <b-container v-else>
      <b-row style="padding: 10px">
        <b-col><b-alert show>아파트 목록 없음</b-alert></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ApartSearchBar from "@/components/map/ApartSearchBar.vue";

export default {
  name: "ApartList",
  components: {
    ApartSearchBar,
  },
  data() {
    return {
      fields: [
        { key: "aptCode", label: "일련번호" },
        { key: "aptName", label: "아파트 이름" },
        { key: "jibun", label: "지번 주소" },
        { key: "recentPrice", label:"거래 금액" },
      ],
      items: [],
      currentPage: 1,
      rows: 0,
      perPage: 10,
    };
  },
  methods: {
    getApartList(value) {
      this.items = value;
      this.rows = this.items.length;
    },
  },
};
</script>

<style>

</style>