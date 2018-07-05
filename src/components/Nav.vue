<template>
    <div>
        <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    </div>
</template>


<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>


