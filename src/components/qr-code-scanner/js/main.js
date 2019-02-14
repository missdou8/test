import QRReader from './qrscan.js';

window.addEventListener('DOMContentLoaded', () => {
  
  // DOM文档加载的步骤为
  // 解析HTML结构 --> 加载外部脚本和样式表文件 --> 解析并执行脚本代码 --> DOM树构建完成(DOMContentLoaded) --> 加载图片等外部文件 --> 页面加载完毕(load)
  // To check the device and add iOS support
  window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
  window.isMediaStreamAPISupported = navigator && navigator.mediaDevices && 'enumerateDevices' in navigator.mediaDevices;
  window.noCameraPermission = false;
  var frame = document.querySelector('#frame');
  var selectPhotoBtn = document.querySelector('.app__select-photos');
  var scanningEle = document.querySelector('.custom-scanner');

  //Initializing qr scanner
  window.addEventListener('load', event => {
    QRReader.init(); //To initialize QR Scanner
    // Set camera overlay size
    setTimeout(() => {
      if (window.isMediaStreamAPISupported) {
        scan();
      }
    }, 3000);
  });

  //Scan
  function scan(forSelectedPhotos = false) {
    // 如果有摄像头扫码就显示扫码动画
    if (window.isMediaStreamAPISupported && !window.noCameraPermission || forSelectedPhotos) {
      scanningEle.style.display = 'block';
    }
    // 没有的话直接调用解码
    QRReader.scan(result => {
      //返回二维码信息
      alert(result)
    }, forSelectedPhotos);
  }
    //Click of camera fab icon
    selectPhotoBtn.addEventListener('click', () => {
      scanningEle.style.display = 'none';
      document.querySelector('#camera').click();
    });

    //On camera change
    camera.addEventListener('change', event => {
      if (event.target && event.target.files.length > 0) {
        frame.className = 'app__overlay'; //显示图片
        frame.src = URL.createObjectURL(event.target.files[0]);
        if (!window.noCameraPermission) scanningEle.style.display = 'block';
        scan(true);
      }
    });
});
