<template>
  <div class="list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 按钮组, 带搜索框 -->
    <section class="list_btns">
      <el-button plain size="mini" icon="el-icon-plus">新增</el-button>

      <el-button plain size="mini" icon="el-icon-check" @click="all">全选</el-button>

      <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>

      <div class="list_btns_right">
        <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" label-width="200px" size="mini" v-model="apiQuery.searchvalue" @blur="search">
        </el-input>
      </div>
    </section>

    <!-- 大表格 -->
    <el-table @selection-change="change" ref="multipleTable" :data="tableData3" style="width: 100%">

      <!--多选框 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
            <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">{{ scope.row.title }}</router-link>
            <div slot="content">
              <img style="width: 200px;" :src="scope.row.imgurl" alt="商品图片">
            </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>

      <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column label="属性" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="['el-icon-picture', scope.row.is_slide == 1? 'active': '']"></span>
          <span :class="['el-icon-upload', scope.row.is_top == 1? 'active': '']"></span>
          <span :class="['el-icon-star-on', scope.row.is_hot == 1? 'active': '']"></span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120" show-overflow-tooltip>
        <!-- scope用来以后设置组件，将来放置别的功能里面的 -->
        <template slot-scope="scope">
          <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">修改</router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :total="apiQuery.tolat" 
    :current-page="apiQuery.pageIndex" 
    :page-size="apiQuery.pageSize" 
    :page-sizes="[2,3,5,7]" 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>  
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 搜索
      apiQuery: {
        pageIndex: 1,
        pageSize: 6,
        searchvalue: "",
        tolat:7
      },
      selectedGoodsList: [],

      tableData3: []
    };
  },

  methods: {
    search() {
      this.getGoodsData();
    },

    getGoodsData() {
      let api = `${this.$api.gsList}?pageIndex=${
        this.apiQuery.pageIndex
      }&pageSize=${this.apiQuery.pageSize}&searchvalue=${
        this.apiQuery.searchvalue
      }`;
      this.$http.get(api).then(res => {
        // console.log(res.data);
        if (res.data.status == 0) {
          this.tableData3 = res.data.message;
          this.apiQuery.tolat = res.data.totalcount
        }
      });
    },

    // 监听
    change(selection) {
      this.selectedGoodsList = selection;
    },
    // 删除
    del() {
      let delIDS = this.selectedGoodsList.map(v => v.id);
      this.$http.get(this.$api.gsDel + delIDS).then(res => {
        if (res.data.status == 0) {
          this.getGoodsData();
        }
      });
    },
    all() {
      document.querySelector(".el-checkbox__original").click();
    },
    handleCurrentChange(page) {
      // console.log(page);
        this.apiQuery.pageIndex = page;
        this.getGoodsData();
      },
    handleSizeChange(size) {
      // console.log(size);
        this.apiQuery.pageSize = size;
        this.getGoodsData();
      },
  },
  created() {
    this.getGoodsData();
  }
};
</script>

<style scoped lang="less">
.list {
  a {
    text-decoration: none;
  }
  &_btns {
    margin-top: 20px;
    margin-bottom: 20px;
    &_right {
      float: right;
      width: 200px;
    }
  }
  [class^="el-icon"].active {
    color: #000;
    font-weight: bold;
  }
}
</style>