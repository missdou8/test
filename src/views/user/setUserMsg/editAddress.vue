<template>
  <div id="editAddress">
    <van-cell-group>
      <van-cell class="btn_box">
        <van-button class="location_btn" size="small" @click="onLocation()"></van-button>
      </van-cell>
      <van-cell class="showAlert" title="所在地区" :value="areaMsg" is-link @click="showPopup()" />
      <van-field v-model="address" label="联系地址" type="textarea" placeholder="请输入详细地址，如街道、小区、楼栋号、单元室等" rows="3" autosize/>
    </van-cell-group>
    <van-popup v-model="show" position="bottom" :lazy-render="false">
      <van-area ref="van_area" :area-list="areaList" @confirm="onConfirm" @cancel="onCancel()" :value="areaId" />
    </van-popup>
    <dida-btn :btn-enable="btnEnable" @submetData="setUserShop()"></dida-btn>
    <dida-location ref="location" @getResData='getResData($event)'></dida-location>
  </div>
</template>
<script>
import cityCode from "../../../service/cityCode.js";
import { setTimeout } from "timers";
import didaBtn from "../../../components/didaBtn.vue";
import didaLocation from "../../../components/didaLocation.vue";
export default {
  data() {
    return {
      areaMsg: "", //省市区信息
      areaVal: {}, //地区插件值
      address: "", //详细地址
      areaId: "", //区id
      show: false,
      areaList: {},
      longitude: null, //经度
      latitude: null //维度
    };
  },
  computed: {
    btnEnable() {
      if (this.address && this.areaMsg) return false;
      return true;
    }
  },
  created() {
    //初始化城市列表
    this.areaList = cityCode;
    //获取传输数据
    this.address = this.$route.query.address;
    this.areaId = this.$route.query.areaId;
    this.areaMsg = this.$route.query.regionName;
  },
  mounted() {
    if(this.areaId=='') this.areaMsg = '请选择 请选择 请选择';
    else{
      let _value = this.$refs.van_area.getValues();
      this.onConfirm(_value);
    }
  },
  components: {
    didaLocation,
    didaBtn
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value) {
      this.areaMsg = "";
      this.areaVal = value;
      value.forEach(a => {
        this.areaMsg += `${a.name}  `;
      });
      this.onCancel();
    },
    onCancel() {
      this.show = false;
    },
    onLocation() {
      this.$toast.loading({duration: 0,message: '定位中...'});
      //提供一个缓冲定位时间
      setTimeout(() => {
          this.$refs.location.onLocation();
      }, 500);
    },
    getResData(resData) {
      this.address = resData.detailAddress;
      this.areaId = resData.detailAreaCode;
      this.longitude = resData.longitude;
      this.latitude = resData.latitude;
      setTimeout(() => {
        //获取van-area的value值
        let _value = this.$refs.van_area.getValues();
        this.onConfirm(_value);
      }, 100);
    },
    //发送请求
    setUserShop() {
      //重点一定要让用户定位成功才可以
      // if (this.longitude == null || this.latitude == null) {
      //   return this.$toast("请您重新定位");
      // } else {
        this.http.user
          .setUserShop({
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            provinceId: this.areaVal[0].code,
            cityId: this.areaVal[1].code,
            areaId: this.areaVal[2].code,
            regionName: this.areaMsg.replace(/\s+/g, "")
          })
          .then(res => {
            this.$dialog
              .alert({
                title: "嘀嗒比赛",
                message: res.msg
              })
              .then(() => {
                this.$router.go(-1);
              });
          });
      // }
    }
  }
};
</script>


<style scoped>
.btn_box {
  padding: 0 15px;
  background: #f5f5f5;
}
.location_btn {
  height: 0.45rem;
  width: 1.85rem;
  border: none;
  background-image: url(../../../assets/anniu_weizhi.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  bottom: 0;
  right: 15px;
}
</style>
<style>
#editAddress .btn_box .van-cell__value {
  height: 0.6rem;
  overflow: hidden;
}
#editAddress .van-cell__value {
  text-align: left;
  flex: 3;
}
#editAddress .van-cell__title {
  color: rgb(164, 164, 164);
}
</style>


