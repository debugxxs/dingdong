<template>
  <div class="login">
    <mainHandel></mainHandel>
    <div class="setWind" @click="createSetWind()">
      <img src="../static/settin1.png" alt="设置" title="设置" />
    </div>
    <div class="handel"></div>
    <div class="loginMain">
      <div class="avatarIcon">
        <el-avatar
          shape="circle"
          :size="80"
          fit="cover"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="loginInput">
        <el-form ref="users" :model="users" :rules="rules" :show-message="false">
          <el-form-item prop="userName">
            <el-input
              v-model="users.userName"
              prefix-icon="iconfont el-icon-user"
              autofocus="true"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="users.userPass"
              prefix-icon="iconfont el-icon-lock"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="seleceBox">
        <el-checkbox-group v-model="checkList" @change="getselectBoxValue()">
          <el-checkbox v-for="(item,i) in checkListItem" :key="i" :label="item.content"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modifyPassBtn">
        <el-link type="primary" @click="modifyPassWind()">忘记密码</el-link>
      </div>
      <div class="loginBtn">
        <el-button type="success" plain @click="login('users')">登 陆</el-button>
      </div>
      <div class="dialogClass">
        <el-dialog
          title="修改第一次登陆密码"
          :visible.sync="dialogFormVisible"
          width="400px"
          top="18px"
          :lock-scroll="false"
        >
          <el-form :model="userProblem">
            <div class="selectBox">
              安全问题：
              <el-select v-model="userProblem.problem" placeholder="请选择问题：">
                <el-option :label="problem1" :value="problem1"></el-option>
                <el-option :label="problem2" :value="problem2"></el-option>
              </el-select>
            </div>

            <el-form-item label="问题答案：">
              <el-input v-model="userProblem.answer" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input autocomplete="off" v-model="userProblem.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input v-model="userProblem.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="problemPost()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import mainHandel from "../handel/mainHandel";
export default {
  name: "home",
  components: {
    mainHandel: mainHandel
  },
  data() {
    return {
      users: {
        userName: "",
        userPass: ""
      },
      checkList: [],
      checkListItem: [
        { id: 0, content: "记住密码", disabled: false, checked: true }
      ],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      userProblem: {
        userName: "",
        newPass:"",
        problem: "",
        password: "",
        answer: ""
      },
      problem1: "您的毕业学校名称？",
      problem2: "最喜欢的运动项目是？",
      openWindFlag: false
    };
  },
  methods: {
    createSetWind() {
      let win = this.$Win.createWin({
        width: 450,
        height: 350,
        resizable: false,
        maximizable: false,
        windowConfig: {
          router: "/setwind", // 路由
          name: "setwind"
        }
      });
      win.on("closed", () => {
        win = null;
      });
      win.show();
    },
    getselectBoxValue() {
      var checkStr = this.checkList[0];
      if (checkStr == "记住密码") {
        localStorage.setItem("userName", this.users.userName);
        localStorage.setItem("userPass", this.users.password);
      }
    },
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("http://localhost:8999/login", this.users)
            .catch(error => {
              console.log(error);
            })
            .then(response => {
              if (response.data.code === 200) {
                 localStorage.setItem("token", response.data.token);
                if (this.users.userPass == "") {
                  this.dialogFormVisible = true;

                } else {
                  this.openWindFlag = true;
                }
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    modifyPassWind() {
      let win = this.$Win.createWin({
        width: 500,
        height: 400,
        resizable: false,
        maximizable: false,
        windowConfig: {
          router: "/modifypass", // 路由
          name: "modifypass"
        }
      });
      win.on("closed", () => {
        win = null;
      });
      win.show();
    },
    problemPost() {
      this.userProblem.userName = this.users.userName
      this.$http
        .post("http://localhost:8999/user/problem",this.userProblem)
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          if (response.data.code === 200) {
            this.openWindFlag = true;
            this.dialogFormVisible = false;
          }else{
            console.log()
          }
        });
    }
  },
  watch: {
    openWindFlag: function(newVal) {
      if (newVal == true) {
        this.$electron.ipcRenderer.send("loadHome", "this is msg");
      }
    }
  },
  beforeDestroy() {
    localStorage.setItem("token", ""), localStorage.setItem("userName", "");
  }
};
</script>
<style lang="scss">
.login {
  .setWind {
    width: 32px;
    height: 15px;
    position: absolute;
    top: 0px;
    right: 64px;
    img {
      margin: 8px;
    }
  }
  .setWind:hover img {
    transform: translateY(-50px);
    filter: drop-shadow(#0072e3 0 50px);
  }
  .handel {
    height: 60px;
    background-color: rgb(72, 199, 154);
    border-bottom: 1px solid rgb(72, 199, 154);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .loginMain {
    height: 128px;
    width: 100%;
    position: absolute;
    top: 120px;
    .avatarIcon {
      height: 80px;
      width: 80px;
      position: absolute;
      right: 215px;
      top: -40px;
      .el-avatar {
        border: solid 5px #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
    .loginInput {
      position: absolute;
      left: 130px;
      top: 37px;
      .el-form {
        width: 230px;
        margin: 0;
        .el-form-item {
          margin: 15px;
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: rgb(72, 199, 154);
          }
        }
      }
    }
    .loginBtn {
      position: absolute;
      top: 185px;
      left: 146px;
      .el-button {
        width: 200px;
        height: 40px;
      }
    }
    .seleceBox {
      position: absolute;
      top: 160px;
      left: 147px;
    }
    .modifyPassBtn {
      position: absolute;
      top: 160px;
      right: 153px;
    }
  }
  .dialogClass {
    .selectBox {
      height: 40px;
      .el-select {
        position: absolute;
        top: 60px;
        left: 100px;
        width: 200px;
      }
    }

    .el-form-item {
      margin-top: -15px;
      .el-input {
        position: absolute;
        left: 80px;
        margin-top: 3px;
        width: 200px;
      }
    }
    .dialog-footer {
      margin-top: -35px;
      .el-button {
        margin-top: -25px;
      }
    }
  }
}
</style>