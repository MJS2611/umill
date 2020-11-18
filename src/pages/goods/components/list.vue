<template>
  <div>
    <!-- 21.展示list -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" width="100px"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120px"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120px"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120px"></el-table-column>
      <el-table-column label="图片" width="140px">
        <!-- slot-scope="scope"取到当前单元格 -->
        <template slot-scope="scope">
          <!-- scope.row直接取到该单元格对象 -->
          <img :src="$imgPre+scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- scope.row.id直接取到该单元格对象里的id -->
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="total">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :pager-count="5"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqGoodsDel } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqCount: "goods/reqCount",
      changePage: "goods/changePage",
    }),
    del(id) {
      reqGoodsDel(id).then((res) => {
        if (res.data.code == 200) {
          errorAlert("删除成功");
          this.reqList();
          this.reqCount();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
    this.reqCount();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
.total {
  margin-top: 20px;
  text-align: right;
}
</style>