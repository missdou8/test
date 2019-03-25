import VueRouter from 'vue-router'
import Vue from 'vue'
//路由配置
import loginConfig from './login.js'
import matchConfig from './match.js'
import userConfig from './user.js'
import recordConfig from './record.js'
import announceConfig from './announce'

//路由处理
import Dialog2 from '../components/confirm/vipPop'
import Dialog1 from '../components/confirmOrigin/dialog'

Vue.use(VueRouter)

let routes = []

routes = routes.concat(
  loginConfig,
  userConfig,
  recordConfig,
  matchConfig,
  announceConfig
)

const router = new VueRouter({
  mode: 'history',
  base: '/front/',
  routes
})

/**
 * 对路由进行统一处理
 */
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  //当路由进入的时候关闭全局的对话框
  Dialog1.close()
  Dialog2.close()
  next()
})

export default router
