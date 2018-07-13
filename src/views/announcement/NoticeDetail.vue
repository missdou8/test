<template>
  <div id="notice_detail">
    <h1>{{data.title}}</h1>
    <p v-html="data.content"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  created() {
    this.http.notice
      .noticeDetail({
        id: this.$route.query.id
      })
      .then(res => {
        this.data = res.data;
      });
  }
};
</script>

<style scoped>
#notice_detail {
  background-color: #fff;
}
.notice_detail img {
  width: 100%;
}
</style>

