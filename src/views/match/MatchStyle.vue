<template>
  <div class="style">
    <van-cell-group>
      <van-cell title="请选择游戏名称" value="未选择" is-link @click="gameSelect" />
      <van-cell title="请选择比赛时间" value="未选择" is-link @click="timeSelect" />
      <van-collapse v-model="activeNames" :accordion="true">
        <van-collapse-item name="1">
          <div slot="title" class="personGame">
            <span>请预估比赛人数</span>
            <span>{{selectPerson}}</span>
          </div>
          <radio-btn :data="personList" @select="selectPersonClick"></radio-btn>
        </van-collapse-item>
        <van-collapse-item name="2">
          <div slot="title" class="personGame">
            <span>请选择报名类型</span>
            <span>{{attendStyle[radio-1].valueSimple || attendStyle[radio-1].value}}</span>
          </div>
          <radio-btn :data="personList" @select="selectPersonClick"></radio-btn>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="请填写奖品信息" value="未选择" is-link @click="toPrize" />
    </van-cell-group>
    <van-popup v-model="gameShow" position="bottom">
      <van-picker :columns="columns" show-toolbar @confirm="gameShow = false" @cancel="gameShow = false" />
    </van-popup>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="timeShow = false" @cancel="timeShow = false" />
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
      gameList: ["石家庄麻将", "保定麻将"],
      allGameList: [],
      selectGame: {},
      selectTime: "",
      selectPerson: 0,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      activeNames: ["1"],
      attendStyle: [
        {
          name: 1,
          value: "免费赛"
        },
        {
          name: 2,
          value: "邀请赛(用户需输入您分享的邀请码才能参赛)",
          valueSimple: "邀请赛"
        }
      ],
      personList: [
        {
          id: 9,
          value: "9人",
          name: "person",
          content: "根据比赛报名的情况，这里有很多人"
        },
        {
          id: 10,
          value: "10人",
          name: "person",
          content: "根据报名情况，这里情势很危急"
        }
      ],
      radio: 1
    };
  },
  created() {
    this.fetchGameList();
    this.fetchPersonStyle();
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
    //获取比赛人数
    fetchPersonStyle() {
      this.http.match.playerCountList().then(res => {
        let data = res.data;
        this.personList = data.playerCountList.map(item => {
          return {
            id: item,
            value: itme + "人",
            name: "person",
            content: `请根据您实际的客户量来选择，预估人数仅为保守估计，当实际参赛人数大于${item}人时比赛才能正常开赛，小于${item}人时比赛自动取消`
          };
        });
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
      this.selectPerson = data.value;
      this.$store.commit("setAttendPerson", data.id);
    },
    attendStyleClick() {
      console.log(this.radio);
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


