<template>
  <div>
    <apart-search-bar></apart-search-bar>
    <kakao-map :cup="bus" />
    <education-list :cup="bus" />
    <div>
        <b-button v-b-toggle.sidebar-1>현지역 과거 부동산 동향 보기</b-button>
        <b-sidebar id="sidebar-1" title="Sidebar" shadow>
          <div class="px-3 py-2">
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
          </div>
        </b-sidebar>
    </div>
    <b-container v-if="aparts && aparts.length > 0" class="bv-example-row mt-3">
      <apt-list></apt-list>
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
import AptList from "@/components/map/AptList.vue";
import KakaoMap from "@/components/map/KakaoMap";
import { mapState } from "vuex";
import EducationList from "./EducationList.vue";
import Vue from "vue";

const mapStore = "mapStore";
var bus = new Vue();

export default {
  name: "MapList",
  components: {
    ApartSearchBar,
    KakaoMap,
    EducationList,
    AptList,
  },
  data() {
    return {
      bus: bus,
    };
  },
  // methods: {
  //   ...mapActions(mapStore, ["getAptOne"]),
  //   moveloc(apart) {
  //     this.getAptOne(apart);
  //   },
  //   addFavoriteApt(apt) {
  //     let param = {
  //       userid: this.memberInfo.userid,
  //       aptcode: apt.일련번호,
  //       aptaddress: apt.도로명,
  //       aptprice: apt.거래금액,
  //       aptname: apt.아파트,
  //       aptfloor: apt.층,
  //     };
  //     addApt(
  //       param,
  //       ({ data }) => {
  //         let msg = "오류 발생";
  //         if (data === "success") {
  //           msg = "관심 매물에 등록되었습니다!";
  //         }
  //         alert(msg);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   },
  // },
  computed: {
    ...mapState(mapStore, ["aparts"]),
    // ...mapState(memberStore, ["memberInfo"]),
  },
};
</script>

<style></style>
