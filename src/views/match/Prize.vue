<template>
  <div class="prize">
    <div class="top">
      <div class="add-content">
        <van-uploader class="uploader" :after-read="onRead">
          <div class="addCover" v-show="prizeImageShow">
            <p class="add">
              <span class="add_img"></span>
              <span>添加奖品封面</span>
            </p>
          </div>
          <img class="cover-img" :src="coverImg" v-show="!prizeImageShow" alt="封面图片">
        </van-uploader>
      </div>
      <div class="rank">
        <div class="prize_info" v-for="(item,index) in rankList">
          <p class="prize_rank">第{{item.value}}名</p>
          <div class="prize_value_content">
            <input class="prize_prize" type="text" placeholder="点击输入奖品名称" v-model="rankPrize[index].name" @blur="prizeInput(index,'name',$event)">
            <input class="prize_prize" type="text" placeholder="数量" v-model="rankPrize[index].prizeCount" @blur="prizeInput(index,'prizeCount',$event)">
            <input class="prize_prize" type="text" placeholder="单位" v-model="rankPrize[index].unit" @blur="prizeInput(index,'unit',$event)">
            <input class="prize_value" v-model="rankPrize[index].price" type="number" @blur="valueInput(index, $event)">
            <span class="prize_tag">元</span>
          </div>
        </div>
      </div>
      <p class="total_value">
        <span>
          共计
        </span>
        <span>{{ totalPrize}}</span>元
      </p>
      <div class="send">
        <p class="send_title">请选择发奖方式</p>
        <radio-btn class="send_type" :data="sendStyle" @select="typeSelect" :selected="sendType"></radio-btn>
        <div class="address" v-show="addressShow">
          <p class="address_title">请选择自提地址</p>
          <van-cell class="address_info" :title="contact" :label="address" is-link center @click="toAddress"></van-cell>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="saveClick">保存</button>
      <button @click="cancelClick">取消</button>
    </div>
  </div>
</template>

<script>
import RadioBtn from "../../components/RadioBtn.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      rankList: [],
      rankPrize: [],
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
  components: {
    RadioBtn
  },
  computed: {
    totalPrize() {
      let total = 0;
      this.rankPrize.forEach(item => {
        if (item.price) {
          total += Number(item.price);
        }
      });
      return total;
    },
    ...mapState({
      coverImg(state) {
        return state.match.prizeCover;
      },
      prizeImageShow(state) {
        return state.match.prizeCover ? false : true;
      },
      sendType(state) {
        return state.match.sendStyle;
      },
      addressShow(state) {
        if (state.match.sendStyle == 1) {
          return true;
        }
        return false;
      }
    })
  },
  created() {
    if (!this.$store.state.match.gameName.id) {
      this.$toast("需要选择游戏之后才可以设置奖品");
      return;
    }
    if (!this.$store.state.match.attendPerson) {
      this.$toast("需要设置比赛规模后才可以设置奖品");
    }
    // 检测自提地址是否存在，存在用自提地址，不存在用店铺地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    if (gainPrizeAddress) {
      this.address = gainPrizeAddress.regionName + gainPrizeAddress.address;
    } else {
      this.address =
        this.$store.state.user.userInfo.regionName +
        this.$store.state.user.userInfo.address;
    }
    this.contact =
      this.$store.state.user.userInfo.name +
      " " +
      this.$store.state.user.userInfo.mobile;
    this.http.match
      .prizesList({
        templateId: this.$store.state.match.attendPerson
      })
      .then(res => {
        let data = res.data;
        // 如果有奖品名称或者价值的话，那么说明页面本有数据，进行赋值
        let state = this.$store.state.match.rankPrize;
        let flag = false;
        state.forEach((item, index) => {
          if (item.name || item.prize) {
            flag = true;
          }
        });

        if (flag) {
          this.rankPrize = state;
        }

        this.rankList = data.prizesList.map((item, index) => {
          let rankItem = item.rank.split(",").join("-");
          if (!flag) {
            this.rankPrize[index] = {};
            this.rankPrize[index].rank = rankItem;
            this.rankPrize[index].index = item.index;
          }
          return {
            id: item.index,
            value: rankItem,
            name: ""
          };
        });
      });
  },
  methods: {
    onRead(file) {
      this.upload(file, src => {
        this.$store.commit("setPrizeCover", src);
      });
    },
    cancelClick() {
      this.$router.go(-1);
    },
    saveClick() {
      /**
       * 判断是否可以保存
       */
      //判断是否存在图片
      if (!this.coverImg) {
        return this.$toast("请选择奖品图片");
      }
      //判断是否每个奖品都填写了
      let canSave = false;
      this.rankPrize.forEach(item => {
        if (!item.name || !item.price || !item.prizeCount || !item.unit) {
          canSave = true;
        }
      });
      if (canSave) {
        return this.$toast("奖品没有填写完整");
      }
      if (
        this.$store.state.match.sendStyle != 0 &&
        this.$store.state.match.sendStyle != 1
      ) {
        return this.$toast("请选择邮寄方式");
      }
      this.$store.commit("setIfSave", true);
      this.$router.go(-1);
    },
    prizeInput(index, type, evt) {
      let dom = evt.target;
      this.rankPrize[index][type] = dom.value;
    },
    valueInput(index, evt) {
      let dom = evt.target;
      let obj = this.rankPrize[index];
      obj.price = dom.value;
      this.$set(this.rankPrize, index, obj);
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setRankPrize", this.rankPrize);
    next();
  }
};
</script>

<style scoped>
.top {
  padding-bottom: 1.5rem;
  height: 100%;
  overflow-y: auto;
}
/* 设置padding */
.add-content,
.rank,
.total_value,
.send {
  background-color: #fff;
  padding: 0 0.3rem;
}

.prize {
  text-align: center;
}
.uploader {
  color: #fff;
  margin: 0.3rem 0;
  width: 100%;
}
.addCover {
  background-color: #000;
  border-radius: 0.1rem;
  margin: 0.3rem;
  padding: 0.3rem;
}
.cover-img {
  height: 2.65rem;
  vertical-align: middle;
}
.add {
  color: #ffd321;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.3rem;
  font-weight: bold;
}
.add_img {
  background: url("../../assets/img_add.png") center/100% 100% no-repeat;
  height: 0.39rem;
  width: 0.49rem;
  margin-right: 0.1rem;
}
.prize_info {
  display: flex;
  flex-direction: column;
  position: relative;
}

.prize_value {
  height: 0.67rem;
  width: 1.76rem;
  margin-right: 0.1rem;
}
.prize_rank {
  text-align: left;
}

.total_value {
  color: #ff0000;
  font-size: 0.36rem;
  padding: 0.16rem 0.5rem 0.16rem 0;
  text-align: right;
}
.total_value span:first-child {
  color: #151c21;
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

.add-content {
  padding-top: 0.2rem;
}
.prize_value_content {
  display: flex;
}
.prize_value_content input {
  height: 0.67rem;
  width: 0;
  background-color: #fafafa;
  flex: 1;
  margin-right: 0.15rem;
  padding: 0 0.12rem;
}
.prize_value_content input:first-child {
  flex-grow: 4;
}
.prize_value_content input:nth-child(4) {
  flex-grow: 1.5;
}

/* 名次 */
.rank {
  margin-top: 0.2rem;
}
.rank::before {
  content: "";
  display: table;
}
.rank::after {
  content: "";
  display: table;
}
.rank > div {
  margin: 0.2rem 0;
}
.send {
  margin-top: 0.2rem;
}
.send_title {
  font-size: 0.3rem;
  padding: 0.18rem 0;
}
.send_type {
  text-align: left;
  padding: 0.3rem 0;
}
.footer {
  background-color: #fff;
  padding: 0.2rem 0;
  position: absolute;
  bottom: 0;
  left: 0;
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
  border: 0.01rem solid #ffde00;
}
.address_title {
  font-size: 0.3rem;
}

.address_info_name {
  font-size: 0.32rem;
  margin: 0.1rem 0;
}

.address_info {
  margin-left: -15px;
}
</style>

