<template>
<div class="admin">
<el-container>
    <el-aside width=""><app-aside></app-aside></el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
  
</template>

<script>
import Header from "./subcom/Header.vue";
import Aside from "./subcom/Aside.vue";
export default {
  // 注册子页面
  components: {
    appHeader: Header,
    appAside: Aside
  }
};
</script>


<style scoped lang="less">
.admin {
  height: 100%;
  color: #333;
  

  .el-header {
    height: 50px;
    padding:0;
  }

  .el-container {
    height: 100%;
  }

  // &在less中是对上级选择器的引用, 书写方便
  &_content {
    background-color: skyblue;
    height: 100;
  }

  .el-aside {
    // background: #267cb7;
    height: 100%;
  }
}
</style>
