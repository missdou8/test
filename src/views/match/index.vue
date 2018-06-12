<template>
    <div>
        <div class="header">
            <div class="header_icon">
                <img src="" alt="头像">
                <span>广告主名称</span>
            </div>
            <div>
                <div>
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
        <ul>
            <li>浏览</li>
            <li>点赞</li>
            <li>场比赛</li>
            <li>粉丝</li>
        </ul>
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in tabs.length" :title="tabs[index]" :key="index">
                内容 {{ item }}
            </van-tab>
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
</style>

