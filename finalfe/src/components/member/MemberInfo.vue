<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 600px"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-black">
                Hello, {{ memberInfo.username }}
              </h1>
              <b-card>
                <p class="text-black mt-0 mb-5">
                  등록된 관심 키워드가 없습니다! 관심 키워드를 등록하고 맞춤
                  매물을 추천받아보세요!
                </p>
              </b-card>
            </b-col>
            <b-col lg="3" md="10">
              <img src="../../assets/main.png" alt="" />
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <!-- 사용자 프로필 -->
        <b-col class="m-3">
          <b-card no-body class="card-profile" alt="Image placeholder" img-top>
            <b-row class="justify-content-center">
              <b-col lg="3" class="order-lg-2"> </b-col>
            </b-row>

            <b-card-header
              class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                <b-button
                  @click="moveModify"
                  variant="outline-info"
                  style="float: right"
                  ><b-icon-pencil-square font-scale="1.2"></b-icon-pencil-square
                ></b-button>
              </div>
            </b-card-header>

            <b-card-body class="pt-0">
              <b-row>
                <b-col>
                  <div
                    class="
                      card-profile-stats
                      d-flex
                      justify-content-center
                      mt-md-5
                    "
                  >
                    <div>관심 키워드 여기다?</div>
                  </div>
                </b-col>
              </b-row>
              <div class="text-center">
                <h5 class="h3">
                  {{ memberInfo.userid }}
                </h5>
                <div class="h5 mt-4">회원 정보 설명설명</div>
                <div>주소같은거 표시표시</div>
                <hr class="my-4" />
                <p>추천 매물 보러갈랭?</p>
                <a href="#">고고</a>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <!-- 관심 키워드 설정하러 가기 -->
        <b-col xl="8" class="order-xl-1">
          <b-card bg-variant="light" title="Card Title">
            <b-card-text> 관심 키워드: 원 투 쓰리 </b-card-text>
            <b-button v-b-modal.modal-1>추가</b-button>
            <!-- 모달창 - 관심 키워드 체크 -->
            <b-modal id="modal-1" title="BootstrapVue">
              <!-- 교통수단 -->
              <b-form-group
                label="이동 시 어떤 교통수단을 이용하시나요?"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-1"
                >
                  <b-form-checkbox value="car">자가용</b-form-checkbox>
                  <b-form-checkbox value="transport">대중교통</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <!-- 자녀 유무 -->
              <b-form-group
                label="자녀가 있으신가요?"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-2"
                >
                  <b-form-checkbox value="child1">유치원생</b-form-checkbox>
                  <b-form-checkbox value="child2">초등학생</b-form-checkbox>
                  <b-form-checkbox value="child3">중학생</b-form-checkbox>
                  <b-form-checkbox value="child4">고등학생</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <!-- 주거유형 -->
              <b-form-group
                label="어떤 주거 유형을 선호하시나요?"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-2"
                >
                  <b-form-checkbox value="apt">아파트</b-form-checkbox>
                  <b-form-checkbox value="house">주택</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <!-- 인프라 -->
              <b-form-group
                label="자주 가는 장소가 어디인가요?"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-2"
                >
                  <b-form-checkbox value="library">도서관</b-form-checkbox>
                  <b-form-checkbox value="cafe">마트</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-modal>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <!-- 관심 매물 -->
        <b-col xl="8" class="order-xl-1">
          <div>
            <b-card
              body-class="text-center"
              header-tag="nav"
            >
              <template #header>
                <b-nav card-header tabs>
                  <b-nav-item active>좋아요 표시한 매물 리스트</b-nav-item>
                  <b-button style="margin: 5px;" class="sm" @click="toggle('a')">Apart</b-button>
                  <b-button style="margin: 5px;" class="sm" @click="toggle('h')">House</b-button>
                </b-nav>
              </template>
              <b-card-body v-if="isApt==='a'">
                        <b-row v-if="apartlist && apartlist.length > 0">
                        <b-table
                            hover
                            :items="apartlist"
                            :fields="aptfields"
                            id="aptlist-table"
                            :per-page="perPage"
                            :current-page="currentPage"
                            >
                            <template #cell(삭제)="row">
                                <b-button size="sm" @click="removeApt(row.item.aptid)" class="mr-2">
                                    <b-icon icon="trash"></b-icon>
                                </b-button>
                            </template>
                        </b-table>
                        </b-row>
                        <b-row v-else>
                          <div>
                            추가한 관심 매물이 없습니다! 관심 매물을 추가하고 한 눈에
                            모아보세용
                          </div>
                        </b-row>
                            <b-row class="justify-content-md-center">
                                <b-pagination
                                    v-model="currentPage"
                                    pills
                                    :total-rows="apartlist.length"
                                    :per-page="perPage"
                                    aria-controls="boardlist-table"
                                ></b-pagination>
                            </b-row>
                    </b-card-body>
              <b-card-body v-else>
                <b-row v-if="houselist && houselist.length > 0">
                  <b-table
                    hover
                    :items="houselist"
                    :fields="housefields"
                    id="aptlist-table"
                    :per-page="perPage"
                    :current-page="currentPage"
                  >
                    <template #cell(삭제)="row">
                      <b-button
                        size="sm"
                        @click="removeHouse(row.item.houseid)"
                        class="mr-2"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </template>
                  </b-table>
                </b-row>
                <b-row v-else>
                <div>
                  추가한 관심 매물이 없습니다! 관심 매물을 추가하고 한 눈에
                  모아보세용
                </div>
              </b-row>
                <b-row class="justify-content-md-center">
                  <b-pagination
                    v-model="currentPage"
                    pills
                    :total-rows="houselist.length"
                    :per-page="perPage"
                    aria-controls="boardlist-table"
                  ></b-pagination>
                </b-row>
              </b-card-body>
              <b-button variant="primary" @click="moveMap"
                >다른 매물 둘러보기</b-button
              >
            </b-card>
          </div>
        </b-col>
        <!-- 사용자 게시판 글 목록 -->
        <b-col xl="4" class="order-xl-2 mb-5">
          <b-card no-body class="card-profile" alt="Image placeholder" img-top>
            <b-row class="justify-content-center">
              <b-col lg="3" class="order-lg-2"> </b-col>
            </b-row>

            <b-card-header
              class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between"></div>
            </b-card-header>

            <b-card-body class="pt-0">
              <b-row>
                <b-col lg="20">
                  <div
                    class="
                      card-profile-stats
                      d-flex
                      justify-content-center
                      mt-md-5
                    "
                  >
                    <h5 class="h3">작성한 게시물</h5>
                  </div>
                </b-col>
              </b-row>
              <div class="text-center">
                <b-table
                  hover
                  :items="user_board"
                  :fields="bfields"
                  @row-clicked="viewArticle"
                  id="boardlist-table"
                  :per-page="perPage"
                  :current-page="currentPage"
                >
                  <template #cell(subject)="data">
                    <router-link
                      :to="{
                        name: 'boarddetail',
                        params: { articleno: data.item.articleno },
                      }"
                    >
                      {{ data.item.subject }}
                    </router-link>
                  </template>
                </b-table>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-card bg-variant="dark" text-variant="white" title="Card Title">
          <b-card-text> 관심 키워드: 원 투 쓰리 </b-card-text>
          <b-button href="#" variant="primary">추가?</b-button>
        </b-card>
      </b-row> -->
    </b-container>
  <br>
  <br>
  <br>
  <br>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
const favoriteStore = "favoriteStore";
const boardStore = "boardStore";

export default {
  name: "MemberInfo",
  data() {
    return {
      aptfields: [
          { key: "aptname", label: "아파트이름"},
          { key: "aptaddress", label: "위치"},
          "삭제",
      ],
      housefields: [
        { key: "housetype", label: "주택유형" },
        { key: "houseaddress", label: "위치" },
        "삭제",
      ],
      bfields: [
        { key: "hit", label: "조회수", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
      ],
      currentPage: 1,
      perPage: 5,
      isApt: "a",
    };
  },
  create() {
    let token = sessionStorage.getItem("access-token");
    this.getMemberInfo(token);
  },

  created() {
    this.CLEAR_USER_BOARD();
    this.getHouseList(this.memberInfo.userid);
    this.getAptList(this.memberInfo.userid);
    this.getUserBoard(this.memberInfo.userid);
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
    ...mapState(boardStore, ["user_board"]),
    ...mapState(favoriteStore, ["apartlist", "houselist", "rows"]),
  },
  methods: {
    ...mapMutations(boardStore, ["CLEAR_USER_BOARD"]),
    ...mapActions(memberStore, ["getMemberInfo"]),
    ...mapActions(favoriteStore, ["getHouseList", "removeFavoriteHouse", "getAptList", "removeFavoriteApt"]),
    ...mapActions(boardStore, ["getUserBoard"]),
    moveModify() {
      this.$router.push({ name: "memberModify" });
    },
    moveMap() {
      this.$router.push({ name: "MapList" });
    },
    viewArticle(article) {
      console.log("view", article.articleno);
      this.$router.push({
        name: "boarddetail",
        params: { articleno: article.articleno },
      });
    },
    removeApt(aptid) {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removeFavoriteApt(aptid, this.memberInfo.userid);
        alert("삭제되었습니다!");
        this.$router.go();
      } else {
        alert("삭제가 취소되었습니다!");
      }
    },
    removeHouse(houseid) {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removeFavoriteHouse(houseid, this.memberInfo.userid);
        alert("삭제되었습니다!");
        this.$router.go();
      } else {
        alert("삭제가 취소되었습니다!");
      }
    },
    toggle(word) {
      this.isApt = word;
    },
  },
};
</script>
