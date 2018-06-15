<template>
    <div id="editName">
      <h3 class="title">2~10个字符</h3>
      <van-cell-group>
        <van-field v-model="user_name" placeholder="请输入您的名称" />
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: ""
    };
  },
  created() {
    this.user_name = this.$route.query.user_name;
  },
  methods: {}
};
</script>


<style scoped>
#editName {
  height: 100%;
}
.title {
  padding: 10px 15px;
}
</style>

