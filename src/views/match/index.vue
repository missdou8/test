<template>
    <div class="main">
        <div class="header">
            <div class="header_icon">
                <img src="../../assets/logo.png" alt="头像">
                <span>广告主名称</span>
                <p>
                    <span>认证</span>
                    <span>滴答ID：123456789</span>
                </p>
            </div>
            <div>
                <div class="header_lists">
                    <button>客服系统</button>
                    <button>兑换中心</button>
                    <button>公告</button>
                    <button>设置</button>
                </div>
                <div>
                    <button>我的故事</button>
                </div>
            </div>
        </div>
        <ul class="match_info">
            <li>浏览</li>
            <li>点赞</li>
            <li>场比赛</li>
            <li>粉丝</li>
        </ul>
        <van-tabs v-model="active" class="match_main">
            <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
                内容 {{ item }}
            </van-tab>
            <button class="create-btn">新建比赛</button>
        </van-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabs: ["当前赛事", "历史赛事"]
    };
  }
};
</script>


<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* 顶部 */
.header {
  display: flex;
  justify-content: space-around;
}
.header_icon {
  display: flex;
  flex-direction: column;
}
.header_icon img {
  width: 2rem;
  border-radius: 1rem;
}
/* 顶部选项 */
.header_lists button {
  padding: 0.1rem 0.2rem;
}
.match_info {
  display: flex;
  justify-content: space-around;
}
.match_main {
  height: 3rem;
  background-color: #f40;
  flex-grow: 1;
  padding-bottom: 1rem;
  position: relative;
}
.create-btn {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>

