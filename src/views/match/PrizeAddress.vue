<template>
  <div class="Address">
    <van-cell-group class="address">
      <van-cell title="所在地区" :value="address" is-link @click="select" />
      <van-field v-model="subAddress" label="详细地址" type="textarea" placeholder="街道、小区门牌等" rows="3" autosize/>
    </van-cell-group>
    <van-popup v-model="show" position="bottom">
      <van-area ref="van_area" :area-list="areaList" @confirm="onConfirm" @cancel="show=false" :value="areaId" />
    </van-popup>
    <button class="finish_btn" @click="finish">完成</button>
  </div>
</template>

<script>
import cityCode from "../../service/cityCode.js";
export default {
  data() {
    return {
      show: false,
      areaList: {},
      address: "",
      subAddress: "",
      areaId: "",
      addressCode: []
    };
  },
  methods: {
    select() {
      this.show = true;
    },
    onConfirm(value) {
      this.address = "";
      this.show = false;
      value.forEach(item => {
        this.address += item.name;
        this.addressCode.push(item.code);
      });
    },
    finish() {
      this.$store.commit("setgainPrizeAddress", {
        address: this.subAddress,
        regionName: this.address,
        provinceId: this.addressCode[0],
        cityId: this.addressCode[1],
        areaId: this.addressCode[2]
      });
      this.$router.go(-1);
    }
  },
  mounted() {
    this.areaList = cityCode;
    // 如果存在自提地址的话那么显示自提地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    if (gainPrizeAddress) {
      this.address = gainPrizeAddress.regionName;
      this.subAddress = gainPrizeAddress.address;
      return;
    }
    this.address = this.$store.state.user.userInfo.regionName;
    this.subAddress = this.$store.state.user.userInfo.address;
  }
};
</script>


<style>
.Address .van-cell__title {
  max-width: 90px;
}
.Address .van-cell__value {
  text-align: left;
}
</style>

<style scoped>
.Address::before {
  content: "";
  display: table;
}
.Address {
  position: relative;
}
.address {
  margin-top: 0.7rem;
}
.finish_btn {
  background-color: #fcc600;
  font-size: 0.32rem;
  font-weight: bold;
  height: 0.96rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
