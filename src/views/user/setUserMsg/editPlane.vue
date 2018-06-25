<template>
    <div id="editPlane">
      <van-cell-group>
        <van-field v-model="telephone" placeholder="请输入您的座机号" />
      </van-cell-group>
      <dida-btn :btn-enable="btnEnable" :type="1" :dataList="{'telephone': telephone}" :detection-list="detection"></dida-btn>
    </div>
</template>

<script>
import didaBtn from "../../../components/didaBtn.vue";
export default {
  data() {
    return {
      telephone: "",
      detection:{
        "name":"telephone",
        "reg":/^((0[1-9]\d{1,2})-)([1-9]{7,8})(-(\d{3,}))?$/,
        "msg":"请输入正确的座机号"
      }
    };
  },
  computed: {
    btnEnable() {
      if (this.telephone) return false;
      return true;
    }
  },
  components: {
    didaBtn
  },
  created() {
    this.telephone = this.$route.query.telephone;
  },
  methods: {}
};
</script>
<style scoped>
#editPlane {
  height: 100%;
}
</style>

