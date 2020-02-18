<template>
  <div>
    <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="registerForm" :model="form">
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input show-password v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col class="regist-box" :offset="1" :span="7">
              <img class="regist-code" src="../../../assets/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
      },

      // 校验规则
       rules: {
          username: [
            { required: true, message: "昵称不能为空", trigger: "blur" },
            {
              min: 3,
              max: 8,
              message: "昵称的长度为 3 到 8 位",
              trigger: "change"
            }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            {
              min: 6,
              max: 12,
              message: "密码的长度为 6 到 12 位",
              trigger: "change"
            }
          ]
        },
      // 左侧的文本宽度
      formLabelWidth: "62px"
    };
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #04befa, #1198f7);
}
.dialog__title {
  color: white;
}
.regist-code {
  width: 100%;
  height: 40.8px;
}
.regist-box {
  height: 40.8px;
}
</style>