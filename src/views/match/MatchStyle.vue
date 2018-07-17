<template>
  <div id="style">
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
            <span>{{selectAttendType.value}}</span>
          </div>
          <radio-btn :data="attendStyle" @select="attendStyleClick"></radio-btn>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="请填写奖品信息" :value="prizeMsg" is-link @click="toPrize" />
      <van-cell title="添加分享图" :value="shareMsg" is-link @click="toShare" />
    </van-cell-group>
    <van-popup v-model="gameShow" position="bottom">
      <van-picker :columns="gameList" show-toolbar @confirm="gameConfirm" @cancel="gameShow = false" />
    </van-popup>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker title="选择时间（年月日时分）" v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="timeConfirm" @cancel="timeShow = false" />
    </van-popup>
    <div class="footer">
      <button @click="saveClick">保存</button>
      <button @click="checkClick">提交审核</button>
    </div>
    <van-uploader class="append_img" :after-read="append">
    </van-uploader>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      selectGame: this.$store.state.match.gameName,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(Date.now() + 60 * 60 * 24 * 30 * 2000),
      currentDate: new Date(),
      activeNames: ["1"],
      attendStyle: [
        {
          id: 0,
          value: "免费报名"
        },
        {
          id: 1,
          value: "分享报名"
        },
        {
          id: 2,
          value: "邀请赛"
        }
      ],
      personList: []
    };
  },
  computed: {
    ...mapState({
      selectTime(state) {
        let time = state.match.time;
        return time
          ? timeFormate(time * 1000, "YY年MM月DD日HH时mm分")
          : "未选择";
      },
      selectPerson(state) {
        return state.match.attendPerson;
      },
      selectAttendType(state) {
        return state.match.attendStyle;
      },
      prizeMsg(state) {
        return state.match.ifSave ? "已选择" : "未选择";
      },
      shareMsg(state) {
        return state.match.shareImg ? "已选择" : "未选择";
      }
    })
  },
  created() {
    this.fetchGameList();
  },
  methods: {
    append(file) {
      this.$store.commit("setShareImgFile", file);
      this.$router.push("shareImg");
    },
    toShare() {
      if (this.$store.state.match.shareImg) {
        return this.$router.push("shareImg");
      }
      let contain = document.querySelector("#style");
      let input = contain.querySelector(".van-uploader__input");
      input.click();
    },
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
        });
    },
    gameConfirm(value, index) {
      this.gameShow = false;
      this.selectGame = this.allGameList[index];
      this.$store.commit("setGameName", this.selectGame);
    },
    timeConfirm(value) {
      this.timeShow = false;
      let time = Math.round(new Date(this.currentDate).getTime() / 1000);
      this.$store.commit("setTime", time);
    },
    selectPersonClick(data) {
      if (data.id == 0) {
        return this.$toast("请选择游戏");
      }
      this.$store.commit("setAttendPerson", data);
    },
    attendStyleClick(data) {
      this.$store.commit("setAttendStyle", data);
    },
    saveClick() {
      this.submit(0);
    },
    checkClick() {
      this.submit(1);
    },
    submit(type) {
      let isEdit = this.$store.state.match.isEdit;
      let action = "createMatch";
      let match = this.$store.state.match;
      let detail = match.detail;
      let gameName = match.gameName;
      /**
       * 对数据进行判空
       */
      //游戏名称
      if (!gameName.id) {
        return this.$toast("请选择游戏名称");
      }
      if (!match.time) {
        return this.$toast("请选择游戏开始时间");
      }
      if (!match.attendPerson.id) {
        return this.$toast("请选择游戏人数");
      }
      if (match.attendStyle.id < 0) {
        return this.$toast("请选择报名类型");
      }
      if (!match.shareImg) {
        return this.$toast("请添加分享图片");
      }
      //如果没有奖品的话则传空对象
      let rankingSet = match.rankPrize;
      if (!match.ifSave && !isEdit) {
        rankingSet = {};
      }
      let params = {
        isAudit: type,
        title: detail.title,
        cover: detail.coverImg,
        content: detail.content,
        gameId: gameName.id,
        beginTime: match.time,
        templateId: match.attendPerson.id,
        signupType: match.attendStyle.id,
        prizePic: match.prizeCover,
        getPrizeWay: match.sendStyle,
        address: match.gainPrizeAddress.address,
        regionName: match.gainPrizeAddress.regionName,
        provinceId: match.gainPrizeAddress.provinceId,
        cityId: match.gainPrizeAddress.cityId,
        areaId: match.gainPrizeAddress.areaId,
        rankingSet: rankingSet,
        sharePic: match.shareImg,
        shareCropImg: match.shareCropImg
      };
      if (isEdit) {
        action = "editMatch";
        params.id = match.id;
      }
      this.http.match[action](params).then(res => {
        if (isEdit) {
          this.$router.go(-3);
        } else {
          this.$router.go(-2);
        }
      });
    }
  }
};
</script>

<style>
#style .van-popup--right {
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


