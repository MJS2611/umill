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
      <el-table-column prop="id" label="菜单编号"  width="120px"></el-table-column>
      <el-table-column prop="title" label="菜单名称" ></el-table-column>
      <el-table-column label="菜单图标">
        <!-- slot-scope="scope"取到当前单元格 -->
        <template slot-scope="scope">
          <!-- scope.row直接取到该单元格对象 -->
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启 用
          </el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- scope.row.id直接取到该单元格对象里的id -->
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqMenuDel } from "../../../utils/http";
export default {
  props: ["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              // 通知父组件menu更新list数据
              this.$emit("init");
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          console.log("你点了取消");
        });
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>