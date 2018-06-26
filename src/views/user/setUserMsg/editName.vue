<template>
    <div id="editName">
      <h3 class="title">2~10个字符</h3>
      <van-cell-group>
        <van-field v-model="name" placeholder="请输入您的名称" />
      </van-cell-group>
      <dida-btn :btn-enable="btnEnable" :type="0" :dataList="{'name': name}" :detection-list="detection"></dida-btn>
    </div>
</template>

<script>
import didaBtn from "../../../components/didaBtn.vue";
export default {
  data() {
    return {
      name: "",
      detection:{
        "name":"name",
        "reg":/^.{2,10}$/,
        "msg":"需要输入2-10个字符哦~"
      }
    };
  },
  computed: {
    btnEnable() {
      if (this.name) return false;
      return true;
    }
  },
  components: {
    didaBtn
  },
  created() {
    this.name = this.$route.query.name;
  },
  methods: {}
};
</script>


<style scoped>
#editName {
  height: 100%;
}
.title {
  padding: 0 15px;
  line-height: 0.65rem;
}
</style>

