import Vue from 'vue'
import router from './router/router.js'
import App from './App.vue'
import ApiService from './service/http.js'
import store from './store/index.js'
import ImageCompressor from 'compressorjs'

// 导入公共CSS
import 'lpreset.css'
import './style/base.css'

//导入配置
import config from './config/index.js'

Vue.prototype.config = config

// 引用组件
import {
  Tab,
  Tabs,
  Field,
  Button,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Toast,
  List,
  PullRefresh,
  Dialog,
  Uploader,
  Area,
  Popup,
  Row,
  Col,
  Panel,
  Card,
  Collapse,
  NumberKeyboard,
  PasswordInput,
  DatetimePicker,
  Picker,
  CollapseItem,
  NavBar
} from 'vant'
Vue.use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Toast)
  .use(List)
  .use(PullRefresh)
  .use(Dialog)
  .use(Uploader)
  .use(Area)
  .use(Popup)
  .use(Row)
  .use(Panel)
  .use(Card)
  .use(Col)
  .use(Collapse)
  .use(NumberKeyboard)
  .use(Picker)
  .use(DatetimePicker)
  .use(CollapseItem)
  .use(PasswordInput)
  .use(NavBar)

Vue.config.productionTip = false

/**
 * 自定义全局方法
 */
Vue.prototype.http = new ApiService()

/**压缩并上传图片 */

let compressImg = file => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$toast.loading({
      mask: true,
      message: '压缩中...',
      duration: 0
    })
    new ImageCompressor(file, {
      maxWidth: config.outputWidth,
      maxHeight: config.outputHeight,
      success(newFile) {
        resolve(newFile)
      },
      error(err) {
        Vue.prototype.$toast.clear()
        reject(err.message)
      }
    })
  })
}

Vue.prototype.compressImg = compressImg

let uploadImage = file => {
  return new Promise((resolve, reject) => {
    let formData = new FormData()
    formData.append('file', file, file.name)
    Vue.prototype.http.resource
      .uploadImg(formData, 'post', config)
      .then(res => {
        resolve(res.data)
      })
  })
}

let compressAndUploadImage = async file => {
  let data
  try {
    let newFile = await compressImg(file)
    data = await uploadImage(newFile)
  } catch (error) {
    Vue.prototype.$toast(error)
  }
  return data.src[0]
}

Vue.prototype.compressAndUpload = compressAndUploadImage

Vue.prototype.convertBase64UrlToBlob = (base64, mimeType) => {
  let bytes = window.atob(base64.split(',')[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  let _blob = new Blob([ab], { type: mimeType })
  return _blob
}

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
