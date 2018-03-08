<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <span class="add-heder">你好, {{ uname }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <span>功能</span>
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  data() {
    return {
      uname: localStorage.getItem("uname")
    };
  },

  methods: {
    logout() {
      this.$http.get(this.$api.logout).then(res => {
        if (res.data.status == 0) {
          this.$router.push({ name: "login" });
        }
      });
    },

    // 通过command参数判断点击的是那个菜单
    handleCommand(command) {
      if (command == "b") {
        this.logout();
      }
    }
  }
};
</script>

<style scoped lang="less">
.header {
  text-align: right;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: aliceblue;
  /* border-right: 1px; */
}
.el-dropdown {
  padding: 0 20px;
  .add-heder{
    display: inline-block;
    height: 50px;
    border-right: 1px solid #ddd;
    padding-right:10px;
  }
}
.el-right {
  background-color: aliceblue;
  border-left: 1px solid #ccc;
}
</style>