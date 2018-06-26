<template>
  <div class="match-detail">
    <div class="navbar">
      <span :class="{back: type=='mobile'}" @click="backClick"></span>
      <a :class="{active: current}" href="#" @click="jump">比赛详情</a>
      <a :class="{active: !current}" href="#prize" @click="jump">比赛奖品</a>
    </div>
    <div class="cover_img">
      <img src="../assets/banner_task.png" alt="比赛封面">
    </div>
    <div class="header">
      <h1 class="header_title">大洋百货500ml洗发露争夺赛</h1>
      <p class="header_info">
        <span class="header_info_time">09:00</span>
        <span class="header_info_send">09:00</span>
        <span class="header_info_type">09:00</span>
      </p>
      <button class="edit-btn">信息有误，去修改>></button>
    </div>
    <div class="game">
      <p class="game_info">
        <span class="game_tag"></span>
        <span>玩法：</span>
        <span class="game_name">推倒胡麻将</span>
      </p>
      <span class="game_rule">规则</span>
    </div>
    <div>比赛详情</div>
    <div id="prize">
      <h1>比赛奖品
        <span>商家邮寄</span>
      </h1>
      <ul>
        <li>
          <p>第1名：奖品名称</p>
          <img src="../assets/logo.png" alt="奖品">
        </li>
      </ul>
      <div>
        <p>自提地址：</p>
        <p>北京回龙观</p>
      </div>
    </div>
    <div class="like_info">
      <router-link to="/user/record/like">like</router-link>
      <span>share</span>
    </div>
    <router-link to="/user/record/join">325已报名</router-link>
  </div>

</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      current: true
    };
  },
  methods: {
    jump() {
      this.current = !this.current;
    },
    backClick() {
      //当在浏览器中和客户端中都跳
      console.log("点击跳回上一页");
    }
  }
};
</script>


<style scoped>
a {
  color: #888;
}
.match-detail {
  position: relative;
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
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
/* 导航栏 */
.navbar {
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
</style>
