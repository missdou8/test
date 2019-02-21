<template>
  <div id="GetLocation">
    <div class="input_box">
      <input id="pickerInput" placeholder="输入关键字选取地点">
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  /**
   * longitude 经度
   * latitude  维度
   */
  props: ["longitude", "latitude"],
  created() {
    //提供一个缓冲定位时间
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: "定位中..."
    });
    //直接调用定位
    setTimeout(() => {
      //如果有经纬度则按照经纬度定位，如果没有则当前定位
      if (this.longitude && this.latitude) {
        this.dragSiteSelection(15, [this.longitude, this.latitude]);
      } else {
        this.getLocation();
      }
      //开启搜索定位
      this.searchSiteSelection();
    }, 1000);
  },
  methods: {
    getLocation() {
      let _this = this;
      /***************************************
        由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
        //如果报错Geolocation permission denied 是因为访问域名不是安全域名
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
        // 获取经纬度来在地图上显示位置
        _this.dragSiteSelection(15, [
          data.position.getLng(),
          data.position.getLat()
        ]);
      }
      //解析定位错误信息
      function onError(data) {
        _this.$toast.clear();
        _this.$toast("定位失败请输入详细地址搜索定位");
      }
    },
    setLngAndlat(city) {
      let _this = this;
      let map = new AMap.Map("container", {
        resizeEnable: true
      });
      let placeSearch = new AMap.DistrictSearch(); //构造地点查询类
      //详情查询
      placeSearch.search(city, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          let data = [
            result.districtList[0].center.lng, //经度
            result.districtList[0].center.lat //维度
          ];
          _this.dragSiteSelection(15, data);
          _this.$emit("getLngAndlat", data);
        }
      });
    },
    //通过搜索来获取定位信息
    searchSiteSelection() {
      let that = this;
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        let poiPicker = new PoiPicker({
          input: "pickerInput"
        });
        //初始化poiPicker
        window.poiPicker = poiPicker;
        //选取了某个POI
        poiPicker.on("poiPicked", function(poiResult) {
          let poi = poiResult.item.location.toString().split(",");
          that.dragSiteSelection(15, poi);
        });
      });
    },
    //拖拽位置选择(可以根据经纬度来显示初始化位置)
    dragSiteSelection(zoom, center) {
      let tant = this;
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        let map = new AMap.Map("container", {
          zoom: zoom,
          resizeEnable: true,
          center: center
        });
        let positionPicker = new PositionPicker({
          mode: "dragMap", //设定为拖拽地图模式，可选'dragMap[拖拽地图]'、'dragMarker[拖拽点]'，默认为'dragMap'
          map: map
        });
        positionPicker.on("success", function(positionResult) {
          //定位成功的时候关闭lading
          tant.$toast.clear();
          let resData = {
            longitude: positionResult.position.lng, // 经度
            latitude: positionResult.position.lat, // 维度
            detailAddress: positionResult.address || "请输入详细地址" // 详细地址
          };
          if (positionResult.regeocode.addressComponent.adcode)
            resData.detailAreaCode =
              positionResult.regeocode.addressComponent.adcode;
          else resData.detailAreaCode = "";
          //抛出一个方法用来进行数据操作
          tant.$emit("getResData", resData);
        });
        positionPicker.on("fail", function(positionResult) {
          tant.$toast.clear();
          // 海上或海外无法获得地址信息
          tant.$toast("选址失败请稍后重试");
        });
        positionPicker.start();
      });
    }
  }
};
</script>

<style scoped>
#GetLocation {
  padding-top: 44px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
#GetLocation .input_box {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0.1rem 0.3rem;
}
#pickerInput {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0.6rem;
  padding: 0.1rem 0.4rem;
}
#container {
  width: 100%;
  height: 100%;
}
</style>

<style>
#GetLocation .amap-logo,
#GetLocation .amap-copyright {
  display: none !important;
}
#GetLocation .dock-bottom {
  text-align: left;
}
#GetLocation .amap-ui-poi-picker-sugg-container {
  height: 4.6rem;
  width: 100% !important;
  left: 0 !important;
  top: 0.8rem !important;
}
</style>