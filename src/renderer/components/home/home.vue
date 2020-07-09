<template>
  <div class="home">
    <mainHandel></mainHandel>
    <div class="leftIcon"></div>
    <div class="organizationBox">
        <div class="userInfo"></div>
        <div class="organizationList"></div>
    </div>
    <div class="showHomeMain"></div>
    <div class="homeMain"></div>
  </div>
</template>

<script>
import mainHandel from "../handel/mainHandel";
export default {
  name: "home",
  components: {
    mainHandel: mainHandel
  },
  methods: {
    getindex() {
      this.$api.get("/user/index", '',response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.code === 200) {
            console.log(response.data);
          }
        } else {
          console.log(response.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  .leftIcon {
    position: absolute;
    left: 0px;
    width: 60px;
    height: 667px;
    background-color: royalblue;
  }
  .organizationBox {
    position: absolute;
    left: 60px;
    width: 270px;
    height: 667px;
    background-color: sandybrown;
  }
  .showHomeMain {
  }
  .homeMain {
  }
}
</style>