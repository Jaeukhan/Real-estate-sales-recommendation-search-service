<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle.searchBar> 매물 찾기 </b-button>
    </div>

    <b-collapse id="searchBar">
      <b-card title="conditions">
        <b-row class="mt-4 mb-4 text-center">
          <b-col>
            <b-form-select v-model="sido" :options="sidos" @change="getGuguns()"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="gugun" :options="guguns"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="year" :options="yearList"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="month" :options="monthList"></b-form-select>
          </b-col>

          <b-col>
            <b-button @click="getAptList()">검색</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

const mapStore = "mapStore";

export default {
  name: "ApartSearchBar",
  data() {
    return {
      yearList: ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
      monthList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      sido: null,
      gugun: null,
      year: null,
      month: null,
    };
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_APT_LIST();
    this.getSido(); //시도정보 불러오기(db)
  },
  computed: {
    ...mapState(mapStore, ["sidos", "guguns", "aparts"]),
    sidoName: function () {
      return this.sidos.find((option) => option.value === this.sido);
    },
    gugunName() {
      return this.guguns.find((option) => option.value === this.gugun);
    },
  },
  methods: {
    ...mapMutations(mapStore, [
      "SET_SIDO_LIST",
      "SET_GUGUN_LIST",
      "SET_APART_LIST",
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_APT_LIST",
    ]),
    ...mapActions(mapStore, ["getSido", "getGugun", "getApt"]),
    getGuguns() {
      this.CLEAR_GUGUN_LIST();
      this.gugun = null;
      if (this.sido) {
        this.getGugun(this.sido);
      }
    },
    getAptList() {
      if (this.sido && this.gugun && this.year && this.month) {
        let date = this.year + this.month;
        let param = {
          sidoName: this.sidoName.text,
          gugunName: this.gugunName.text,
          gugun: this.gugun,
          date: date,
        };
        this.getApt(param);
      }
    },
  },
};
</script>

<style></style>
