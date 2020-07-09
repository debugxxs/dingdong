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
              v-model="users.password"
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
        password: ""
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
      }
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
          this.$api.post(
            "/login",
           this.users,
            response => {
              if (response.status >= 200 && response.status < 300) {
                
                if (response.data.code ===200){
                    console.log(response.data.token);
                    localStorage.setItem('token',response.data.token)
                    this.$electron.ipcRenderer.send("loadHome", "this is msg");
                }
              } else {
                console.log(response.message);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    modifyPassWind() {
      let win = this.$Win.createWin({
        width: 450,
        height: 350,
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
    }
  },
  beforeDestroy() {
    localStorage.setItem('token',''),
    localStorage.setItem('userName','')
  },
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
      right: 185px;
      top: -40px;
      .el-avatar {
        border: solid 5px #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
    .loginInput {
      position: absolute;
      left: 115px;
      top: 37px;
      .el-form {
        width: 210px;
        margin: 0;
        .el-form-item {
          margin: 6px;
          .el-input.is-active .el-input__inner,
          .el-input__inner:focus {
            border-color: rgb(72, 199, 154);
          }
        }
      }
    }
    .loginBtn {
      position: absolute;
      top: 160px;
      left: 120px;
      .el-button {
        width: 200px;
        height: 40px;
      }
    }
    .seleceBox {
      position: absolute;
      top: 140px;
      left: 120px;
    }
    .modifyPassBtn {
      position: absolute;
      top: 138px;
      right: 130px;
    }
  }
}
</style>