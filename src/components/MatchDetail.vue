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
        <img
          v-show="isHistory"
          class="recreate"
          src="../assets/reCreate.png"
          alt="再办一场"
          @click="reCreate"
        >
      </div>
      <div class="header">
        <div class="header_title">
          <span>{{match.title}}</span>
          <span class="header_info_time" v-show="!isHistory">{{countDown}}</span>
        </div>
        <p class="header_info">
          <span class="header_info_type">{{config.attendType[match.signupType]}}</span>
          <span class="header_info_send">{{sendType[prizes.type]}}</span>
          <span class="header_info_game" @click="toRule">{{match.gameName}}</span>
          <span class="header_info_id">{{match.id}}</span>
          <!-- 如果是SNG比赛或者是MTT比赛切是循环 -->
          <span
            class="header_info_record"
            v-if="this.$store.state.match.tabActive == 1&&(match.type==3||(match.type==2&&match.isLoop==1))"
          >
            <router-link class="rulr" :to="{ path: '/match/detail/record', query: { id: match.id}}"></router-link>
          </span>
        </p>
        <button v-show="editShow" class="edit-btn" @click="toEdit">我要修改>></button>
      </div>
      <div id="prize" class="prize" v-show="rankPrizes.length > 0">
        <p class="prize_section">
          <img src="../assets/header_info_line.png" alt="线">
          <span>比赛奖品</span>
          <img class="last" src="../assets/header_info_line.png" alt="线">
        </p>
        <div>
          <p class="prize_header">
            <span class="game_tag"></span>
            <span>名次奖品</span>
          </p>
          <prize-cell
            class="cell"
            v-for="(item,index) in rankPrizes"
            :key="`rank${index}`"
            :cellData="item"
            :edit="false"
          ></prize-cell>
        </div>
        <div class="attend_prize" v-show="attendPrizes.length">
          <p class="prize_header">
            <span class="game_tag"></span>
            <span>参与奖</span>
          </p>
          <attend-cell
            class="attend_cell"
            v-for="(item,index) in attendPrizes"
            :key="`attend${index}`"
            :cellData="item"
          ></attend-cell>
        </div>
        <div v-show="prizes.type == 1">
          <p class="prize_header prize_fetch">
            <span class="game_tag"></span>
            <span>领奖方式</span>
          </p>
          <div class="address">
            <p class="address_type">{{sendType[prizes.type]}}</p>
            <p class="address_detail">{{prizes.regionName}} {{prizes.address}}</p>
            {{prizes.contact || '默认名称'}}
            <span class="match_mobile">{{prizes.mobile}}</span>
          </div>
        </div>
      </div>
      <div class="detail">
        <p class="prize_section">
          <img src="../assets/header_info_line.png" alt="线">
          <span>比赛详情</span>
          <img class="last" src="../assets/header_info_line.png" alt="线">
        </p>
        <div class="detail_page" v-html="match.content"></div>
      </div>
      <div class="like_info">
        <div class="like_info_item" @click="toFans">
          <img class="icon" :src="merchant.icon || icon" alt="头像">
          <span>{{merchant.watchersCount}}</span>
        </div>
        <router-link
          class="like_info_item"
          :to="{path: '/user/record/like', query: {id:this.$store.state.match.id}}"
        >
          <img src="../assets/like.png" alt="点赞">
          <span>{{match.likeCount}}</span>
        </router-link>
        <div class="like_info_item">
          <img src="../assets/share_default.png" alt="分享">
          <span>{{match.shareCount}}</span>
        </div>
        <div v-if="top!=0" class="scroll_top" @click="backToTop">
          <img src alt>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { secondsToTime } from "lputils";
import PrizeCell from "./PrizeCell";
import AttendCell from "../views/match/components/AttendCell";
import icon from "../assets/icon.png";
export default {
  props: ["type", "data"],
  data() {
    return {
      current: true,
      match: {},
      prizes: {},
      rankPrizes: {},
      attendPrizes: {},
      merchant: {},
      top: 0,
      editShow: false,
      time: 0,
      timer: "",
      icon: icon,
      sendType: {
        0: "邮寄",
        1: "自取",
        2: "",
        3: "到店使用"
      }
    };
  },
  components: {
    PrizeCell,
    AttendCell
  },
  computed: {
    countDown(value) {
      if (this.time <= 0) {
        clearInterval(this.timer);
        this.time = 0;
      }
      return secondsToTime(this.time);
    },
    isHistory(state) {
      return this.$store.state.match.tabActive == 0 ? false : true;
    }
  },
  watch: {
    data() {
      this.match = this.data.match;
      this.time = this.match.countdown;
      this.timer = setInterval(() => {
        this.time -= 1;
      }, 1000);
      this.prizes = this.data.prizes;
      this.rankPrizes = this.prizes.rankingSet;
      this.attendPrizes = this.prizes.partSet;
      this.merchant = this.data.merchant;
      //判断是否显示可以修改的按钮
      let matchStatus = this.match.status;
      //0 新建 1 首次提审 2 修改中 3 修改提审 4 驳回  5 审核通过（=待发布） 6 取消 7 发布/挂牌中 8 报名中 9 比赛中 10 比赛结束
      if (
        matchStatus == 0 ||
        matchStatus == 2 ||
        matchStatus == 4 ||
        matchStatus == 5 ||
        matchStatus == 7 ||
        matchStatus == 8
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
    toFans() {
      this.$router.push("/user/record/fans");
    },
    reCreate() {
      this.$store.commit("setIsEdit", false);
      this.$router.push({
        path: "edit",
        query: {
          id: this.data.match.status
        }
      });
    },
    jump(e) {
      this.current = !this.current;
      location.replace(e.target.href);
    },
    backClick() {
      //当在浏览器中和客户端中都跳
    },
    backToTop() {
      this.$refs.detail_content.scrollTop = 0;
    },
    toEdit() {
      //如果正在审核中，那么不能修改
      if (
        this.data.match.status == 6 ||
        this.data.match.status == 1 ||
        this.data.match.status == 3 ||
        this.data.match.status == 9
      ) {
        return this.$toast("正在审核中的赛事不能修改");
      }
      this.$store.commit("setIsEdit", true);
      this.$router.push({
        path: "edit",
        query: {
          id: this.data.match.status,
          type: this.data.match.publishedStatus
        }
      });
    },
    toRule() {
      this.$router.push({
        path: "/detail/gameRule",
        query: {
          id: this.match.gameId
        }
      });
    }
  }
};
</script>

<style>
.detail_page img {
  width: 100%;
}
</style>

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
  padding-bottom: 0.88rem;
}
.cover_img {
  background-color: #fff;
  height: 3.4rem;
  padding: 0.35rem 0;
  margin-bottom: 0.01rem;
  text-align: center;
  position: relative;
}
.cover_img .recreate {
  width: 1.88rem;
  height: 0.82rem;
  position: absolute;
  top: 0;
  right: 0;
}
.cover_img img {
  height: 100%;
  max-height: 100%;
}
.like_info {
  background-color: #fafafa;
  border: 0.01rem solid #d0d0d0;
  border-radius: 0.41rem;
  position: fixed;
  bottom: 20%;
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
  display: flex;
  justify-content: space-between;
}
.header_title span:first-child {
  font-size: var(--font-size-bigger);
  font-weight: bold;
}
.header_info {
  position: relative;
}
.header_info span {
  border-radius: 0.05rem;
}
.header_info_time {
  background: url("../assets/light.png") 0.05rem center/.16rem 0.24rem no-repeat;
  background-color: #000;
  color: #ffd321;
}
.header_info_time,
.header_info_send,
.header_info_type {
  font-size: 0.23rem;
  height: 0.32rem;
  line-height: 0.32rem;
}
.header_info_time,
.header_info_send {
  border-radius: 0.05rem;
  padding: 0 0.1rem 0 0.26rem;
}
.header_info_send {
  background-color: #5be28e;
  color: #000;
  padding-left: 0.1rem;
}
.header_info_id {
  float: right;
  font-size: 0.24rem;
}
.header_info .header_info_game {
  border: 1px solid #0091f8;
  border-radius: 0.2rem;
  color: #0091f8;
  font-size: 0.24rem;
  padding: 0rem 0.2rem;
  margin-left: 0.2rem;
}
.header_info_type {
  color: #d83c3c;
  margin: 0 0.2rem 0 0.05rem;
}
.header_info_record {
  position: absolute;
  right: 0;
  top: 0;
  background: url("../assets/kaisaijilu.png") center no-repeat;
  background-position: top;
  background-size: 100%;
}
.header_info_record a {
  display: inline-block;
  width: 1.5rem;
  height: 0.5rem;
}
.edit-btn {
  background-color: #000;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  color: #ffd321;
  line-height: 1.3;
  padding-left: 0.2rem;
  position: absolute;
  right: 2rem;
  top: 0.1rem;
}
.game_tag {
  background-color: #fbd400;
  border-radius: 0.1rem;
  height: 0.31rem;
  width: 0.15rem;
}
.prize {
  margin-top: 0.2rem;
  background-color: #fff;
  padding-bottom: 0.2rem;
}
.prize_header {
  background-color: #fff;
  color: #a7a7a7;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.2rem;
}
.prize_header span {
  font-size: 0.3rem;
  margin-right: 0.1rem;
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
  padding: 0.2rem;
}
.detail_page p {
  text-indent: 2em;
}
.address {
  background-color: #fff;
  padding: 0 0.45rem;
}
.prize_section {
  background-color: #fdfdfd;
  color: #dcdcdc;
  font-size: 0.3rem;
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
}
.prize_section img {
  width: 0.62rem;
}
.prize_section .last {
  transform: scaleX(-1);
}
.prize_section span {
  vertical-align: sub;
  margin: 0 0.38rem;
}
.cell {
  background-color: #fff;
  margin: 0.1rem 0.36rem;
  position: relative;
  border: 1px solid #d8d8d8;
}
.attend_cell {
  padding-left: 1.72rem;
}
.prize_fetch {
  position: relative;
}
.prize_fetch::after {
  content: "";
  background-color: var(--border-color);
  position: absolute;
  bottom: 0.15rem;
  right: 0.2rem;
  transform: scaleY(0.5);
  transform-origin: 0 0;
  height: 1px;
  width: 92%;
  z-index: 1;
}
.address_type {
  color: #000;
  font-size: 0.32rem;
  padding-top: 0.1rem;
}
.address_detail {
  padding-top: 0.1rem;
}
.match_mobile {
  background: url("../assets/address_phone.png") no-repeat;
  background-size: 0.4rem 0.4rem;
  background-position: left center;
  color: #249cf4;
  padding: 0.1rem 0;
  padding-left: 0.5rem;
  margin-left: 0.3rem;
}
.attend_prize {
  padding-bottom: 0.1rem;
}
</style>
