import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'

// 导入 仓库
import store from './store/index'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
import './style/base.css'
// 注册一下
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // 挂载到vue实例上  路由
  router,
  // 挂载到vue实例上  仓库
  render: h => h(App),
}).$mount('#app')
