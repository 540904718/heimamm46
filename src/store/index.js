// 导入vue
import Vue from 'vue'

// 导入vuex
import Vuex from 'vuex'

// 注册
Vue.use(Vuex)

const store = new Vue.store({
    status: {
        // 用户名字
        userName: "",

        // 用户头像
        userIcon: ""
    },


    mutations: {
        changeIcon(state,newIcon){
            state.userName = newIcon
        },
        changeName(state,newName){
            state.userName = newName
        }          
    }
})



