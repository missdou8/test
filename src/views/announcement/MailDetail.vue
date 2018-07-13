<template>
  <div id="detail">
    <h1>{{mail.title}}</h1>
    <p v-html="mail.content"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mail: {}
    };
  },
  created() {
    this.http.notice
      .mailNotification({
        id: this.$route.query.id
      })
      .then(res => {
        this.mail = res.data;
      });
  }
};
</script>

<style scoped>
#detail {
  background-color: #fff;
  padding: 0.2rem;
}
#detail p {
  margin-top: 0.3rem;
  text-indent: 2em;
}
#detail img {
  width: 100%;
}
</style>


