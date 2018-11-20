<template>
  <div id="fans">
    <dida-list ref="dida_list" post-module="match" post-url="signupList" :req-data="{id:$route.query.id}" @returnData="getApplyList($event)">
      <div class="title">
        <span>本场报名</span>
        <span>{{total}}人</span>
      </div>
      <van-cell v-for="apply in applyList" :key="apply.id" :title="apply.nickname" :lable="apply.id" :value="apply.Time">
        <img slot="icon" :src="apply.icon||icon" alt="" srcset="">
      </van-cell>
    </dida-list>
  </div>
</template>

<script>
import img from "../../assets/icon.png";
import didaList from "../../components/didaList.vue";
import { timeFormate } from "lputils";
import { httpToHttps } from "../../../script/utils.js";
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
      this.applyList = data.list;
      if (this.applyList.length > 0) {
        this.applyList.forEach(p => {
          p.Time = timeFormate(p.time*1000, 'YY/MM/DD HH:mm:ss');
          p.icon  = httpToHttps(p.icon)
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
