<template>
  <div class="nav">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
  </div>
</template>


<script>
export default {
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>



