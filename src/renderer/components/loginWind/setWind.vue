<template>
  <div class="setwind">
    <windHandel></windHandel>
    <div class="setingSeletForm">
      <div class="setingLaber">
        服务器类型：
        <el-select v-model="serverType" slot="prepend" placeholder="服务器连接类型">
          <el-option label="TCP" value="TCP"></el-option>
          <el-option label="UDP" value="UDP"></el-option>
          <el-option label="HTTP" value="HTTP"></el-option>
        </el-select>
      </div>
      <div class="seradd">
        服务器地址：
        <el-select v-model="servIpAddr" slot="prepend" placeholder="服务器地址">
          <el-option :label="ipaddr" value="1"></el-option>
        </el-select>
      </div>
      <div class="portLabel">
        服务器端口：
        <el-input v-model="port" placeholder="请输入端口"></el-input>
      </div>
      <div class="submit">
        <el-button type="success" @click="saveSerInfo()">提交信息</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import windHandel from "../handel/windHandel";
export default {
  name: "setWind",
  components: {
    windHandel: windHandel
  },
  data() {
    return {
      serverType: "",
      servIpAddr: "",
      ipaddr: "localhost",
      port: ""
    };
  },
  methods: {
    saveSerInfo() {
      localStorage.setItem("sertype", this.serverType);
      localStorage.setItem("seraddr", this.ipaddr);
      localStorage.setItem("port", this.port);
      this.$Win.closeWin();
    }
  }
};
</script>
<style lang="scss">
.setwind {
  .setingSeletForm {
    
    padding: 15px;
    position: absolute;
    top: 90px;
    .el-select {
      width: 180px;
    }
    .portLabel {
      margin-top: 12px;
      .el-input {
        width: 180px;
        height: 30px;
      }
    }
  }
  .seradd {
    margin-top: 12px;
  }
  .submit {
    position: absolute;
    top: 170px;
    right: -90px;
  }
}
</style>