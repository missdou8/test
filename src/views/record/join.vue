<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="playerCountList" @returnData="getPlayerCountList($event)">
      <div class="title">
        <span>本场报名</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="playerCount in playerCountList" :key="playerCount.id" 
        :title="playerCount.nickname"
        :lable="playerCount.id" 
        :value="playerCount.Time">
        <img slot="icon" :src="playerCount.icon||icon" alt="" srcset="">
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
      playerCountList: [],
      total: 0
    };
  },
  components: {
    didaList
  },
  methods: {
    /** 组建中返回的数据结构
     */
    getPlayerCountList(data) {
      this.total = data.total;
      this.playerCountList = data.list;
      if (this.playerCountList.length > 0) {
        this.playerCountList.forEach(p => {
          p.Time = timestamp_switch_time(p.time);
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
