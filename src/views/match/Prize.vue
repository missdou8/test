<template>
  <div class="prize">
    <div class="add-content">
      <van-uploader class="uploader" :after-read="onRead">
        <div class="addCover" v-show="prizeImageShow">
          <p class="add">
            <span class="add_img"></span>
            <span>添加店铺封面</span>
          </p>
        </div>
        <img class="cover-img" :src="coverImg" v-show="!prizeImageShow" alt="封面图片">
      </van-uploader>
    </div>
    <div class="rank">
      <div class="prize_info" v-for="(item,index) in rankList">
        <p class="prize_rank">第{{item.value}}名</p>
        <input class="prize_prize" type="text" placeholder="点击输入奖品名称，没有则不填" @blur="prizeInput(index,$event)">
        <div class="prize_value_content">
          <input class="prize_value" type="text" @blur="valueInput(index, $event)">
          <span class="prize_tag">元</span>
        </div>
      </div>
    </div>
    <p class="total_value">
      <span>
        共计
      </span>
      <span>{{totalPrize}}</span>元
    </p>
    <div class="send">
      <p class="send_title">请选择发奖方式</p>
      <radio-btn class="send_type" :data="sendStyle" @select="typeSelect"></radio-btn>
      <div class="address" v-show="addressShow">
        <p class="address_title">请选择自提地址</p>
        <van-cell class="address_info" :title="contact" :label="address" is-link center to="prize/address"></van-cell>
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
export default {
  data() {
    return {
      addressShow: false,
      prizeImageShow: true,
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
      coverImg: "",
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
        if (item.prize) {
          total += Number(item.prize);
        }
      });
      return total;
    }
  },
  created() {
    if (!this.$store.state.match.id) {
      this.$toast("需要选择游戏之后才可以设置奖品");
      setTimeout(() => {
        this.$emit("prizeShow", false);
      }, 2000);
      return;
    }
    if (!this.$store.state.match.attendPerson) {
      this.$toast("需要设置比赛规模后才可以设置奖品");
      setTimeout(() => {
        this.$emit("prizeShow", false);
      }, 2000);
    }
    // 检测自提地址是否存在，存在用自提地址，不存在用店铺地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    if (gainPrizeAddress) {
      this.address = gainPrizeAddress.regionName;
      this.subAddress = gainPrizeAddress.address;
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
        this.rankList = data.prizesList.map((item, index) => {
          let rankItem = item.rank.split(",").join("-");
          this.rankPrize[index] = {};
          this.rankPrize[index].rank = rankItem;
          return {
            id: item.index,
            value: rankItem
          };
        });
      });
  },
  methods: {
    onRead(file) {
      this.upload(file).then(src => {
        this.coverImg = src;
        this.prizeImageShow = false;
      });
    },
    cancelClick() {
      this.$emit("prizeShow", false);
    },
    saveClick() {
      /**
       * 判断是否可以保存
       */
      //判断是否存在图片
      if (!this.coverImg) {
        return this.$toast("请选择奖品图片");
      }
      console.log(this.rankPrize);
      this.$store.commit("setRankPrize", this.rankPrize);
      this.$store.commit("setIfSave", true);
      this.$router.go(-1);
    },
    prizeInput(index, evt) {
      let dom = evt.target;
      this.rankPrize[index].name = dom.value;
    },
    valueInput(index, evt) {
      let dom = evt.target;
      let obj = this.rankPrize[index];
      obj.prize = dom.value;
      this.$set(this.rankPrize, index, obj);
    },
    typeSelect(data) {
      if (data.id == 1) {
        return (this.addressShow = true);
      }
      this.addressShow = false;
    }
  }
};
</script>

<style scoped>
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
  background-color: #fafafa;
  height: 0.67rem;
  width: 1.76rem;
  margin-right: 0.1rem;
}
.prize_rank {
  text-align: left;
}
.prize_tag {
  flex-grow: 1;
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
  position: absolute;
  right: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
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

