<template>
    <div id="editShop">
      <h3 class="title">2-10个字符哦~</h3>
      <van-cell-group>
        <van-field v-model="shopName" placeholder="请输入商铺名称" />
      </van-cell-group>
      <dida-btn :btn-enable="btnEnable" :type="1" :dataList="{'shopName': shopName}" :detection-list="detection"></dida-btn>
    </div>
</template>

<script>
import didaBtn from "../../../components/didaBtn.vue";
export default {
  data() {
    return {
      shopName: "",
      detection:{
        "name":"shopName",
        "reg":/^.{2,10}$/,
        "msg":"需要输入2-10个字符哦~"
      }
    };
  },
  computed: {
    btnEnable() {
      if (this.shopName) return false;
      return true;
    }
  },
  components: {
    didaBtn
  },
  created() {
    this.shopName = this.$route.query.shopName;
  },
  methods: {}
};
</script>


<style scoped>
.title {
  padding: 0 15px;
  line-height: 0.65rem;
}
</style>

