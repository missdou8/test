<template>
  <div class="share">
    <div class="prizeImg">
      <img :src="img" alt="奖品图片">
    </div>
    <p class="match_title">{{title}}</p>
    <p class="match_code">
      <span v-for="item in code">{{item}}</span>
    </p>
    <p class="match_code_desc">输入邀请码即可报名成功</p>
    <img class="qr_code" src="#" alt="二维码图片">
    <p class="qr_code_desc">长按识别二维码下载客户端参加比赛</p>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      code: ""
    };
  },
  computed: {
    ...mapState({
      img(state) {
        return state.match.detail.coverImg;
      },
      title(state) {
        return state.match.detail.title;
      }
    })
  },
  created() {
    this.code = this.$route.query.code;
    this.code = String(this.code).split("");
  }
};
</script>


<style scoped>
.share {
  background: url("../../assets/share.png") center/ 100% 100% no-repeat;
  position: relative;
}
.prizeImg {
  padding: 0.4rem 0;
  position: absolute;
  top: 4.5%;
  left: 3.05%;
  height: 30.36%;
  width: 94.72%;
  text-align: center;
}
.prizeImg img {
  height: 100%;
}
.match_title {
  position: absolute;
  top: 37.6%;
  width: 100%;
  text-align: center;
  font-size: 0.42rem;
  color: #fff;
}
.match_code {
  position: absolute;
  top: 50.5%;
  width: 100%;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
}
.match_code span {
  margin: 0 2.2%;
  margin-right: 2.25%;
}
.match_code_desc {
  position: absolute;
  top: 57.44%;
  font-size: 0.36rem;
  color: #fff;
  width: 100%;
  text-align: center;
}
.qr_code {
  position: absolute;
  top: 65%;
  max-width: 40%;
  left: 50%;
  transform: translate(-50%, 0);
}
.qr_code_desc {
  position: absolute;
  bottom: 6%;
  font-size: 0.36rem;
  color: #deca83;
  width: 100%;
  text-align: center;
}
</style>

