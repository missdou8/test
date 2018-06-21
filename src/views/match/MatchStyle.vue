<template>
  <div>
    <van-cell-group>
      <van-cell title="请选择游戏名称" :value="selectGame.title" is-link @click="gameSelect" />
      <van-cell title="请选择比赛时间" :value="selectTime" is-link @click="timeSelect" />
      <van-collapse v-model="activeNames" :accordion="true">
        <van-collapse-item name="1">
          <div slot="title" class="personGame">
            <span>请选择比赛人数</span>
            <span>文字</span>
          </div>
          <pop-over :data="popData"></pop-over>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeNames" :accordion="true">
        <van-collapse-item name="1">
          <div slot="title" class="personGame">
            <span>请选择报名类型</span>
            <span>类型</span>
          </div>
          <pop-over :data="popData"></pop-over>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="请选择奖品信息" value="内容" is-link @click="toPrize" />
    </van-cell-group>
    <van-popup v-model="gameShow" position="bottom">
      <van-picker :columns="gameList" show-toolbar @confirm="gameConfirm" @cancel="gameShow = false" />
    </van-popup>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="timeConfirm" @cancel="timeShow = false" />
    </van-popup>
  </div>
</template>

<script>
import PopOver from "../../components/PopOver.vue";
import { timeFormate } from "lputils";
export default {
  components: {
    PopOver
  },
  data() {
    return {
      gameShow: false,
      timeShow: false,
      keyList: [5, 6],
      gameList: ["石家庄麻将", "保定麻将"],
      allGameList: [],
      selectGame: {},
      selectTime: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(new Date().getTime() + 12960000000),
      currentDate: new Date(),
      activeNames: ["1"],
      popData: [
        {
          value: "9人",
          name: "person",
          content: "根据比赛报名的情况，这里有很多人"
        },
        {
          value: "10人",
          name: "person",
          content: "根据报名情况，这里情势很危急"
        }
      ]
    };
  },
  created() {
    this.fetchGameList();
  },
  methods: {
    gameSelect() {
      this.gameShow = true;
    },
    timeSelect() {
      this.timeShow = true;
    },
    toPrize() {
      this.$router.push("style/prize");
    },
    //获取游戏列表
    fetchGameList() {
      this.http.match.gameList().then(res => {
        let data = res.data;
        this.allGameList = data.gameList;
        this.gameList = this.allGameList.map(item => {
          return item.title;
        });
      });
    },
    gameConfirm(value, index) {
      this.gameShow = false;
      this.selectGame = this.allGameList[index];
    },
    timeConfirm(value) {
      this.timeShow = false;
      this.selectTime = timeFormate(
        new Date(this.currentDate).getTime(),
        "YY年MM月DD日"
      );
    }
  }
};
</script>

<style scoped>
.personGame {
  display: flex;
  justify-content: space-between;
}
</style>


