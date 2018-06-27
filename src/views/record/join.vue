<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="playerCountList" @returnData="getPlayerCountList($event)">
      <div class="title">
        <span>本场报名</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="playerCount in playerCountList" :key="playerCount.id" 
        :title="playerCount.nickname||'王小花'"
        :label="playerCount.id||'100000001'" 
        :value="playerCount.Time||'2018-6-27 00:00:00'">
        <img slot="icon" :src="playerCount.icon||icon" alt="" srcset="">
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
      if (this.playerCountList.length < 0) {
        this.playerCountList.forEach(p => {
          this.playerCountList.Time = timestamp_switch_time(d.time);
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
