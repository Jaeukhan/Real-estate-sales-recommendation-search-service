<template>
  <div>
    <b-row>
      <b-table
        hover
        :items="aparts"
        :fields="fields"
        id="aptlist-table"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(자세히보기)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            <b-icon icon="info-circle"></b-icon>
          </b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="6"><b>일련번호 </b></b-col>
              <b-col>{{ row.item.일련번호 }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="6"><b>도로명 주소 </b></b-col>
              <b-col>{{ row.item.도로명 }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="6"><b>층 수 </b></b-col>
              <b-col>{{ row.item.층 }}층</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="6"><b>거래금액 </b></b-col>
              <b-col>{{ row.item.거래금액 }},000 원</b-col>
            </b-row>
            <b-button size="sm" @click="addFavoriteApt(row.item)"><b-icon icon="heart"></b-icon></b-button>
          </b-card>
        </template>
        <template #cell(지도보기)="mapRow">
          <b-button size="sm" @click="moveloc(mapRow.item)" class="mr-2">
            <b-icon icon="pin-map"></b-icon>
          </b-button>
        </template>
      </b-table>
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
  </div>
</template>

<script>
import { addApt } from "@/api/favorite";
import { mapState, mapActions } from "vuex";

const mapStore = "mapStore";
const memberStore = "memberStore";

export default {
  name: "ApartList",
  data() {
    return {
      fields: [{ key: "아파트", label: "아파트 이름" }, { key: "법정동" }, "자세히보기", "지도보기"],
      currentPage: 1,
      rows: 0,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(mapStore, ["getAptOne"]),
    moveloc(apart) {
      this.getAptOne(apart);
    },
    addFavoriteApt(apt) {
      let param = {
        userid: this.memberInfo.userid,
        aptcode: apt.일련번호,
        aptaddress: apt.도로명,
        aptprice: apt.거래금액,
        aptname: apt.아파트,
        aptfloor: apt.층,
      };
      addApt(
        param,
        ({ data }) => {
          let msg = "오류 발생";
          if (data === "success") {
            msg = "관심 매물에 등록되었습니다!";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(mapStore, ["aparts"]),
    ...mapState(memberStore, ["memberInfo"]),
  },
};
</script>
