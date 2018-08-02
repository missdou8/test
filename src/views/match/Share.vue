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
    <!-- 生成二维码 -->
    <me-qrcode class="qr_code" v-if="link" :qr-url='link' :qr-size='300' :qr-logo-size="80" :qr-logo="qrlogo"></me-qrcode>
    <p class="qr_code_desc">长按识别二维码下载客户端参加比赛</p>
  </div>
</template>


<script>
import { mapState } from "vuex";
import icon from "../../assets/icon.png";
import qrlogo from "../../assets/logo.png";
import meQrcode from "../../components/meQrcode.vue";
import { getUrlString } from "lputils";
export default {
  data() {
    return {
      code: "",
      logo: icon,
      qrlogo: qrlogo,
      link: this.config.downLoadURL,
      match: {}
    };
  },
  components: {
    meQrcode
  },
  computed: {
    img(state) {
      return this.match.cover;
    },
    title(state) {
      return this.match.title;
    }
  },
  created() {
    this.code = getUrlString("code");
    let id = getUrlString("id");
    let code = this.code;
    this.http.match
      .detail({
        id: id
      })
      .then(res => {
        this.matchData = res.data;
        this.match = this.matchData.match;
        this.http.wechat
          .signPackage({
            url: location.href
          })
          .then(res => {
            let data = res.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            });
            let title = `我在嘀嗒，邀您参加${this.title}比赛`;
            let url = `https://merchant.didabisai.com/front/match/share?code=${code}&id=${id}`;
            let iconUrl = this.$store.state.user.userInfo.icon;
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: iconUrl // 分享图标
            });

            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: `点击下载客户端，输入${code}邀请码免费报名比赛！`, // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: iconUrl, // 分享图标
              type: "link" // 分享类型,music、video或link，不填默认为link
            });
          });
      });
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
  display: inline-block;
  width: 9.73%;
  height: 13.33%;
  margin-right: 1.25%;
}
.match_code_desc {
  position: absolute;
  top: 57.44%;
  font-size: 0.3rem;
  color: #fff;
  width: 100%;
  text-align: center;
}
.qr_code {
  position: absolute;
  bottom: 1.65rem;
  width: 2rem;
  height: 2rem;
  left: 50%;
  transform: translate(-50%, 0%);
}
.qr_code_desc {
  position: absolute;
  bottom: 0.7rem;
  font-size: 0.3rem;
  color: rgb(255, 242, 157);
  width: 100%;
  text-align: center;
  margin-left: 0.1rem;
  font-weight: 600;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
}
</style>

<style>
.share .qr_code img {
  border-radius: 0.15rem;
}
</style>
