<template>
  <div>
    <apart-search-bar></apart-search-bar>
    <KakaoMap />
    <b-container v-if="aparts && aparts.length > 0" class="bv-example-row mt-3">
      <b-row>
        <b-table
          hover
          :items="aparts"
          :fields="fields"
          id="aptlist-table"
          :per-page="perPage"
          :current-page="currentPage"
        ></b-table>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="aptlist-table"
        ></b-pagination>
      </b-row>
    </b-container>
    <b-container v-else>
      <b-row style="padding: 10px">
        <b-col><b-alert show>조건에 해당하는 매물이 없습니다!</b-alert></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ApartSearchBar from "@/components/map/ApartSearchBar.vue";
import KakaoMap from "@/components/map/KakaoMap";
import { mapState } from "vuex";

const mapStore = "mapStore";

export default {
  name: "ApartList",
  components: {
    ApartSearchBar,
    KakaoMap,
  },
  data() {
    return {
      fields: [
        { key: "일련번호" },
        { key: "아파트", label: "아파트 이름" },
        { key: "법정동" },
        { key: "도로명", label: "도로명 주소" },
        { key: "거래금액", label: "거래금액(단위: 만 원)" },
      ],
      currentPage: 1,
      rows: 0,
      perPage: 10,
    };
  },
  computed: {
    ...mapState(mapStore, ["aparts"]),
  },
};
</script>

<style></style>
