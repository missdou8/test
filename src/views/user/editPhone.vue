<template>
    <div id="editPhone">
      <van-cell-group>
        <van-field v-model="phone" placeholder="请输入您的手机号" />
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: ""
    };
  },
  created() {
    this.phone = this.$route.query.phone;
  },
  methods: {}
};
</script>


<style scoped>
#editPhone {
  height: 100%;
}
</style>

