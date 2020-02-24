// 导入vue
import Vue from 'vue'

// 导入vuex
import Vuex from 'vuex'

// 注册
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 用户名字
        userName: "",

        // 用户头像
        userIcon: ""
    },


    mutations: {
        changeIcon(state,newIcon){
            state.userIcon = newIcon
        },
        changeName(state,newName){
            state.userName = newName
        }          
    }
})

// 暴露出去
export default store



