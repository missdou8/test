<template>
  <div>
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
