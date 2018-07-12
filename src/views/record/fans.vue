<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="watchers" post-url="watchersList" @returnData="getWatchersList($event)">
      <div class="title">
        <span>粉丝列表</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="watchers in watchersList" :key="watchers.id" 
        :title="watchers.nickname"
        :lable="watchers.id" 
        :value="watchers.Time">
        <img slot="icon" :src="watchers.icon||icon" alt="" srcset="">
      </van-cell>
    </dida-list>
  </div>
</template>

<script>
import img from "../../assets/icon.png";
import didaList from "../../components/didaList.vue";
import { timestamp_switch_time } from "lputils";
export default {
  data() {
    return {
      icon: img,
      watchersList: [],
      total: 0
    };
  },
  components: {
    didaList
  },
  methods: {
    /** 组建中返回的数据结构
     */
    getWatchersList(data) {
      this.total = data.total;
      this.watchersList = data.list;
      if (this.watchersList.length > 0) {
        this.watchersList.forEach(w => {
          w.Time = timestamp_switch_time(w.time);
        });
      }
    }
  }
};
</script>
<style scoped>
#fans {
  height: 100%;
  position: relative;
}
</style>
