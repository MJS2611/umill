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
      <el-table-column prop="id" label="分类编号" width="120px"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片" >
        <!-- slot-scope="scope"取到当前单元格 -->
        <template slot-scope="scope" v-if="scope.row.pid!==0">
          <!-- scope.row直接取到该单元格对象 -->
          <img :src="$imgPre+scope.row.img"/>
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqCateDel, reqCateDetail } from "../../../utils/http";
export default {
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    del(id) {
      reqCateDel(id).then((res) => {
        if (res.data.code == 200) {
          errorAlert("删除成功");
          this.reqList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>