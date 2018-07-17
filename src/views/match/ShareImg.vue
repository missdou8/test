<template>
    <div id="share-img">
        <van-uploader class="append_img" :after-read="append">
        </van-uploader>
    </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      let contain = document.querySelector("#share-img");
      let input = contain.querySelector(".van-uploader__input");
      console.log(input);
      input.click();
    });
  },
  methods: {
    append() {}
  }
};
</script>


<style scoped>
#share-img {
  overflow: hidden;
  position: relative;
}
.append_img {
  opacity: 0;
  position: absolute;
  top: 1000px;
  left: 1000px;
}
</style>
