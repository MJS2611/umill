<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="规格名称" label-width="120px" prop="specsname">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" @click="addAttr" v-if="index===0">添加规格属性</el-button>
            <el-button type="danger" @click="delAttr(index)" v-else>删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqSpecsAdd,
  reqSpecsDel,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.specsname === "") {
          errorAlert("规格名称不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrArr.map((item) => item.value)
        );
        reqSpecsAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.reqList();
            this.reqCount();
          }
        });
      });
    },
    getOne(id) {
      reqSpecsDetail(id).then((res) => {
        this.user = res.data.list[0];
        this.attrArr = JSON.parse(this.user.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    update() {
      this.check().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrArr.map((item) => item.value)
        );
        reqSpecsUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    closed() {
      if (this.info.title == "编辑规格") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>