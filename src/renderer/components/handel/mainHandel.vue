<template>
  <div class="handel">
    <div class="logo" >
      <img src="../static/dingdong.png" alt="logo" />
    </div>
    <div class="mainClose" @click="sendclose()">
      <img src="../static/close1.png" alt="关闭"  title="关闭"/>
    </div>
    <div class="mainMini" @click="sendmini()">
      <img src="../static/min1.png" alt="最小化" title="最小化"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainHandel",
  data() {
    return {};
  },
  methods: {
    sendclose() {
      this.$electron.ipcRenderer.send("sendclose", "this is closemsg");
    },
    sendmini() {
      this.$electron.ipcRenderer.send("sendmini", "this is minimsg");
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