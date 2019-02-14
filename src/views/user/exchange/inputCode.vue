<template>
    <div id="inputCode">
       <van-field class="input" v-model="code" placeholder="点击输入获奖者提供的兑奖码" />
       <van-button class='btn' :disabled='btnEnable' size="large" @click="submit()">确定</van-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
        code:''
    };
  },
  computed: {
    btnEnable() {
      if (this.code) return false;
      return true;
    }
  },
  components: {},
  created() {},
  methods: {
      submit(){
        //在请求前清除一下数据
        this.$store.commit("setprizeDetail", {});
        //发送ajax请求成功的话跳转页面
        this.http.prizes.prizeDetail({
          code: this.code
        })
        .then(res => {
            //获取奖品信息，如果有的话跳转页面
            //数据量比较大需要使用vux存储
            this.$store.commit("setprizeDetail", res.data);
            this.$router.push("/user/exchange/prizeMsg");
        });
      }
  }
};
</script>


<style scoped>
#inputCode .input {
    width: 90%;
    margin: .4rem auto;
    border-radius: 44px;
}
#inputCode .btn{
    color: rgb(17,17,17);
    background-color: rgb(252,198,0);
    width: 90%;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    height: 44px;
    line-height: 44px;
    font-weight: 600;
}
</style>

