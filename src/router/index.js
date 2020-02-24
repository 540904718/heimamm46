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

// 导入组件  导航守卫 
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

// 导入 工具函数
import { getToken, removeToken } from '@/utils/token.js'

// 导入用户信息接口
import { info } from '@/api/index.js'

// 导入  按需导入  element-ui弹框
import { Message } from 'element-ui'

import index from '../views/index/index.vue'
// 注册一下 use
Vue.use(VueRouter)

// 定义 路由白名单 (不需要登录就可以访问的页面)
const whitePaths = ['/login']

// 创建路由对象
const router = new VueRouter({
    // 路由规则
    // 登录
    routes: [
        // 空地址的重定向
        {
            path: '/',
            redirect: 'login'
        },

        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        },

        {
            path: '/index',
            component: index,
            meta: {
                title: '首页'
            },

            children: [
                // chart
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        title: '数据概览'
                    }
                },
                // user
                {
                    path: 'user',
                    component: user,
                    meta: {
                        title: '用户列表'
                    }
                },
                // question
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表'
                    }
                },
                // enterprise
                {
                    path: 'enterprise',
                    component: enterprise,
                    meta: {
                        title: '企业列表'
                    }
                },
                // subject
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表'
                    }
                }
            ]
        }


    ]
})

// 导航守卫 beforeEach 进入之前
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start()
    // window.console.log(to.path)
    // 需要判断登录状态

    // 白名单判断 不存在
    if (whitePaths.includes(to.path.toLocaleLowerCase()) != true) {
        // token 非空判断
        // token 为空
        if (getToken() == undefined) {
            // 提示用户
            Message.warning('登录状态有误,请检查')
            // 关闭进度条
            NProgress.done()
            // 返回登录页
            next('/login')
        } else {
            info().then(res => {
                // token 不为空
                if (res.data.code === 206) {
                    // 提示用户
                    Message.warning('登录状态有误,请检查')
                    // 关闭进度条
                    NProgress.done()
                    // 返回登录页
                    next('/login')
                    // 删除token
                    removeToken()
                } else if (res.data.code === 200) {
                    // 用户姓名
                    const userName = res.data.data.username
                    // 用户头像
                    const userIcon = process.env.VUE_APP_URL + '/' + res.data.data.avatar
                    // 往后走
                    next()
                }
            })
        }
        // token 真假判断
    } else {
        // 是登录页
        next()
    }
})

// 导航守卫 afterEach 进入之后
router.afterEach(to => {
    // 修改标题 
    window.document.title = to.meta.title
    setTimeout(() => {
        // 关闭进度条
        NProgress.done()
    }, 100);
})


// 暴露出去
export default router