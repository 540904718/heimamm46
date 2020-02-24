// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from '../../node_modules/vue-router'
// 导入 组件 登录
import login from '../views/login/login.vue'

// 导入组件 嵌套路由 数据 chart
import chart from '../views/index/chart/chart.vue'
// 导入组件 嵌套路由 用户 user
import user from '../views/index/user/user.vue'
// 导入组件 嵌套路由 题库 question
import question from '../views/index/question/question.vue'
// 导入组件 嵌套路由 企业 enterprise
import enterprise from '../views/index/enterprise/enterprise.vue'
// 导入组件 嵌套路由 学科 subject
import subject from '../views/index/subject/subject.vue'

import index from '../views/index/index.vue'
// 注册一下 use
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
    // 路由规则
    // 登录
    routes: [
        {
            path: '/login',
            component: login
        },

        {
            path: '/index',
            component: index
        },

        {
            path: '/index',
            component: index,

            children: [
                // chart
                {
                    path: 'chart',
                    component: chart
                },
                // user
                {
                    path: 'user',
                    component: user
                },
                // question
                {
                    path: 'question',
                    component: question
                },
                // enterprise
                {
                    path: 'enterprise',
                    component: enterprise
                },
                // subject
                {
                    path: 'subject',
                    component: subject
                }
            ]
        }


    ]
})
// 暴露出去
export default router