<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" width="120px"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="150px"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
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
import { successAlert } from "../../../utils/alert";
import { reqSpecsDel } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
      changePage: "specs/changePage",
    }),
    del(id) {
      reqSpecsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqCount()
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
    this.reqCount()
  },
};
</script>
<style scoped>
.total {
  margin-top: 20px;
  text-align: right;
}
</style>