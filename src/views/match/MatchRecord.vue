<template>
  <div id="win-list">
    <van-row class="match_title" :class="{showTop: navShow}">
      <van-col span="3">序号</van-col>
      <van-col span="15">开赛时间/结束时间</van-col>
      <van-col span="3">人数</van-col>
      <van-col span="3">排名</van-col>
    </van-row>
    <div class="match_list" :class="{setPadding: dataShow}">
      <dida-list post-module="match" post-url="recordList" no-data-text="暂无开赛记录" :req-data="{id: this.$route.query.id}" @returnData="getRecords($event)">
        <van-row class="match_tible" v-for="(item,index) in record" :key="index">
          <van-col span="2" class="mark">{{item.key}}</van-col>
          <van-col span="16">{{item.startTime}}--{{item.endTime}}</van-col>
          <van-col span="3" class="number">{{item.arrivedCount}}</van-col>
          <van-col span="3" class="look" @click.native="goLook(item.sn)">查看>></van-col>
        </van-row>
      </dida-list>
    </div>
  </div>
</template>

<script>
import didaList from "../../components/didaList";
import { timestamp_switch_time, isWeChat, isQQ } from "lputils";
export default {
  data() {
    return {
      record: [],
      navShow: false, //是否存在nav
      dataShow: false //是否有数据
    };
  },
  mounted() {
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
        this.dataShow = true;
      }else{
        this.dataShow = false;
      }
    },
    goLook(sn){
      this.$router.push({
        path: "/match/winner/list",
        query: {
          id: this.$route.query.id,
          sn:sn
        }
      });
    }
  }
};
</script>

<style scoped>
#win-list {
  height: 100%;
  position: relative;
}
.match_title,
.match_tible {
  text-align: center;
  font-size: 12px;
  background: #fff;
  height: 44px;
  display: flex;
  align-items: center;
}
.match_title {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
}
.setPadding {
  padding-top: 44px;
}
#win-list .showTop {
  top: 46px;
}
.match_tible {
  position: relative;
}
.match_tible .number {
  font-weight: 900;
  font-size: 15px;
}
.match_tible .mark {
  font-weight: 600;
  font-size: 13px;
}
.match_tible .look {
  color: rgb(68, 187, 0);
}
.match_tible::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0.2rem;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}
</style>
