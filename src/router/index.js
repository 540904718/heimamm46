// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from '../../node_modules/vue-router'
// 导入 组件 登录
import login from '../views/login/login.vue'
// 注册一下 use
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
    // 路由规则
    routes: [
        {
            path: '/login',
            component: login
        }
    ]
})
// 暴露出去
export default router