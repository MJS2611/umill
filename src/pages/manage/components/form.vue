<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              v-for="item in userlist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加用户'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqManageAdd,
  reqRoleList,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      userlist: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqManageAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(uid) {
      reqManageDetail(uid).then((res) => {
        this.user = res.data.list;
        this.user.password = "";
      });
    },
    update() {
      reqManageUpdate(this.user).then((res) => {
        console.log(this.user)
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init")
        }
      });
    },
    closed(){
        if(this.info.title=="编辑用户"){
            this.empty()
        }
    }
  },
  mounted() {
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.userlist = res.data.list;
        // console.log(this.userlist);
      }
    });
  },
};
</script>
<style scoped>
</style>