<template>
    <div id="editPhone">
      <van-cell-group>
        <van-field v-model="mobile" type="number" placeholder="请输入您的手机号" />
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
        reg: /^1\d{10}$/,
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


