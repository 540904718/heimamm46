<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
        <img src="../../assets/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userIcon" alt />
        <span class="name">{{userName}},您好</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside class="my-aside" width="auto">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { info, logout } from "@/api/index.js";
// 导入token 函数
import { removeToken } from "@/utils/token.js";
export default {
  name: "index",
  data() {
    return {
      // 用户头像
      userIcon: "",
      // 用户名
      userName: "",
      // 是否折叠
      isCollapse: false
    };
  },
  methods: {
    // 退出当前页面
    logout() {
      this.$confirm("你确定要离开我们网站吗?", "友情提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续看看",
        type: "warning"
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              // 移除token
              removeToken();
              // 去登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    }
  },
  created() {
    info().then(res => {
      // window.console.log(res)
      this.userName = res.data.data.username;
      this.userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        margin-right: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }

      span.name {
        margin-right: 38px;
      }
    }
  }

  .my-main {
    background-color: gold;
  }
  /* c3中的transition(过渡), 需要有开始和结束的值 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>