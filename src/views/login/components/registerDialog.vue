<template>
  <div>
    <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
      <el-form status-icon :rules="rules" ref="registerForm" :model="form">
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
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
              <!-- 图片验证码 -->
              <img @click="changeCode" class="regist-code" :src="codeURL" alt />
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
const checkPhone = (rule, value, callback) => {
  // 定义正则表达式  定义了一个正则对象
  const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  // 校验方法 test 方法 是正则
  // 对 返回的是true
  // 错  返回的 是  false
  if (reg.test(value) == true) {
    callback;
  } else {
    callback(new Error("请输入正确的手机号码"));
  }
};
const checkEmail = (rule, value, callback) => {
  // 定义正则表达式  定义了一个正则对象
  const reg =  /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  // 校验方法 test 方法 是正则
  // 对 返回的是true
  // 错  返回的 是  false
  if (reg.test(value) == true) {
    callback;
  } else {
    callback(new Error("请输入正确的邮箱号"));
  }
};
export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        phone: "",
        emali: ""
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
        ],

        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // trigger 触发 是执行validator设置的函数
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          // trigger 触发 是执行validator设置的函数
          { validator: checkEmail, trigger: "blur" }
        ]
      },
      // 左侧的文本宽度
      formLabelWidth: "62px",
      // 验证码图片地址
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms"
    };
  },

  methods: {
    changeCode() {
      // 随机数
        // this.codeURL= process.env.VUE_APP_URL + "/captcha?type=sendsms&" + Math.random()
        // 时间戳
        // this.codeURL= process.env.VUE_APP_URL + "/captcha?type=sendsms&" + Date.now()
        this.codeURL= process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now()

    }
  },
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