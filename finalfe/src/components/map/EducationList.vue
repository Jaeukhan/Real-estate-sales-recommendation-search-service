<template>
  <div>
    <div>
      <b-button class="m-3" v-b-toggle.edc> 주변 교육 시설 찾기 </b-button>
    </div>
    <b-collapse id="edc">
      <b-card title="주변 학교 찾기" class="mb-2">
        <b-row class="mt-4 mb-4 text-center">
          <b-col>
            <b-form-select v-model="sch" :options="schools" @change="getGuguns()"></b-form-select>
          </b-col>
          <b-col>
            <b-button @click="getSchList()">검색</b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-button class="m-1" @click="movelocation">유치원</b-button>
      <b-button class="m-1" @click="movelocation">초등학교</b-button>
      <b-button class="m-1" @click="movelocation">중학교</b-button>
      <b-button class="m-1" @click="movelocation">고등학교</b-button>
      <b-container v-if="selectedsch && selectedsch.length > 0" class="bv-example-row mt-3">
        <b-row>
          <b-table
            hover
            :items="selectedsch"
            :fields="fields"
            id="schlist-table"
            :per-page="perPage"
            :current-page="currentPage"
            @row-clicked="moveloc"
          ></b-table>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-pagination
            v-model="currentPage"
            pills
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="schlist-table"
          ></b-pagination>
        </b-row>
      </b-container>
    </b-collapse>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const mapStore = "mapStore";
export default {
  data() {
    return {
      fields: [
        { key: "REFINE_ROADNM_ADDR", label: "주소" },
        { key: "FACLT_NM", label: "시설 이름" },
      ],
      schools: [{ value: null, text: "학교 선택" }, "유치원", "초등학교", "중학교", "고등학교"],
      sch: null,
      currentPage: 1,
      rows: 0,
      perPage: 10,
    };
  },
  name: "EducationList",
  props: ["cup"],
  methods: {
    ...mapActions(mapStore, ["getKinder", "getSchool"]),
    getSchList() {
      if (this.sch) {
        if (this.sch == "유치원") {
          this.getKinder();
        } else if (this.sch == "초등학교") {
          this.getSchool(this.sch);
        } else if (this.sch == "중학교") {
          this.getSchool(this.sch);
        } else if (this.sch == "고등학교") {
          this.getSchool(this.sch);
        }
      }
    },
    moveloc(apart) {
      console.log(apart);
      //   this.getAptOne(apart);
    },

    movelocation() {
      console.log("move", this.selectedsch);
      this.cup.$emit("move", this.selectedsch[0].REFINE_ROADNM_ADDR);
    },
  },
  computed: {
    ...mapState(mapStore, ["selectedsch"]),
  },
};
</script>

<style></style>
