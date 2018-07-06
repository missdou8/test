<template>
  <div class="match-detail">
    <div class="navbar">
      <span :class="{back: type=='mobile'}" @click="backClick"></span>
      <a :class="{active: current}" href="#detail" @click="jump($event)" replace>比赛详情</a>
      <a :class="{active: !current}" href="#prize" @click="jump($event)" replace>比赛奖品</a>
    </div>
    <div class="detail_content" ref="detail_content">
      <div id="detail" class="cover_img">
        <img :src="match.cover" alt="比赛封面">
      </div>
      <div class="header">
        <h1 class="header_title">{{match.title}}</h1>
        <p class="header_info">
          <span class="header_info_time">{{match.beginTime | formateTime}}</span>
          <span class="header_info_send">{{prizes.type == 0 ? '邮寄': '自取'}}</span>
          <span class="header_info_type">{{match.signupType == 1 ? '免费报名': '邀请码报名'}}</span>
        </p>
        <button v-show="editShow" class="edit-btn" @click="toEdit">信息有误，去修改>></button>
      </div>
      <div class="game">
        <p class="game_info">
          <span class="game_tag"></span>
          <span>玩法：</span>
          <span class="game_name">{{match.gameName}}</span>
        </p>
        <span class="game_rule" @click="toRule">规则</span>
      </div>
      <div class="detail">
        <p class="prize_header">
          <span class="game_tag"></span>
          <span>比赛详情</span>
        </p>
        <div class="detail_page" v-html="match.content">
        </div>
      </div>
      <div id="prize" class="prize" v-show="prizeset.length > 0">
        <p class="prize_header">
          <span class="game_tag"></span>
          <span>比赛奖品</span>
        </p>
        <ul class="prize_list">
          <li class="prize_list_item" v-for="item in prizeset">
            <p>第{{item.rank}}名：{{item.name}}</p>
            <img :src="prizes.img" alt="奖品">
          </li>
        </ul>
        <div v-show="prizes.type == 1">
          <p class="prize_header">
            <span class="game_tag"></span>
            <span>自提地址</span>
          </p>
          <p class="address">{{prizes.regionName}} {{prizes.address}}</p>
        </div>
      </div>
      <div class="like_info">
        <div class="like_info_item">
          <img class="icon" :src="merchant.icon" alt="头像">
          <span>{{merchant.watchersCount}}</span>
        </div>
        <router-link class="like_info_item" :to="{path: '/user/record/like', query: {id:this.$store.state.match.id}}">
          <img src="../assets/like.png" alt="点赞">
          <span>{{match.likeCount}}</span>
        </router-link>
        <div class="like_info_item">
          <img src="../assets/share_default.png" alt="分享">
          <span>{{match.shareCount}}</span>
        </div>
        <div v-if="top!=0" class="scroll_top" @click="backToTop">
          <img src="" alt="">
          <span></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { timeFormate } from "lputils";
export default {
  props: ["type", "data"],
  data() {
    return {
      current: true,
      match: {},
      prizes: {},
      prizeset: {},
      merchant: {},
      top: 0,
      editShow: false
    };
  },
  filters: {
    formateTime(time) {
      return timeFormate(time * 1000, "HH:mm:ss");
    }
  },
  watch: {
    data() {
      this.match = this.data.match;
      this.prizes = this.data.prizes;
      this.prizeset = this.prizes.rankingSet;
      this.merchant = this.data.merchant;
      //判断是否显示可以修改的按钮
      let matchStatus = this.match.status;
      if (
        matchStatus == 0 ||
        matchStatus == 2 ||
        matchStatus == 4 ||
        matchStatus == 5 ||
        matchStatus == 6
      ) {
        this.editShow = true;
      }
    }
  },
  mounted() {
    this.$refs.detail_content.addEventListener("scroll", () => {
      this.top = this.$refs.detail_content.scrollTop;
    });
  },
  methods: {
    jump(e) {
      this.current = !this.current;
      location.replace(e.target.href);
    },
    backClick() {
      //当在浏览器中和客户端中都跳
      console.log("点击跳回上一页");
    },
    backToTop() {
      this.$refs.detail_content.scrollTop = 0;
    },
    toEdit() {
      //如果正在审核中，那么不能修改
      if (
        this.data.match.status == 0 ||
        this.data.match.status == 1 ||
        this.data.match.status == 3
      ) {
        return this.$toast("正在审核中的赛事不能修改");
      }
      this.$router.push("edit");
    },
    toRule() {
      location.href =
        "https://hbjxqp.happypoker.cn/appweb/gamerule/gamerules.html?activityId=" +
        this.match.gameId;
    }
  }
};
</script>


<style scoped>
a {
  color: #888;
}
.match-detail {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.detail_content {
  flex-basis: 0;
  flex-grow: 1;
  margin-top: 0.15rem;
  overflow: auto;
  padding-bottom: 1rem;
}
.cover_img {
  background-color: #fff;
  height: 3.21rem;
  padding: 0.35rem 0;
  margin-bottom: 0.01rem;
  text-align: center;
}
.cover_img img {
  height: 100%;
}
.like_info {
  background-color: #fafafa;
  border: 0.01rem solid #d0d0d0;
  border-radius: 0.41rem;
  position: fixed;
  top: 55%;
  right: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.2rem 0;
  width: 0.82rem;
}
.like_info_item {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 0.15rem;
  padding: 0.1rem 0;
}
.like_info img {
  height: 0.3rem;
}
.like_info_item .icon {
  border-radius: 50%;
  height: 0.55rem;
  width: 0.55rem;
}
/* 导航栏 */
.navbar {
  background-color: #fff;
  height: 44px;
  line-height: 44px;
  position: relative;
  text-align: center;
}
.navbar a {
  font-size: 0.3rem;
  margin: 0 0.3rem;
  padding-bottom: 0.1rem;
  position: relative;
}
.navbar .active {
  color: #000;
  font-weight: bold;
}
.navbar .active::after {
  background-color: #ffd321;
  content: "";
  position: absolute;
  bottom: 0px;
  left: 50%;
  height: 0.01rem;
  width: 44px;
  transform: translateX(-50%);
}
.back {
  background: url("../assets/back_icon.png") center/100% no-repeat;
  display: inline-block;
  height: 0.3rem;
  width: 0.3rem;
  position: absolute;
  left: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
}
/* 标题 */
.header {
  background-color: #fff;
  margin-top: 0.02rem;
  padding: 0.15rem 0.17rem;
  position: relative;
}
.header_title {
  font-size: 0.3rem;
  font-weight: bold;
}
.header_info_time {
  background: url("../assets/light.png") 0.05rem center/.2rem 0.24rem no-repeat;
}
.header_info_time,
.header_info_send {
  background-color: #000;
  color: #ffd321;
  margin-right: 0.2rem;
  padding: 0 0.1rem 0 0.3rem;
}
.header_info_send {
  padding-left: 0.1rem;
}
.header_info_type {
  color: #fff;
  padding: 0 0.1rem 0 0.5rem;
  background: url("../assets/attent_type.png") 0.05rem center/.3rem 0.3rem
    no-repeat;
  background-color: #c64432;
}
.edit-btn {
  background-color: #000;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  color: #ffd321;
  line-height: 1.3;
  padding-left: 0.2rem;
  position: absolute;
  right: 0;
  top: 0.2rem;
}
/* 游戏规则 */
.game {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: 0.28rem;
  margin-top: 0.2rem;
  padding: 0.3rem 0.2rem;
}
.game_info span {
  margin-right: 0.1rem;
}
.game_tag {
  background-color: #fbe500;
  display: inline-block;
  height: 0.31rem;
  width: 0.15rem;
  vertical-align: text-bottom;
}
.game_name {
  color: #000;
  font-size: 0.3rem;
  font-weight: bold;
}
.game_rule {
  background: url("../assets/arrow_right.png") right center/ 0.3rem 0.3rem
    no-repeat;
  color: green;
  font-size: 0.3rem;
  padding-right: 0.4rem;
}
.prize_header {
  background-color: #fff;
  display: flex;
  align-items: center;
  font-style: 0.28rem;
  margin-top: 0.2rem;
  padding: 0.3rem 0.2rem;
}
.prize_header span {
  font-size: 0.3rem;
  font-weight: bold;
  margin-right: 0.1rem;
}
.prize_list {
  background-color: #fff;
  margin-top: 0.02rem;
  padding: 0 0.2rem;
}
.prize_list_item p {
  padding: 0.2rem 0;
}
.prize_list_item img {
  width: 100%;
}

.scroll_top {
  background: url("../assets/scroll_top.png") center/100% 100% no-repeat;
  background-color: #fafafa;
  border-radius: 50%;
  height: 0.82rem;
  width: 0.82rem;
  position: absolute;
  bottom: -1rem;
  right: 0;
}
.detail {
  background-color: #fff;
  margin-top: 0.2rem;
}
.detail_page {
  text-indent: 2em;
}
.address {
  background-color: #fff;
  text-indent: 2em;
}
</style>
