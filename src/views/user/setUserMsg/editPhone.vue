<template>
    <div id="editPhone">
      <van-cell-group>
        <van-field v-model="mobile" placeholder="请输入您的手机号" />
      </van-cell-group>
      <dida-btn :btn-enable="btnEnable" :type="0" :dataList="{'mobile': mobile}" :detection-list="detection"></dida-btn>
    </div>
</template>

<script>
import didaBtn from "../../../components/didaBtn.vue";
export default {
  data() {
    return {
      mobile: "",
      detection: {
        name: "mobile",
        reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[45678]|19[89]|16[6])[0-9]{8}$/,
        msg: "请输入正确的手机号"
      }
    };
  },
  computed: {
    btnEnable() {
      if (this.mobile) return false;
      return true;
    }
  },
  components: {
    didaBtn
  },
  created() {
    this.mobile = this.$route.query.mobile;
  },
  methods: {}
};
</script>


<style scoped>
#editPhone {
  height: 100%;
}
</style>

