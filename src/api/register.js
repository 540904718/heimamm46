// 把注册相关的接口调用  抽取为函数  暴露  带名字的暴露
import axios from 'axios'
export function sendsms(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data,
        // 跨域携带cookie
        withCredentials: true
    })
}