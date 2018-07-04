<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="applyList" :req-data="{id:$route.query.id}" @returnData="getApplyList($event)">
      <div class="title">
        <span>本场报名</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="apply in applyList" :key="apply.id" 
        :title="apply.nickname"
        :lable="apply.id" 
        :value="apply.Time">
        <img slot="icon" :src="apply.icon||icon" alt="" srcset="">
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
      applyList: [],
      total: 0
    };
  },
  components: {
    didaList
  },
  methods: {
    /** 组建中返回的数据结构
     */
    getApplyList(data) {
      this.total = data.total;
      this.getApplyList = data.list;
      if (this.getApplyList.length > 0) {
        this.getApplyList.forEach(p => {
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
