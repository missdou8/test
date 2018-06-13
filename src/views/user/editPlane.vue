<template>
    <div id="editPlane">
      <van-cell-group>
        <van-field v-model="plane" placeholder="请输入您的座机号" />
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plane: ""
    };
  },
  created() {
    this.plane = this.$route.query.plane;
  },
  methods: {}
};
</script>


<style scoped>
#editPlane {
  height: 100%;
}
</style>

