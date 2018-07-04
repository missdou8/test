<template>
  <div>
    <match-detail :data="matchData"></match-detail>
    <div class="footer">
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
          <i>{{match.arrivedCount}}</i>
          <i>开赛人数</i>
        </a>
      </p>
      <button class="share-btn" @click="toShare">分享邀请码>></button>
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
  created() {
    this.http.match
      .detail({
        id: this.$store.state.match.id
      })
      .then(res => {
        this.matchData = res.data;
        this.match = this.matchData.match;
      });
  },
  filters: {
    formateTime(time) {
      return timeFormate(time * 1000, "YY/MM/DD HH:mm:ss");
    }
  },
  methods: {
    toShare() {
      this.$router.push("/match/share");
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
  font-size: 0.22rem;
  padding: 0.25rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.footer_time {
  background: url("../../assets/footer_time.png") 0.17rem center/ 0.25rem
    0.25rem no-repeat;
  border-right: 0.01rem solid #f5f5f5;
  padding: 0 0.2rem 0 0.5rem;
}
.footer_num {
  display: flex;
}
.footer_num a {
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
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
  font-size: 0.28rem;
  font-weight: bold;
  height: 1.15rem;
  width: 2.3rem;
  padding-right: 0.1rem;
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
}
</style>


