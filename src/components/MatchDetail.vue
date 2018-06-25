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
        <header>
            <h1>大洋百货500ml洗发露争夺赛</h1>
            <p>
                <span>09:00</span>
                <span>09:00</span>
                <span>09:00</span>
            </p>
        </header>
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
</style>
