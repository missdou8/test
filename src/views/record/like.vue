<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="likeList" @returnData="getLikeList($event)">
      <div class="title">
        <span>本场点赞</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="like in likeList" :key="like.id" 
        :title="like.nickname||'王小花'"
        :label="like.id||'100000001'" 
        :value="like.Time||'2018-6-27 00:00:00'">
        <img slot="icon" :src="like.icon||icon" alt="" srcset="">
      </van-cell>
    </dida-list>
  </div>
</template>

<script>
import img from "../../assets/logo.png";
import didaList from "../../components/didaList.vue";
export default {
  data() {
    return {
      icon: img,
      likeList: [],
      total: 0
    };
  },
  components: {
    didaList
  },
  methods: {
    /** 组建中返回的数据结构
     */
    getLikeList(data) {
      this.total = data.total;
      this.likeList = data.list;
      if (this.likeList.length < 0) {
        this.likeList.forEach(l => {
          this.likeList.Time = timestamp_switch_time(d.time);
        });
      }
    }
  }
};
</script>
<style scoped>
#fans {
  height: 100%;
}
</style>
