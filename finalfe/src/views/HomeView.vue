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
      <b-col class="justify-content-md-center">
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
            <!-- Text slides with image -->
            <b-carousel-slide v-for="(item, idx) in news_list" :key="idx" :img-src="require(`@/assets/news${idx}.png`)">
              <div class="p-2" style="background-color: white">
                <a :href="`https://land.naver.com${item.link}`">{{ item.title }}</a>
              </div>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <div>
        <img :src="cimg" alt="" />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { getNewsList, newsInit } from "@/api/news";
import { getImage } from "@/api/naver";
export default {
  name: "HomeView",
  data() {
    return {
      news_list: [],
      slide: 0,
      sliding: null,
      cimg: "",
    };
  },
  created() {
    newsInit(
      () => {
        getNewsList(
          ({ data }) => {
            console.log(data);
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
    let param = "아파트";
    getImage(
      param,
      ({ data }) => {
        console.log(data);
        this.cimg = data.items[0].link;
        // this.news_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style>
img {
  width: 500px;
  height: 400px;
}
</style>
