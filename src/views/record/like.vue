<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="likeList" :req-data="{id:$route.query.id}" @returnData="getLikeList($event)">
      <div class="title">
        <span>本场点赞</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="like in likeList" :key="like.id" 
        :title="like.nickname"
        :lable="like.id" 
        :value="like.Time">
        <img slot="icon" :src="like.icon||icon" alt="" srcset="">
      </van-cell>
    </dida-list>
  </div>
</template>

<script>
import img from "../../assets/logo.png";
import didaList from "../../components/didaList.vue";
import { timestamp_switch_time } from "lputils";
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
      if (this.likeList.length > 0) {
        this.likeList.forEach(l => {
          l.Time = timestamp_switch_time(l.time);
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
