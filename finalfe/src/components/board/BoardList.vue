<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">Write</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle"
          id="boardlist-table"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(subject)="data">
            <router-link :to="{ name: 'boarddetail', params: { articleno: data.item.articleno } }">
              {{ data.item.subject }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-pagination
        v-model="currentPage"
        pills
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="boardlist-table"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";
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
      currentPate: 1,
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
    listArticle(
      param,
      ({ data }) => {
        this.articles = data;
        this.rows = this.articles.length;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleno },
      });
    },
  },
};
</script>

<style scope>
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
