<template>
  <div class="detail">
    <match-detail :data="matchData"></match-detail>
    <div class="footer" :class="{free: !footerShow}">
      <p class="footer_time">
        <span>{{match.beginTime | formateTime}}</span>
        <span>开赛</span>
      </p>
      <p class="footer_num">
        <router-link :to="{path: '/user/record/join', query: {id: this.$store.state.match.id}}">
          <i>{{match.signupCount}}</i>
          <i>已报名</i>
        </router-link>
        <a>
          <i>{{attendNum}}</i>
          <i>{{attendMsg}}</i>
        </a>
      </p>
      <button v-show="footerShow" class="share-btn" @click="toShare">{{bottomMsg}}></button>
    </div>
  </div>
</template>

<script>
import MatchDetail from "../../components/MatchDetail.vue";
import { timeFormate } from "lputils";

export default {
  components: {
    MatchDetail
  },
  data() {
    return {
      matchData: {},
      match: {}
    };
  },
  computed: {
    bottomMsg() {
      return this.$store.state.match.tabActive == 0 ? "分享邀请码" : "获奖名单";
    },
    attendMsg() {
      return this.$store.state.match.tabActive == 0
        ? "最小开赛人数"
        : "参赛人数";
    },
    attendNum() {
      return this.$store.state.match.tabActive == 0
        ? this.match.playerCount
        : this.match.arrivedCount;
    },
    footerShow() {
      // 显示开赛记录的条件（如果是SNG比赛或者是MTT比赛切是循环）
      let judge =
        this.match.type == 3 ||
        (this.match.type == 2 && this.match.isLoop == 1);
      //历史赛事
      if (this.$store.state.match.tabActive == 1 && !judge) {
        return true;
      } else {
        if (this.match.signupType == 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    this.http.match
      .detail({
        id: this.$store.state.match.id
      })
      .then(res => {
        this.matchData = res.data;
        this.match = this.matchData.match;
        //设置属性，以备编辑
        this.$store.commit("setDetail", {
          title: this.match.title,
          content: this.match.content,
          coverImg: this.match.cover
        });
        this.$store.commit("setGameName", {
          id: this.match.gameId || 0,
          name: this.match.gameName || "未选择"
        });
        let attendStyle = [
          {
            id: 0,
            value: "免费报名"
          },
          {
            id: 1,
            value: "分享报名"
          },
          {
            id: 2,
            value: "邀请赛"
          }
        ];
        let att = {};
        attendStyle.forEach(item => {
          if (item.id == this.match.signupType) {
            att = item;
          }
        });
        this.$store.commit("setTime", this.match.beginTime);
        this.$store.commit("setAttendPerson", {
          id: this.match.templateId || 0,
          value: this.match.templateTitle || "未选择"
        });
        this.$store.commit("setAttendStyle", att);
        this.$store.commit("setIfSave", true);
        this.$store.commit("setPrizeCover", this.matchData.prizes.img);
        if (this.matchData.prizes.rankingSet.length == 0) {
          this.$store.commit("setRankPrizes", [
            {
              beginRank: 1,
              endRank: 1,
              ispartInPrize: 0,
              prizes: [
                {
                  name: null,
                  price: null,
                  prizeCount: null,
                  icon: null
                }
              ]
            }
          ]);
        } else {
          this.$store.commit("setRankPrizes", this.matchData.prizes.rankingSet);
        }
        if (this.matchData.prizes.partSet.length == 0) {
          this.$store.commit("setPartSet", [
            { name: null, price: null, prizeCount: null, icon: null }
          ]);
        } else {
          this.$store.commit("setPartSet", this.matchData.prizes.partSet);
        }
        this.$store.commit("setSendStyle", this.matchData.prizes.type);
        let userInfo = this.matchData.prizes;
        this.$store.commit("setgainPrizeAddress", {
          address: userInfo.address,
          regionName: userInfo.regionName,
          provinceId: userInfo.provinceId,
          cityId: userInfo.cityId,
          areaId: userInfo.areaId,
          latitude: userInfo.latitude,
          longitude: userInfo.longitude,
          mobile: userInfo.mobile,
          contact: userInfo.contact
        });
      });
  },
  filters: {
    formateTime(time) {
      return timeFormate(time * 1000, "YY/MM/DD HH:mm:ss");
    }
  },
  methods: {
    toShare() {
      let icon = this.matchData.merchant.icon || this.config.defaultIcon;
      if (this.$store.state.match.tabActive == 0) {
        //解决微信bug
        return (location.href = `/front/match/share?code=${
          this.match.signupCode
        }&src=${encodeURIComponent(
          this.match.cover
        )}&title=${encodeURIComponent(
          this.match.title
        )}&icon=${encodeURIComponent(icon)}`);
      }
      this.$router.push({
        path: "/match/winner/list",
        query: {
          id: this.match.id
        }
      });
    }
  }
};
</script>

<style scoped>
a {
  color: #888;
}
/* 底部导航条 */
.footer {
  background-color: #141414;
  color: #fbe500;
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  padding: 0.16rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.footer_time {
  background: url("../../assets/footer_time.png") 0.17rem center/ 0.25rem
    0.25rem no-repeat;
  border-right: 0.01rem solid #f5f5f5;
  padding: 0 0.18rem 0 0.46rem;
}
.footer_num {
  display: flex;
}
.footer_num a:first-child {
  margin-right: -0.1rem;
}
.footer_num a {
  display: flex;
  flex-direction: column;
  margin-left: 0.16rem;
  text-align: center;
}
.footer_num a i {
  line-height: 1;
}
.footer_num a i:first-child {
  color: #fff;
  margin-bottom: 0.02rem;
}
.share-btn {
  background: url("../../assets/footer_right.png") center/ 100% 100% no-repeat;
  font-size: 0.26rem;
  font-weight: bold;
  height: 0.88rem;
  width: 2rem;
  padding-right: 0.05rem;
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
}
.free .footer_num,
.free .footer_time {
  flex-basis: 0;
  flex-grow: 1;
}
.free .footer_num {
  justify-content: center;
}
</style>


