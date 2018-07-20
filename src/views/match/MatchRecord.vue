<template>
  <div id="win-list">
    <van-row class="match_title" :class="{showTop: navShow}" gutter="5">
      <van-col span="4">序号</van-col>
      <van-col span="6">开赛时间</van-col>
      <van-col span="6">结束时间</van-col>
      <van-col span="4">参赛人数</van-col>
      <van-col span="4">比赛排名</van-col>
    </van-row>
    <div class="match_list">
      <dida-list post-module="match" post-url="recordList" no-data-text="暂无开赛记录" :req-data="{id: this.$route.query.id}" @returnData="getRecords($event)">
        <van-row class="match_tible" gutter="5" v-for="(item,index) in record" :key="index">
          <van-col span="4">{{item.key}}</van-col>
          <van-col span="6">{{item.startTime}}</van-col>
          <van-col span="6">{{item.endTime}}</van-col>
          <van-col span="4">{{item.arrivedCount}}</van-col>
          <van-col span="4">查看</van-col>
        </van-row>
      </dida-list>
    </div>
  </div>
</template>

<script>
import didaList from "../../components/didaList";
import {timestamp_switch_time, isWeChat, isQQ } from "lputils";
export default {
  data() {
    return {
      record: [],
      navShow: false  //是否存在nav
    };
  },
  mounted(){
    //检测浏览器类型决定是否展示栏
    let isWe = isWeChat() || isQQ();
    this.navShow = !isWe;
  },
  components: {
    didaList
  },
  methods: {
    getRecords(data) {
      this.record = data.list;
      if (this.record.length > 0) {
        this.record.forEach(r => {
          r.startTime = timestamp_switch_time(r.startTime);
          r.endTime = timestamp_switch_time(r.endTime);
        });
      }
    }
  }
};
</script>

<style scoped>
#win-list {
  height: 100%;
   position: relative;
}
.match_title,.match_tible{
  text-align: center;
  font-size: 13px;
  background: #fff;
  height: 44px;
}
.match_title{
  position: fixed;
  width: 100%;
  line-height: 44px;
  top: 0;
  left: 0;
  z-index: 1;
}
.match_list{
  padding-top: 44px;
}
#win-list .showTop{
  top: 46px;
}
</style>
