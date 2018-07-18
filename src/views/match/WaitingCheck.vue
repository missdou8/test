<template>
    <div class="waiting">
        <img src="../../assets/waiting.png" alt="等待审核">
        <p>{{title}}</p>
        <p>已提交，待审核</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.query.title
    };
  },
  mounted() {
    let isEdit = this.$route.query.isEdit;
    setTimeout(() => {
      if (isEdit) {
        this.$router.go(-4);
      } else {
        this.$router.go(-3);
      }
    }, 2000);
  }
};
</script>


<style scoped>
.waiting {
  padding-top: 0.8rem;
  text-align: center;
}
.waiting img {
  width: 2.5rem;
}
</style>
