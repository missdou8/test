<template>
    <div id="editShop">
      <h3 class="title">2~10个字符</h3>
      <van-cell-group>
        <van-field v-model="shop_name" placeholder="请输入商铺名称" />
      </van-cell-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shop_name: ""
    };
  },
  created() {
    this.shop_name = this.$route.query.shop_name;
  },
  methods: {}
};
</script>


<style scoped>
#editShop {
  height: 100%;
}
.title {
  padding: 10px 15px;
}
</style>

