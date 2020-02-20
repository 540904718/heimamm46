<template>
  <el-container class="my-container">
    <el-header class="my-header">Header</el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
    .my-container {
        height: 100%;
        .my-header {
            background-color: pink
        }

        .my-aside {
            background-color: skyblue
        }

        .my-main {
            background-color: gold
        }
    }
</style>