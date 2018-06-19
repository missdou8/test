<template>
    <div id="editAddress">
      <van-cell-group>
        <van-cell class="btn_box">
           <van-button class="location_btn" size="small" @click="onLocation()">获取当前定位</van-button>
        </van-cell>
        <van-cell class="showAlert" title="所在地区" :value="address" is-link @click="showPopup()"/>
        <van-field v-model="detail_address" label="联系地址" type="textarea" placeholder="请输入详细地址，如街道、小区、楼栋号、单元室等" rows="3" autosize/>
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :lazy-render="false">
        <van-area ref="van_area" :area-list="areaList"  @confirm="onConfirm" @cancel="onCancel()" :value="detail_area"/>
      </van-popup>
      <div id='container'></div>
    </div>
</template>
<script>
import cityCode from "../../../service/cityCode.js";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      address: "",
      detail_address: "",
      detail_area: "",
      show: false,
      areaList: {}
    };
  },
  created() {
    this.areaList = cityCode;
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://webapi.amap.com/maps?v=1.4.6&key=4851ba7a49267a6ed906605fa1e2970c"; // 高德地图
    document.body.appendChild(script);
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value) {
      this.address = "";
      value.forEach(a => {
        this.address += `${a.name}  `;
      });
      this.onCancel();
    },
    onCancel() {
      this.show = false;
    },
    onLocation() {
      let _this = this;
      /***************************************
        由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
        ***************************************/
      let map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true
      });
      map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB"
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
      //解析定位结果
      function onComplete(data) {
        let resData = {
          longitude: data.position.getLng(), //经度
          latitude: data.position.getLat(), //维度
          detailAddress: data.formattedAddress || "", //详细地址
          detailAreaCode: data.addressComponent.adcode || "" //所在城市编号
        };
        _this.detail_address = resData.detailAddress;
        _this.detail_area = resData.detailAreaCode;
        setTimeout(() => {
          let _value = _this.$refs.van_area.getValues();
          _this.onConfirm(_value);
        }, 100);
      }
      //解析定位错误信息
      function onError(data) {
        alert("定位失败请输入详细地址信息");
      }
    }
  }
};
</script>


<style scoped>
#editAddress {
  height: 100%;
}
</style>
<style>
#editAddress .btn_box .van-cell__value {
  text-align: right;
}
#editAddress .showAlert .van-cell__value {
  text-align: left;
  flex: 3;
}
</style>


