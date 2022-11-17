<template>
  <b-container class="bv-example-row mt-3 text-center" id="home">
    <br>
    <br>
    <b-row>
    <b-col class="justify-content-md-center">
    <b-row>
      <div>
        <b-card
          title="SSAFY BOARD"
          tag="article"
          style="width: 450px;"
          class="mb-2"
        >
          <b-card-text>
            Board & Comment
          </b-card-text>

          <b-button href="/board" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
        </b-card>
      </div>
    </b-row>
    <b-row>
      <div>
        <b-card
          title="USER"
          tag="article"
          style="width: 450px;"
          class="mb-2"
        >
          <b-card-text>
            Be our user!
          </b-card-text>

          <b-button href="/user" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
        </b-card>
      </div>
    </b-row>
    <b-row>
      <div>
        <b-card
          title="FIND APARTMENT"
          tag="article"
          style="width: 450px;"
          class="mb-2"
        >
          <b-card-text>
            Find your dream house!
          </b-card-text>

          <b-button href="/map" variant="primary"><b-icon-door-open></b-icon-door-open></b-button>
        </b-card>
      </div>
    </b-row>
</b-col>
<b-col class="justify-content-md-center">
      <div >
        <b-card
          header="TODAY'S NEWS"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          style="text-align: center; width: 450px;"
        >
          <div
            v-for="(item, idx) in news_list"
            :key="idx"
            align-h="center"
            align-v="center"
            style="border: 1px solid; border-radius: 10px; margin-bottom: 20px; width: 400px;"
          >
            <b-row>
              <b-col class="m-3"> <img :src="require(`@/assets/news${idx}.png`)" style="width: 300px; height: 200px;"/></b-col>
            </b-row>
            <b-row>
              <b-col class="m-2">
                <a :href="`https://land.naver.com${item.link}`">{{ item.title }}</a>
              </b-col>
            </b-row>
          </div>
        </b-card>
    </div>
    </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "HomeView",
  data() {
    return {
      news_list: [],
    };
  },
  created() {
    http.get("/news").then(() => {
      http.get("/news/read").then(({ data }) => {
        this.news_list = data;
      });
    });
  },
};
</script>

<style>
img {
  width: 500px;
  height: 400px;
}
</style>
