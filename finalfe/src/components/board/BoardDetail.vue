<template>
  <b-container class="bv-example-row mt-3">
   <b-row class="mt-4 mb-4 text-center">
    <b-col>
    <h5>NO.{{ article.articleno }}</h5>
    </b-col>
   </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList"><b-icon icon="list" font-scale="0.9"></b-icon></b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2"><b-icon-pencil-square font-scale="1.2"></b-icon-pencil-square></b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"><b-icon-trash-fill font-scale="1.2"></b-icon-trash-fill></b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3> ${article.subject}</h3>
                          <div>조회수: ${article.hit}</div>
                          <div>작성자: ${article.userid}</div>
                          <div>작성 일시: ${article.regtime}</div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <br>
    <br>
    <br>
    <b-row>
      <b-col>
        <b-form class="text-left">
          <b-form-group label-for="comment">
            <b-form-input
              @keydown.enter="cregist"
              id="comment"
              v-model="ccontent"
              required
              placeholder="COMMENT :"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="2">
        <b-button @click="cregist" style="background-color: rgba(94, 100, 114, 0.4)"><b-icon-clipboard-check></b-icon-clipboard-check></b-button>
      </b-col>
    </b-row>
    <b-row v-if="comment_list.length">
      <b-col>
        <b-card border-variant="dark">
          <b-card-body class="text-left">
            <b-table :items="comment_list" :fields="fields"> </b-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";

export default {
  name: "BoardDetail",
  data() {
    return {
      comment_list: [],
      article: {},
      ccontent: "",
      fields: [
        { key: "cno", label: "댓글번호" },
        { key: "cwriter", label: "작성자" },
        { key: "ccontent", label: "내용" },
      ],
    };
  },
  computed: {
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      http
        .get(`/board/${this.$route.params.articleno}`)
        .then(({ data }) => {
          //   console.log(data);
          this.article = data;
        })
        .then(() => {
          http.get(`/comment/list/${this.article.articleno}`).then(({ data }) => {
            console.log(data);
            this.comment_list = data;
          });
        });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    cregist() {
      http
        .post(`/comment/write`, {
          articleno: this.article.articleno,
          cwriter: this.article.userid,
          ccontent: this.ccontent,
        })
        .then(({ data }) => {
          console.log(data);
          // this.comment_list = data;
          this.getComments();
        });
      this.ccontent = "";
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>
.card-header > h3 {
  background-color: rgba(94, 100, 114, 0.3);
  color: balck;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
}
</style>
