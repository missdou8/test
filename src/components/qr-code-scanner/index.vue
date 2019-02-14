
<template>
  <div id="qrCodeScanner">
    <button class="scanQR" @click="scanQR">
      <img src="../../assets/sousuo_icon_sao.png" alt="">
      扫一扫
    </button>
    <div ref="app__layout" class="app__layout">
      <van-nav-bar class="cancel_nav" title="二维码扫描" left-arrow @click-left="cancel" right-text="相册" @click-right="inputImg"/>
      <main class="app__layout-content">
        <video autoplay></video>
        <!-- capture表示，可以捕获到系统默认的设备，比如：camera--照相机；camcorder--摄像机；microphone--录音。 -->
        <input id="camera" type="file" capture="camera">
        <img ref="frame" id="frame" src="">
      </main>
    </div>
    <div class="app__overlay">
      <div class="app__overlay-frame"></div>
      <div ref="custom_scanner" class="custom-scanner"></div>
      <div class="app__help-text"></div>
    </div>
  </div>
</template>

<script>
import QRReader from './js/qrscan.js';
import { isWeChat} from "lputils";
import { clearTimeout } from 'timers';
export default {
  data() {
    return {};
  },
  created(){
    window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    window.isMediaStreamAPISupported = navigator && navigator.mediaDevices && 'enumerateDevices' in navigator.mediaDevices;
    window.noCameraPermission = false;
  },
  mounted(){
    QRReader.init(); //To initialize QR Scanner
  },
  props: [],
  methods: {
    scanQR(){
      if(isWeChat()){
        this.getWeixinScanner()
      }else{
        this.getHtmlScanner()
      }
      //设置一个失败时间，超过30秒后提示识别失败用户输入兑奖码
      this.Failure = setTimeout(()=>{
        this.$dialog.confirm({
          message: '二维码识别失败，请退出后重新扫描，或者前往输入兑奖码'
        }).then(() => {
          // 跳转搜索页
          this.$router.push("/user/exchange/inputCode");
        }).catch(() => {
          // on cancel
        });
      },10000)
    },
    getWeixinScanner(){ //微信扫码
      this.http.wechat.signPackage({url: location.href}).then(res => {
        let _this = this;
        let data = res.data;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function(){
          // 调用微信扫一扫接口
          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              //将扫描得到的内容抛出
              _this.$emit("getCode", result);
            }
          });
        });
        wx.error(function(res){
          alert(res)
        });
      });
    },
    //html5扫一扫
    getHtmlScanner(){
      this.$refs.app__layout.style.display = 'block'
      if(window.isMediaStreamAPISupported){
        this.scan();
      }
    },
    inputImg(){
      let frame = document.querySelector('#frame');
      this.$refs.custom_scanner.style.display = 'none';
      document.querySelector('#camera').click();
      //On camera change
      camera.addEventListener('change', event => {
        if (event.target && event.target.files.length > 0) {
          frame.className = 'app__overlay'; //显示图片
          frame.src = URL.createObjectURL(event.target.files[0]);
          if (!window.noCameraPermission) this.$refs.custom_scanner.style.display = 'block';
          this.scan(true);
        }
      });
    },
    scan(forSelectedPhotos = false) {
      // 如果有摄像头扫码就显示扫码动画
      if (window.isMediaStreamAPISupported && !window.noCameraPermission || forSelectedPhotos) {
        this.$refs.custom_scanner.style.display = 'block';
      }else{
        this.inputImg()
      }
      // 没有的话直接调用解码
      QRReader.scan(result => {
        //返回二维码信息
        this.$emit("getCode", result);
        this.$refs.custom_scanner.style.display = 'block';
      }, forSelectedPhotos);
    },
    cancel(){
      this.$refs.app__layout.style.display = 'none';
      this.$refs.custom_scanner.style.display = 'none';
      window.clearTimeout(this.Failure)
    }
  }
};
</script>
<style scoped>
#qrCodeScanner{
  z-index: 10000;
}
.cancel_nav{
  background: #666;
}
.scanQR{
  width: 100%;
  line-height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .35rem;
  background-color: rgb(20,20,20);
  color: rgb(255,211,33);
}
.scanQR img{
  width: .6rem;
  margin-right: .15rem;
}
.app__layout {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #666;
  top: 0;
  left: 0;
  display: none;
  z-index: 1000;
}

.app__layout-content {
  height: inherit;
}

video {
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
}
@keyframes scanner {
  0% {bottom: 100%;}
  50% {bottom: 0%;}
  100% {bottom: 100%;}
}

.custom-scanner {
  width: 100%;
  height: 2px;
  background: #4CAF50;
  position: absolute;
  transition: all 200ms linear;
  animation: scanner 3s infinite linear;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.4);
  display: none;
}

.app__overlay{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all 200ms ease-in;
  width: 320px;
  height: 320px;
  margin: auto;
  z-index: 2000;
}


.app__help-text{
  color: #fff;
  position: absolute;
  bottom: -70px;
  font-size: 18px;
  right: 0;
  text-align: center;
  user-select: none;
}

.app__help-text {
  display: none;
  left: 0;
}

.camera__icon,
.focus__icon {
  position: relative;
  left: 10px;
  display: none;
}


input[type='file'] {
  display: none;
}

.app__select-photos{
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  width: 60px;
  height: 60px;
  font-size: 15px;
  line-height: 60px;
  background: #00f;
  color: #fff;
  border-radius: 50%;
  text-align: center;
}

</style>

<style>
  #qrCodeScanner .van-nav-bar .van-icon{
      color:#bdbdbd;
  }
  #qrCodeScanner .van-hairline--bottom::after{
    border-bottom-width:0px;
  }
  #qrCodeScanner .van-nav-bar__title,#qrCodeScanner .van-nav-bar__text{
    color:#fff;
  }
  #qrCodeScanner .van-nav-bar__text:active{
    background-color:inherit;
  }
</style>
