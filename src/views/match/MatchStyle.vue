<template>
  <div id="style">
    <van-cell-group class="group">
      <van-cell title="请选择游戏名称" :value="selectGame.name" to="style/gameList" is-link/>
      <van-cell title="请选择赛制" :value="selectPerson.title" @click="selectPersonClick" is-link/>
    </van-cell-group>
    <van-cell-group class="group">
      <van-cell
        v-for="(time,index) in selectTime"
        :key="`time${index}`"
        title="开赛时间"
        :value="beginTimeFormate(time)"
        is-link
        @click="timeSelect(index)"
      />
    </van-cell-group>

    <van-cell-group class="group">
      <van-collapse v-model="activeNames" :accordion="true" @change="personShow">
        <van-collapse-item name="2">
          <div slot="title" class="personGame">
            <span>请选择报名类型</span>
            <span>{{selectAttendType.value}}</span>
          </div>
          <radio-btn :data="attendStyle" @select="attendStyleClick"></radio-btn>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="请填写奖品信息" :value="prizeMsg" is-link @click="toPrize"/>
    </van-cell-group>
    <van-popup v-model="timeShow" position="bottom">
      <transition name="slide">
        <div class="datepicker">
          <LPDatePicker
            @select="calendar.select"
            :start="calendar.start"
            :last="calendar.last"
            :beginDate="calendar.begin"
            :endDate="calendar.end"
            :monthLength="calendar.monthLength"
          ></LPDatePicker>
        </div>
      </transition>
      <!-- <van-datetime-picker
        title="选择时间（年月日时分）"
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="timeConfirm"
        @cancel="timeShow = false"
        :formatter="formatter"
      />-->
    </van-popup>
    <div class="footer">
      <button @click="saveClick">保存</button>
      <button @click="checkClick">提交审核</button>
    </div>
    <van-uploader class="append_img" :after-read="append"></van-uploader>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RadioBtn from "../../components/RadioBtn.vue";
import { constants } from "crypto";

export default {
  components: {
    RadioBtn
  },
  data() {
    return {
      calendar: {
        monthLength: 6,
        // start: { year: "2018", month: "07", day: "01" },
        // last: { year: "2018", month: "08", day: "01" },
        // begin: { year: "2018", month: "07", day: "02" },
        // end: { year: "2018", month: "07", day: "03" },
        select: timestamp => {
          this.$set(this.selectTime, this.timeSelectIndex, timestamp);
          this.timeShow = false;
        }
      },
      timeShow: false,
      gameList: [],
      minDate: new Date(),
      maxDate: new Date(Date.now() + 60 * 60 * 24 * 30 * 2000),
      timeSelectIndex: 0,
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
        return state.match.time;
      },
      selectPerson(state) {
        return state.match.attendPerson;
      },
      selectGame(state) {
        return state.match.gameName;
      },
      selectAttendType(state) {
        return state.match.attendStyle;
      },
      prizeMsg(state) {
        return state.match.rankPrizes[0].prizes[0].name ||
          state.match.partSet[0].name
          ? "已选择"
          : "请填写";
      },
      shareMsg(state) {
        return state.match.shareImg ? "已选择" : "请选择";
      }
    })
  },
  created() {},
  methods: {
    //比赛开始时间格式化
    beginTimeFormate(time) {
      return time
        ? this.utils.timeFormate(time, "YY/MM/DD WW HH:mm")
        : "请选择";
    },
    formatter(type, value) {
      if (type === "year") {
        return value + "年";
      } else if (type === "month") {
        return value + "月";
      } else if (type === "day") {
        return value + "日";
      } else if (type === "hour") {
        return value + "时";
      } else if (type === "minute") {
        return value + "分";
      }
    },
    append(file) {
      let that = this;
      (async function() {
        let newFile = await that.compressImg(file.file);
        that.$toast.clear();
        let a = new FileReader();
        a.onload = function(e) {
          let data = e.target.result;
          that.$store.commit("setShareImg", data);
          that.$router.push("shareImg");
        };
        a.readAsDataURL(newFile);
      })();
    },
    timeSelect(index) {
      this.timeShow = true;
      this.timeSelectIndex = index;
    },
    toPrize() {
      if (this.selectPerson.id === 0) {
        return this.$toast("请先选择人数");
      }
      this.$store.commit("setTotalPrizes", null);
      this.$store.commit("setAttendTotalPrizes", null);
      this.$router.push("style/prizepreview");
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
      }
    },
    timeConfirm(value) {
      this.timeShow = false;
      let time = Math.round(new Date(this.currentDate).getTime() / 1000);
      console.log(time);
      this.$store.commit("setTime", time);
    },
    selectPersonClick(data) {
      if (this.selectGame.id == 0) {
        return this.$toast("请选择游戏");
      }
      this.$router.push({
        path: "style/matchType",
        query: {
          gameId: this.selectGame.id
        }
      });
    },
    attendStyleClick(data) {
      this.$store.commit("setAttendStyle", data);
    },
    saveClick() {
      this.submit(0);
    },
    checkClick() {
      /**
       * 对数据进行判空
       */
      let match = this.$store.state.match;
      let gameName = match.gameName;
      let isEdit = this.$store.state.match.isEdit;

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
      this.submit(1);
    },
    submit(type) {
      let isEdit = this.$store.state.match.isEdit;
      let action = "createMatch";
      let match = this.$store.state.match;
      let detail = match.detail;
      let gameName = match.gameName;

      //如果没有奖品的话则传空数组
      let rankingSet = match.rankPrizes;
      if (!match.rankPrizes[0].prizes[0].name) {
        rankingSet = [];
      }
      let partSet = match.partSet;
      if (!match.partSet[0].name) {
        partSet = [];
      }
      let params = {
        isAudit: type,
        title: detail.title,
        cover: detail.coverImg,
        content: detail.content,
        gameId: gameName.id,
        beginTime: match.time,
        templateId: match.attendPerson.templateId,
        signupType: match.attendStyle.id,
        prizePic: match.prizeCover,
        getPrizeWay: match.sendStyle,
        address: match.gainPrizeAddress.address,
        regionName: match.gainPrizeAddress.regionName,
        provinceId: match.gainPrizeAddress.provinceId,
        cityId: match.gainPrizeAddress.cityId,
        areaId: match.gainPrizeAddress.areaId,
        latitude: match.gainPrizeAddress.latitude,
        longitude: match.gainPrizeAddress.longitude,
        contact: match.gainPrizeAddress.contact,
        mobile: match.gainPrizeAddress.mobile,
        rankingSet: rankingSet,
        partSet: partSet
      };
      if (isEdit) {
        action = "editMatch";
        params.id = match.id;
      }
      this.http.match[action](params).then(res => {
        if (type == 1) {
          this.$router.push({
            path: "waitingCheck",
            query: {
              title: detail.title,
              isEdit: isEdit
            }
          });
        } else {
          if (isEdit) {
            this.$router.go(-3);
          } else {
            this.$router.go(-2);
          }
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
#style .van-cell {
  font-size: 0.34rem;
  padding: 0.3rem;
}
#style .van-cell__title {
  color: var(--font-color-black);
}
#style .van-cell__value {
  color: var(--font-color-gray);
  font-size: 0.32rem;
}
</style>


<style scoped>
#style {
  background-color: #f0f1f2;
}
.group {
  margin-bottom: 0.2rem;
}
.personGame {
  display: flex;
  justify-content: space-between;
}
.personGame span:nth-child(2) {
  color: var(--font-color-gray);
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


