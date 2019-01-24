<template>
  <div>
    <section>
      <h1>名次奖</h1>
      <prize-cell v-for="(item,index) in rankPrizes" :key="`rank${index}`" :cellData="item"></prize-cell>
    </section>
    <section>
      <h1>参与奖</h1>
      <prize-cell v-for="(item, index) in rankPrizes" :key="`rank${index}`" :cellData="item"></prize-cell>
    </section>
    <section class="send">
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
    <dida-button @click="saveClick">保存</dida-button>
  </div>
</template>

<script>
import PrizeCell from "../../components/PrizeCell";
import RadioBtn from "../../components/RadioBtn.vue";
import DidaButton from "../../components/DidaButton";
import { mapState } from "vuex";
export default {
  components: {
    PrizeCell,
    RadioBtn,
    DidaButton
  },
  data() {
    return {
      addressShow: false, //地址是否显示
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
        return state.match.rankPrizes;
      }
    })
  },
  methods: {
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
    saveClick() {
      console.log("这里是保存哈哈哈");
    }
  }
};
</script>

<style scoped>
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
  text-align: left;
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
</style>

