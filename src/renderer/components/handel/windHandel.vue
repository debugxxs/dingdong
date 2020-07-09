<template>
  <div class="handel">
    <div class="logo">
    </div>
    <div class="mainClose" @click="sendclose()">
      <img src="../static/close1.png" alt="关闭" />
    </div>
    <div class="mainMini" @click="sendmini()">
      <img src="../static/min1.png" alt srcset />
    </div>
  </div>
</template>
<script>
import {remote} from 'electron'
export default {
  name: "windHandel",
  data() {
    return {};
  },
  methods: {
    sendclose() {
      this.$Win.closeWin()
    },
    sendmini() {
      let win = remote.getCurrentWindow()
      if (win.isMinimized()) {
        win.restore()
      } else {
        win.minimize()
      }
    }
  }
};
</script>
<style lang="scss">
.handel {
  height: 33px;
  background-color: rgb(72, 199, 154);
  .logo{
      width: 354px;
      -webkit-app-region: drag;
  }
  .mainClose {
    width: 32px;
    height: 15px;
    position: absolute;
    top: 0px;
    right: 0px;
    img{
        margin: 8px;
    }
  }
  .mainMini{
          width: 32px;
    height: 15px;
    position: absolute;
    top: 0px;
    right: 32px;
    img{
        margin: 8px;
    }
  }
  .mainMini:hover img {
      transform: translateY(-50px);
      filter: drop-shadow(#0072e3 0 50px);
    }
    .mainClose:hover img {
      transform: translateY(-50px);
      filter: drop-shadow(red 0 50px);
    }
}
</style>