<template>
  <div class="prize_preview">
    <section>
      <h1 class="preview_title">名次奖</h1>
      <prize-cell
        class="cell"
        :class="{error: errorArr.includes(index)}"
        v-for="(item,index) in rankPrizes"
        :key="`rank${index}`"
        :cellData="item"
        @toEdit="toEdit(index)"
        :edit="true"
      ></prize-cell>
      <div class="more_add" v-if="showAdd">
        <p class="add_detail" @click="addMore">继续添加名次奖</p>
      </div>
    </section>
    <section>
      <div class="attend_prize">
        <span class="preview_title">参与奖</span>
        <button class="cell_edit" @click="toAttendEdit"></button>
      </div>
      <attend-cell
        class="prize_cell"
        v-for="(item, index) in attendPrizes"
        :key="`rank${index}`"
        :cellData="item"
      ></attend-cell>
      <p class="attend_total">共{{attendTotal}}元</p>
    </section>
    <section class="send" :class="{cannot: !rankPrizes[0].prizes[0].name}">
      <h1 class="preview_title">领奖方式</h1>
      <radio-btn
        class="send_type"
        :class="{send_type_no: !rankPrizes[0].prizes[0].name}"
        :data="sendStyle"
        @select="typeSelect"
        :selected="sendType"
      ></radio-btn>
      <div class="address" v-show="addressShow > 0">
        <p class="address_title">请选择自提地址</p>
        <van-cell
          class="address_info"
          :title="contact"
          :label="address"
          is-link
          center
          @click="toAddress"
        ></van-cell>
      </div>
    </section>
    <dida-button class="btn_content" @click="saveClick">保存</dida-button>
  </div>
</template>

<script>
import PrizeCell from "../../components/PrizeCell";
import AttendCell from "./components/AttendCell";
import RadioBtn from "../../components/RadioBtn.vue";
import DidaButton from "../../components/DidaButton";
import { mapState } from "vuex";
export default {
  components: {
    PrizeCell,
    RadioBtn,
    DidaButton,
    AttendCell
  },
  data() {
    return {
      sendStyle: [
        {
          id: 0,
          value: "邮寄"
        },
        {
          id: 1,
          value: "客户自取"
        }
        // {
        //   id: 3,
        //   value: "到店使用"
        // }
      ],
      address: "",
      contact: "",
      addressShow: 0
    };
  },
  computed: {
    ...mapState({
      sendType(state) {
        return state.match.sendStyle;
      },
      rankPrizes(state) {
        if (!state.match.totalPrizes) {
          this.$store.commit(
            "setTotalPrizes",
            JSON.parse(JSON.stringify(state.match.rankPrizes))
          );
        }
        return state.match.totalPrizes;
      },
      attendPrizes(state) {
        if (!state.match.attendTotalPrizes) {
          this.$store.commit(
            "setAttendTotalPrizes",
            JSON.parse(JSON.stringify(state.match.partSet))
          );
        }
        return state.match.attendTotalPrizes;
      },
      attendTotal(state) {
        let data = state.match.attendTotalPrizes;
        if (data[0].price) {
          return data.reduce((prev, cur) => {
            return prev + Number(cur.price) * Number(cur.prizeCount);
          }, 0);
        } else {
          return 0;
        }
      }
    }),
    showAdd() {
      return this.rankPrizes[0].prizes[0].name;
    },
    errorArr() {
      /**
       * 每次都要检查当前奖品的排序是否正确
       */
      let errorArr = [];
      for (let index = 0; index < this.rankPrizes.length; index++) {
        const rankPrize = this.rankPrizes[index];
        if (index === 0) {
          continue;
        } else {
          if (
            rankPrize.beginRank !=
            Number(this.rankPrizes[index - 1].endRank) + 1
          ) {
            errorArr.push(index);
          }
        }
      }
      return errorArr;
    }
  },
  created() {
    //自提地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    this.address = gainPrizeAddress.regionName + gainPrizeAddress.address;
    if (gainPrizeAddress.contact) {
      return (this.contact =
        gainPrizeAddress.contact + " " + gainPrizeAddress.mobile);
    }
    this.contact =
      this.$store.state.user.userInfo.name +
      " " +
      this.$store.state.user.userInfo.mobile;
  },
  mounted() {
    this.addressShow = this.$store.state.match.sendStyle;
  },
  methods: {
    addMore() {
      /**
       * 添加新的空奖品
       * 先要检查当前名次是否正确，如果存在空缺，那么添加的时候首先补全空缺
       * 当前名次正确，取最后一名
       */
      let currentIndex =
        this.rankPrizes[this.rankPrizes.length - 1].endRank + 1;
      let lastIndex = this.rankPrizes.length;
      for (let index = 0; index < this.rankPrizes.length; index++) {
        const rankPrize = this.rankPrizes[index];
        if (index === 0) {
          continue;
        } else {
          if (rankPrize.beginRank != this.rankPrizes[index - 1].endRank + 1) {
            currentIndex = this.rankPrizes[index - 1].endRank + 1;
            lastIndex = index;
          }
        }
      }
      this.rankPrizes.splice(lastIndex, 0, {
        beginRank: currentIndex,
        endRank: currentIndex,
        ispartInPrize: 0,
        prizes: [
          {
            name: null,
            price: null,
            prizeCount: null,
            icon: null
          }
        ]
      });
    },
    typeSelect(data) {
      this.addressShow = data.id;
      //如果没有选择自提地址并且自提地址为空，那么地址为商家地址
      if (data.id == 1 && this.$store.state.match.gainPrizeAddress) {
        let userInfo = this.$store.state.user.userInfo;
        this.$store.commit("setgainPrizeAddress", {
          address: userInfo.address,
          regionName: userInfo.regionName,
          provinceId: userInfo.provinceId,
          cityId: userInfo.cityId,
          areaId: userInfo.areaId,
          mobile: userInfo.mobile,
          contact: userInfo.name
        });
      }
    },
    toAddress() {
      this.$router.push({
        path: "prize/address",
        query: { type: this.addressShow }
      });
    },
    toEdit(index) {
      /**
       * 在编辑之前对名次信息进行矫正
       */
      let correctIndex = index;
      let correctData = JSON.parse(JSON.stringify(this.rankPrizes));
      //首先清空编辑的数据
      this.$store.commit("setCurrentRankData", null);
      if (this.errorArr.includes(index)) {
        correctData[index].beginRank = correctData[index].endRank =
          correctData[index - 1].endRank + 1;
        this.$store.commit("setCurrentRankData", correctData[index]);
      }
      this.$router.push({
        path: "/match/style/prizepreview/prizesetting",
        query: {
          index: correctIndex
        }
      });
    },
    toAttendEdit(data) {
      //首先清空编辑的数据
      this.$store.commit("setAttendCurrentRankData", null);
      this.$router.push({
        path: "/match/style/prizepreview/attendsetting"
      });
    },
    saveClick() {
      if (this.errorArr.length > 0) {
        return this.$toast("奖品名次存在错误");
      }
      /**
       * 判断有无奖品
       * 如果有参与奖，那么参与奖需要设置
       * 判断是否所有奖品填写完整
       */
      let attendFlag = false;
      let fullFilled = false;

      this.rankPrizes.forEach((rankPrize, index) => {
        if (rankPrize.ispartInPrize) {
          this.attendFlag = true;
        }
        rankPrize.prizes.forEach(item => {
          if (!item.name && index != 0) {
            fullFilled = true;
          }
        });
      });
      if (fullFilled) {
        return this.$toast("您尚有奖品未填写");
      }
      if (this.attendFlag && !this.attendPrizes[0].name) {
        return this.$toast("参与奖没有填写 ");
      }
      if (!this.rankPrizes[0].prizes[0].name) {
        return this.$dialog
          .confirm({
            message: "您未添加奖品信息，无人获奖哦！",
            confirmButtonText: "继续添加",
            cancelButtonText: "本场比赛不发奖"
          })
          .then(() => {})
          .catch(() => {
            this.$store.commit("setRankPrizes", [
              {
                beginRank: 1,
                endRank: 1,
                ispartInPrize: 0,
                prizes: [
                  {
                    name: null,
                    price: null,
                    prizeCount: null,
                    icon: null
                  }
                ]
              }
            ]);
            this.$router.go(-1);
          });
      } else {
        if (this.addressShow == -1) {
          return this.$toast("请选择获奖方式");
        }
        //替换本页原始数据，返回上一页
        this.$store.commit("setSendStyle", this.addressShow);
        this.$store.commit("setRankPrizes", this.rankPrizes);
        this.$store.commit("setPartSet", this.attendPrizes);
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.prize_preview {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
}
section {
  background-color: #fff;
  padding: 0.14rem 0.17rem;
  margin-top: 0.2rem;
}
section h1 {
  font-size: var(--font-size-bigger);
}
.send_type {
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 0;
}
.send_type_no {
  background-color: #f9f9f9;
  border: 1px dashed #d8d8d8;
}
.send,
.address {
  text-align: left;
}
.prize_img {
  width: 100%;
}
.send-style {
  display: flex;
  font-size: 0.2rem;
  justify-content: space-around;
}
.btn_content {
  margin: 0.3rem auto;
}
.cannot {
  pointer-events: none;
}
.more_add {
  background-color: #f9f9f9;
  border: 1px dotted #d8d8d8;
  display: flex;
  justify-content: center;
  padding: 0.2rem 0.23rem;
  margin: 0.21rem 0 0;
}
.add_detail {
  background: url("../../assets/prize_add_more.png") no-repeat;
  color: #135ada;
  font-size: 0.28rem;
  background-size: 0.32rem 0.32rem;
  background-position: left center;
  padding-left: 0.4rem;
}
.attend_prize {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cell_edit {
  background: url("../../assets/prize_edit_icon.png") no-repeat;
  background-size: cover;
  height: 0.3rem;
  width: 0.3rem;
  margin-right: 0.36rem;
}
.attend_total {
  text-align: right;
  padding-right: 0.18rem;
}
.error {
  background-color: #fff5f5;
  border-left: 1px solid #ff8787;
  padding-bottom: 0;
}
.error::after {
  background-color: #fffbeb;
  content: "该条名次信息有误，请重新编辑";
  display: block;
  padding-left: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
}
.preview_title {
  color: 111;
  font-size: 0.32rem;
  margin-bottom: 0.1rem;
}
</style>

