<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-secondary" @click="moveWrite()"
          >Write</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-table
        striped
        hover
        :items="articles"
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
    </b-row>
    <b-row class="justify-content-md-center" style="padding-bottom: 10em">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="boardlist-table"
      ></b-pagination>
    </b-row>
    <!-- 인기글 목록 -->
    <b-row>
      <b-row>
        <h5 style="font-family: 'Titan One', monospace; padding-left: 1em">
          POPULAR<b-icon-pencil animation="cylon"></b-icon-pencil>
        </h5>
      </b-row>
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
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";
import { mapState, mapActions } from "vuex";
const boardStore = "boardStore";
export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      currentPage: 1,
      rows: 0,
      perPage: 10,
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    // this.CLEAR_POPULAR_BOARD();
    listArticle(
      param,
      ({ data }) => {
        this.articles = data;
        // console.log(data);
        this.rows = this.articles.length;
      },
      (error) => {
        console.log(error);
      }
    );
    this.clearPopularBoard();
    this.getPopularBoard();
  },
  methods: {
    ...mapActions(boardStore, ["getPopularBoard", "clearPopularBoard"]),
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boarddetail",
        params: { articleno: article.articleno },
      });
    },
  },
  computed: {
    ...mapState(boardStore, ["popular_board"]),
  },
};
</script>

<style scoped>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 450px;
  text-align: left;
}
img {
  width: 300px;
  height: 200px;
}
</style>
