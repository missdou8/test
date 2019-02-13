<template>
  <div class="Address">
    <dida-location
      class="location_box"
      ref="location"
      @getResData="getResData($event)"
      @getLngAndlat="getLngAndlat($event)"
    ></dida-location>
    <van-cell-group class="address">
      <van-cell title="所在地区" :value="address" is-link @click="select"/>
      <van-field
        v-model="subAddress"
        label="详细地址"
        type="textarea"
        placeholder="街道、小区门牌等"
        rows="3"
        autosize
      />
    </van-cell-group>
    <van-field class="address_cell" v-model="contact" label="联系人姓名" placeholder="联系人姓名"/>
    <van-field class="address_cell" v-model="mobile" label="联系人电话" placeholder="联系人电话" type="type"/>
    <van-popup v-model="show" position="bottom" :lazy-render="false">
      <van-area
        ref="van_area"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="show=false"
        :value="areaId"
      />
    </van-popup>
    <button class="finish_btn" @click="finish">完成</button>
  </div>
</template>

<script>
import cityCode from "../../service/cityCode.js";
import didaLocation from "../../components/didaLocation.vue";
export default {
  data() {
    return {
      show: false,
      areaList: {},
      address: "",
      subAddress: "",
      areaId: "",
      addressCode: [],
      longitude: null, //经度
      latitude: null, //维度,
      mobile: null,
      contact: null
    };
  },
  components: { didaLocation },
  methods: {
    getLngAndlat(resData) {
      this.longitude = resData[0];
      this.latitude = resData[1];
    },
    getResData(resData) {
      this.subAddress = resData.detailAddress;
      this.areaId = resData.detailAreaCode;
      this.longitude = resData.longitude;
      this.latitude = resData.latitude;
      setTimeout(() => {
        //获取van-area的value值
        if (this.areaId == "") this.address = "请选择 请选择 请选择";
        else {
          let _value = this.$refs.van_area.getValues();
          this.onConfirm(_value, false);
        }
      }, 100);
    },
    select() {
      this.show = true;
    },
    onConfirm(value, type) {
      this.address = "";
      this.show = false;
      value.forEach(item => {
        this.address += item.name;
        this.addressCode.push(item.code);
      });
      //如果地址是手动填写的
      if (type) {
        this.$refs.location.setLngAndlat(this.addressCode[2].code);
      }
    },
    finish() {
      if (!this.contact) {
        return this.$toast("请输入联系人姓名");
      }
      if (!this.mobile || !/^1[34578]\d{9}$/.test(this.mobile)) {
        return this.$toast("请输入正确的手机号");
      }
      this.$store.commit("setgainPrizeAddress", {
        address: this.subAddress,
        regionName: this.address,
        provinceId: this.addressCode[0],
        cityId: this.addressCode[1],
        areaId: this.addressCode[2],
        latitude: this.latitude,
        longitude: this.longitude,
        contact: this.contact,
        mobile: this.mobile
      });
      this.$router.go(-1);
    }
  },
  created() {
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    this.areaId = gainPrizeAddress.areaId;
  },
  mounted() {
    //初始化地区选择器
    this.areaList = cityCode;
    // 如果存在自提地址的话那么显示自提地址
    let gainPrizeAddress = this.$store.state.match.gainPrizeAddress;
    if (gainPrizeAddress) {
      this.address = gainPrizeAddress.regionName;
      this.subAddress = gainPrizeAddress.address;
      this.contact = gainPrizeAddress.contact;
      this.mobile = gainPrizeAddress.mobile;
      this.$nextTick(() => {
        let _value = this.$refs.van_area.getValues();
        this.onConfirm(_value, true);
      });
      return;
    }
    this.address = this.$store.state.user.userInfo.regionName;
    this.subAddress = this.$store.state.user.userInfo.address;
    this.areaId = this.$store.state.user.userInfo.areaId;
    this.mobile = this.$store.state.user.userInfo.mobile;
    this.contact = this.$store.state.user.userInfo.name;
    this.$nextTick(() => {
      let _value = this.$refs.van_area.getValues();
      this.onConfirm(_value, true);
    });
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
.location_box {
  width: 100%;
  height: 5.4rem;
}
.address_cell {
  margin-top: 0.2rem;
}
</style>
