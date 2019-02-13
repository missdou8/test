<template>
  <div class="prize_preview">
    <section>
      <h1>名次奖</h1>
      <prize-cell
        class="cell"
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
        <span>参与奖</span>
        <button class="cell_edit" @click="toEdit"></button>
      </div>
      <attend-cell
        class="prize_cell"
        v-for="(item, index) in attendPrizes"
        :key="`rank${index}`"
        :cellData="item"
        @toEdit="toAttendEdit(index)"
      ></attend-cell>
      <p class="attend_total">共{{attendTotal}}元</p>
    </section>
    <section class="send" :class="{cannot: !rankPrizes[0].prizes[0].name}">
      <h1 class="send_title">领奖方式</h1>
      <radio-btn class="send_type" :data="sendStyle" @select="typeSelect" :selected="sendType"></radio-btn>
      <div class="address" v-show="addressShow">
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
    <div class="btn_content">
      <dida-button @click="saveClick">保存</dida-button>
    </div>
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
      ],
      address: "",
      contact: ""
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
        console.log(state.match.attendTotalPrizes);
        return state.match.attendTotalPrizes;
      },
      addressShow(state) {
        if (state.match.sendStyle == 1) {
          return true;
        }
        return false;
      },
      attendTotal(state) {
        let data = state.match.attendTotalPrizes;
        return data.reduce((prev, cur) => {
          return prev + Number(cur.price);
        }, 0);
      }
    }),
    showAdd() {
      return this.rankPrizes[0].prizes[0].name;
    }
  },
  created() {
    //自提地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    this.address = gainPrizeAddress.regionName + gainPrizeAddress.address;
    this.contact =
      this.$store.state.user.userInfo.name +
      " " +
      this.$store.state.user.userInfo.mobile;
  },
  methods: {
    addMore() {
      /**
       * 取出当前的最后一名
       */
      let currentIndex =
        this.rankPrizes[this.rankPrizes.length - 1].endRank + 1;
      this.rankPrizes.push({
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
      this.$store.commit("setSendStyle", data.id);
      //如果没有选择自提地址并且自提地址为空，那么地址为商家地址
      if (data.id == 1 && this.$store.state.match.gainPrizeAddress) {
        let userInfo = this.$store.state.user.userInfo;
        this.$store.commit("setgainPrizeAddress", {
          address: userInfo.address,
          regionName: userInfo.regionName,
          provinceId: userInfo.provinceId,
          cityId: userInfo.cityId,
          areaId: userInfo.areaId
        });
      }
    },
    toAddress() {
      this.$router.push("prize/address");
    },
    toEdit(data) {
      //首先清空编辑的数据
      this.$store.commit("setCurrentRankData", null);
      this.$router.push({
        path: "/match/style/prizepreview/prizesetting",
        query: {
          index: data
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
      // 判断有无奖品
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
        //替换本页原始数据，返回上一页
        this.$store.commit("setRankPrizes", this.rankPrizes);
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
}
section {
  background-color: #fff;
  padding: 0.14rem;
  margin-top: 0.2rem;
}
section h1 {
  font-size: var(--font-size-bigger);
}
/* 领奖方式 */
.send_title {
  font-size: 0.3rem;
  padding: 0.18rem 0;
}
.send_type {
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 0;
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
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding-right: 0.56rem;
}
</style>

