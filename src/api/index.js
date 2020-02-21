// 导入axios
import axios from 'axios'
import { getToken } from '../utils/token.js'
// 为了更方便的设置每个模块的请求 一般会通过create创建新的 axios对象
// 创建的对象  和axios功能一样 可以单独的为它设置自己的属性
// login 登录
// request 请求

// 用户的登录 接口

const indexRequest = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 是否跨域
    withCredentials: true
})

// 用户 信息 接口
export function info(data) {
    return indexRequest({
        url:'/info',
        method: 'get',
        // 设置请求头
        // headers 是axios定义的设置方式
        header: {
            token: getToken()
        }
    })
}
// 用户 退出 接口
export function logout(data) {
    return indexRequest({
        url:'/logout',
        method: 'get',
        // 设置请求头
        // headers 是axios定义的设置方式
        header: {
            token: getToken()
        }
    })
}