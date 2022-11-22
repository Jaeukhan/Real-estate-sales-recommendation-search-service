<template>
  <b-container class="bv-example-row mt-3 text-center" id="home">
    <br />
    <br />
    <b-row>
      <b-col class="justify-content-md-center">
        <b-row>
          <div>
            <b-card title="SSAFY BOARD" tag="article" style="width: 450px" class="mb-2">
              <b-card-text> Board & Comment </b-card-text>

              <b-button href="/board" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
            </b-card>
          </div>
        </b-row>
        <b-row>
          <div>
            <b-card title="USER" tag="article" style="width: 450px" class="mb-2">
              <b-card-text> Be our user! </b-card-text>

              <b-button href="/member" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
            </b-card>
          </div>
        </b-row>
        <b-row>
          <div>
            <b-card title="FIND APARTMENT" tag="article" style="width: 450px" class="mb-2">
              <b-card-text> Find your dream house! </b-card-text>

              <b-button href="/map" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
            </b-card>
          </div>
        </b-row>
      </b-col>

      <!-- 사용자 게시판 글 목록 -->
      <b-col xl="6" class="order-xl-2 mb-5">
        <b-card no-body class="card-profile" alt="Image placeholder" img-top>
          <b-row class="justify-content-center">
            <b-col lg="3" class="order-lg-2"> </b-col>
          </b-row>

          <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div class="d-flex justify-content-between"></div>
          </b-card-header>

          <b-card-body class="pt-0">
            <b-row>
              <b-col lg="20">
                <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                  <h5 class="h3">인기 게시물</h5>
                </div>
              </b-col>
            </b-row>
            <div class="text-center">
              <b-table
                hover
                :items="popular_board"
                :fields="fields"
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
    <b-row align-h="center">
      <!-- Text slides with image -->
      <b-col class="justify-content-md-center" cols="8">
        <div>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide v-for="(item, idx) in news_list" :key="idx" :img-src="require(`@/assets/news${idx}.png`)">
              <div class="p-2" style="background-color: white">
                <a :href="`https://land.naver.com${item.link}`">{{ item.title }}</a>
              </div>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getNewsList, newsInit } from "@/api/news";
import { mapState, mapActions, mapMutations } from "vuex";
// import { getImage } from "@/api/naver";

const boardStore = "boardStore";
export default {
  name: "HomeView",
  data() {
    return {
      news_list: [],
      slide: 0,
      sliding: null,
      cimg: "",
      fields: [
        { key: "subject", label: "제목" },
        { key: "userid", label: "글쓴이" },
        { key: "regtime", label: "작성일" },
      ],
      currentPage: 1,
      perPage: 5,
    };
  },
  created() {
    this.CLEAR_POPULAR_BOARD();
    this.getPopularBoard();
    newsInit(
      () => {
        getNewsList(
          ({ data }) => {
            // console.log(data);
            this.news_list = data;
          },
          (error2) => {
            console.log(error2);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
    //     http.get("/news").then(() => {
    //   http.get("/news/read").then(({ data }) => {
    //     this.news_list = data;
    //   });
    // }
    // let param = "아파트";
    // getImage(
    //   param,
    //   ({ data }) => {
    //     console.log(data);
    //     this.cimg = data.items[0].link;
    //     // this.news_list = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  },
  methods: {
    ...mapMutations(boardStore, ["CLEAR_POPULAR_BOARD"]),
    ...mapActions(boardStore, ["getPopularBoard"]),
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  computed: {
    ...mapState(boardStore, ["popular_board"]),
  },
};
</script>

<style>
img {
  width: 500px;
  height: 400px;
}
</style>
