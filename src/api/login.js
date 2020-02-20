// 导入axios
import axios from 'axios'

// 为了更方便的设置每个模块的请求 一般会通过create创建新的 axios对象
// 创建的对象  和axios功能一样 可以单独的为它设置自己的属性
// login 登录
// request 请求

// 用户的登录 接口

const loginRequest = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 是否跨域
    withCredentials: true
})

export function login(data) {
    return loginRequest({
        url:'/login',
        method: 'post',
        data
    })
}