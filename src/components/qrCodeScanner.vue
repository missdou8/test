
<template>
  <div id="qrCodeScanner">
    <button class="scanQR" @click="scanQR">
      <img src="../assets/sousuo_icon_sao.png" alt="">
      扫一扫
    </button>
    <div ref="app__layout" class="app__layout">
      <van-nav-bar class="cancel_nav" title="二维码扫描" left-arrow @click-left="cancel" right-text="相册" @click-right="inputImg"/>
      <main class="app__layout-content">
        <!-- 移动设备扫码 -->
        <qrcode-stream v-if="mobile" @decode="onDecode1" @init="onInit" />
        <!-- 桌面设备扫码 -->
        <qrcode-capture ref="camera" id="camera" @decode="onDecode2" />
        <img ref="frame" id="frame" src="">
      </main>
    </div>
    <div ref="app__overlay" class="app__overlay">
      <div class="app__overlay-frame"></div>
      <div ref="custom_scanner" class="custom-scanner"></div>
      <div class="app__help-text"></div>
    </div>
  </div>
</template>
<script>
import { isWeChat,isAndroid,isIos} from "lputils";
import { clearTimeout, setInterval, setTimeout } from 'timers';
// 二维码扫描组件
import {QrcodeCapture, QrcodeStream} from 'vue-qrcode-reader'
export default {
  data() {
    return {
      result:'',
      error:'', //扫码错误
      mobile:false, //判断是否为移动端
    };
  },
  created(){},
  mounted(){},
  props: [],
  components:{
    QrcodeStream,
    QrcodeCapture
  },
  methods: {
    onDecode1 (result) {
      this.result = result
    },
    onDecode2(result){
      this.result = result
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
        this.$toast(this.error+' , 请点击相册选择图片进行扫描！');
      }
    },
    scanQR(){
      this.result = '';
      if(isWeChat())this.getWeixinScanner()
      else this.getHtmlScanner()
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
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              //将扫描得到的内容抛出
              _this.$emit("getCode", result);
            }
          });
        });
        wx.error(function(res){
            this.$dialog.confirm({
              message: res+'，请退出后重新扫描，或者前往输入兑奖码'
            }).then(() => {
              // 跳转搜索页
              this.$router.push("/user/exchange/inputCode");
            }).catch(() => {
              // on cancel
            });
        });
      });
    },
    //html5扫一扫
    getHtmlScanner(){
      this.mobile = true;
      this.$refs.app__layout.style.display = 'block';
      this.$refs.app__overlay.style.display = 'block';
      //如果没有错误的时候显示扫描动画(需要有一个缓冲时间)
      this.Time3 = setTimeout(()=>{
        if (this.error == '') this.$refs.custom_scanner.style.display = 'block';
        //清除定时器
        window.clearTimeout(this.Time3)
      },200)
      //当使用相机扫描的时候1s去检测一次
      this.Time1 = setInterval(()=>{
        //判断是不是空不为空的话返回信息并清除定时器
        if(this.result!=''){
          //将扫描得到的内容抛出
          this.$emit("getCode", this.result);
          window.clearInterval(this.Time1)
        }
      },1000)
    },
    inputImg(){
      let frame = document.querySelector('#frame');
      let camera = document.querySelector('#camera')
      camera.removeAttribute('capture');  //禁止直接吊起摄像头
      this.$refs.custom_scanner.style.display = 'none';
      camera.click();
      //On camera change
      camera.addEventListener('change', event => {
        this.$refs.frame.className = 'app__overlay'; //显示图片
        this.$refs.frame.src = URL.createObjectURL(event.target.files[0]);
        this.$refs.custom_scanner.style.display = 'block';
        // 延迟一秒后输出解析数据
        this.Time2 = setTimeout(()=>{
          //将扫描得到的内容抛出
          this.$emit("getCode", this.result);
          window.clearTimeout(this.Time2)
        },1000)
      });
    },
    cancel(){
      this.$refs.app__layout.style.display = 'none';
      this.$refs.app__overlay.style.display = 'none';
      this.$refs.custom_scanner.style.display = 'none';
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
  display: none;
}

img.app__overlay{
  display: block;
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
