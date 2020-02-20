<template>
  <div>
    <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
      <el-form status-icon :rules="rules" ref="registerForm" :model="form">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
        <el-form-item label="图形码" prop="code" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-col>
            <el-col class="regist-box" :offset="1" :span="7">
              <!-- 图片验证码 -->
              <img @click="changeCode" class="regist-code" :src="codeURL" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <!-- 点击获取 用户验证码 -->
              <el-button
                :disabled="delay!=0"
                @click="getSMS"
              >{{delay==0? "点击获取验证码" : `还有${delay}秒继续获取`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(registerForm)">取 消</el-button>
        <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入axios
// import axios from "axios";
// import {sendsms} from '../../../api/register.js'
// 使用@关键字  简化编码
import { sendsms, register } from "@/api/register.js";
const checkPhone = (rule, value, callback) => {
  // 定义正则表达式  定义了一个正则对象
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 校验方法 test 方法 是正则
  // 对 返回的是true
  // 错  返回的 是  false
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号码"));
  }
};
const checkEmail = (rule, value, callback) => {
  // 定义正则表达式  定义了一个正则对象
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 校验方法 test 方法 是正则
  // 对 返回的是true
  // 错  返回的 是  false
  if (reg.test(value) == true) {
    callback();
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
        // 昵称
        username: "",
        // 密码
        password: "",
        // 手机号
        phone: "",
        // 电子邮箱
        emali: "",
        // 图形码
        code: "",
        // 头像
        avatar: "",
        // 验证码
        rcode: ""
      },
      delay: 0,
      // 本地图片预览地址
      imageUrl: "",
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 校验规则
      rules: {
        avatar: [
          { required: true, message: "用户头像不能为空", trigger: "blur" }
        ],
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
    // 关闭表单
    cancel(formName) {
      window.console.log(formName)
      this.dialogFormVisible = false;
    },
    // 表单的提交方法
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register({
            username: this.form.username,

            password: this.form.password,

            phone: this.form.phone,

            email: this.form.email,

            avatar: this.form.avatar,

            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              this.$message.success("恭喜你,注册成功");
              // 清空表单
              this.$refs[formName].resetFields();
              // 人为的清空 图片
              this.imageUrl = "";
              this.dialogFormVisible = false;
            } else if (res.data.code === 201) {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    changeCode() {
      // 随机数
      // this.codeURL= process.env.VUE_APP_URL + "/captcha?type=sendsms&" + Math.random()
      // 时间戳
      // this.codeURL= process.env.VUE_APP_URL + "/captcha?type=sendsms&" + Date.now()
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },

    getSMS() {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone) != true) {
        this.$message.error("你输入的手机格式有误,请检查");
        return;
      }

      if (this.form.code.length != 4) {
        this.$message.error("你输入的验证码长度有误,请重新输入");
      }
      if (this.delay == 0) {
        this.delay = 60;
        const interId = setInterval(() => {
          this.delay--;
          if (this.delay == 0) {
            clearInterval(interId);
          }
        }, 1000);
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          //成功回调
          window.console.log(res);

          if (res.data.code === 200) {
            this.$message.success("验证码获取成功" + res.data.data.captcha);
          } else if (res.data.code === 0) {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      window.console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      // 保存服务器返回的图片地址
      this.form.avatar = res.data.file_path;
      // 表单中头像字段的校验
      this.$refs.registerForm.validateField("avatar");
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是图片格式");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader {
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>