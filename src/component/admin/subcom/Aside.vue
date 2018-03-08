<template>
    <div class="aside">
        <!-- 把两个按钮合并成一个按钮，加上toggle -->
        <el-button class="toggle" icon="el-icon-menu" @click="toggle"></el-button>
        <el-menu default-active="1-1" class="el-menu-vertical-demo " background-color='#267cb7' unique-opened @open="handleOpen" @close="handleClose" :collapse="isCollapse" text-color="#fff">
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group class="menu_list" v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
                    <router-link :to="subItem.path">
                        <i class="el-icon-document"></i>
                        <span>{{ subItem.text }}</span>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          title: "学员问题",
          submenu: [
            { text: "内容管理", path: "/admin/goods" },
            { text: "类别管理", path: "/admin/category" },
            { text: "评论管理", path: "/admin/comment" }
          ]
        },
        {
          title: "前端技术",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "难点答疑",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "资源下载",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "商品管理",
          submenu: [
            { text: "内容管理", path: "/admin/goods/list" },
            { text: "类别管理", path: "/admin/b" },
            { text: "评论管理", path: "/admin/c" }
          ]
        },
        {
          title: "订单管理",
          submenu: [{ text: "订单列表", path: "/" }]
        }
      ]
    };
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  width: 200px;
}
.aside {
  overflow: hidden;
  position: relative;
  height: 100%;
  background-color: aliceblue;
  i {
    color: #fff;
  }
  .el-menu-vertical-demo {
    height: 100%;
   
    text-decoration: none;
    background-color: aliceblue;
  }
}
.menu_list {
  text-align: center;
  a {
    color: #fff;
    text-decoration: none;
  }
  
}
.toggle {
  font-size: 26px;
  border: none;
}
</style>