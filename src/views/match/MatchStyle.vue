<template>
  <div class="style">
    <van-cell-group>
      <van-cell title="请选择游戏名称" :value="selectGame.name" is-link @click="gameSelect" />
      <van-cell title="请选择比赛时间" :value="selectTime" is-link @click="timeSelect" />
      <van-collapse v-model="activeNames" :accordion="true" @change="personShow">
        <van-collapse-item name="1">
          <div slot="title" class="personGame">
            <span>请预估比赛人数</span>
            <span>{{selectPerson.value}}</span>
          </div>
          <radio-btn :data="personList" @select="selectPersonClick"></radio-btn>
        </van-collapse-item>
        <van-collapse-item name="2">
          <div slot="title" class="personGame">
            <span>请选择报名类型</span>
            <span>{{selectAttendType}}</span>
          </div>
          <radio-btn :data="attendStyle" @select="attendStyleClick"></radio-btn>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="请填写奖品信息" value="未选择" is-link @click="toPrize" />
    </van-cell-group>
    <van-popup v-model="gameShow" position="bottom">
      <van-picker :columns="gameList" show-toolbar @confirm="gameConfirm" @cancel="gameShow = false" />
    </van-popup>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="timeConfirm" @cancel="timeShow = false" />
    </van-popup>
    <div class="footer">
      <button>保存</button>
      <button>提交审核</button>
    </div>
  </div>
</template>

<script>
import RadioBtn from "../../components/RadioBtn.vue";
import { timeFormate } from "lputils";
import Prize from "../../views/match/Prize.vue";
export default {
  components: {
    RadioBtn,
    Prize
  },
  data() {
    return {
      gameShow: false,
      timeShow: false,
      keyList: [5, 6],
      gameList: [],
      allGameList: [],
      selectGame: { id: 0, name: "未选择" },
      selectTime: "未选择",
      selectPerson: { id: 0, value: "未选择" },
      selectAttendType: "未选择",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      activeNames: ["1"],
      attendStyle: [
        {
          id: 1,
          value: "免费赛"
        },
        {
          id: 2,
          value: "邀请赛"
        }
      ],
      personList: []
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
      if (this.selectPerson.id === 0) {
        return this.$toast("请先选择人数");
      }
      this.$router.push("style/prize");
    },
    personShow(activeNames) {
      if (activeNames == 1) {
        if (this.selectGame.id == 0) {
          this.personList = [
            {
              id: 0,
              value: "0人"
            }
          ];
          return this.$toast("请选择游戏");
        }
        this.fetchPersonStyle();
      }
    },
    //获取游戏列表
    fetchGameList() {
      this.http.match.gameList().then(res => {
        let data = res.data;
        this.allGameList = data.gameList;
        this.gameList = this.allGameList.map(item => {
          return item.name;
        });
      });
    },
    //获取比赛人数
    fetchPersonStyle() {
      this.http.match
        .playerCountList({
          gameId: this.selectGame.id
        })
        .then(res => {
          let data = res.data;
          this.personList = data.playerCountList.map(item => {
            return {
              id: item.templateId,
              value: item.title
            };
          });
          console.log(this.personList);
        });
    },
    gameConfirm(value, index) {
      this.gameShow = false;
      this.selectGame = this.allGameList[index];
      this.$store.commit("setId", this.selectGame.id);
    },
    timeConfirm(value) {
      this.timeShow = false;
      this.selectTime = timeFormate(
        new Date(this.currentDate).getTime(),
        "YY年MM月DD日"
      );
    },
    selectPersonClick(data) {
      if (data.id == 0) {
        return this.$toast("请选择游戏");
      }
      this.selectPerson = data;
      this.$store.commit("setAttendPerson", this.selectPerson.id);
    },
    attendStyleClick(data) {
      this.selectAttendType = data.value;
    }
  }
};
</script>

<style>
.style .van-popup--right {
  height: 100%;
  width: 100%;
}
</style>


<style scoped>
.personGame {
  display: flex;
  justify-content: space-between;
}
.attend-style {
  display: flex;
  font-size: 0.2rem;
  justify-content: space-between;
}
.footer {
  margin-top: 0.5rem;
  padding: 0.2rem 0;
  text-align: center;
  width: 100%;
}
.footer button {
  font-size: 0.35rem;
  margin: 0 0.45rem;
  padding: 0.2rem 0;
  width: 2.35rem;
}
.footer button:first-child {
  background-color: #ffde00;
}
.footer button:nth-child(2) {
  background-color: #000;
  color: #ffd321;
}
</style>


