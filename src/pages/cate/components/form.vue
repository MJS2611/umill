<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form" :rules="rules">
        <el-form-item label="上级分类" label-width="120px" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px" prop="catename">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加分类'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqCateAdd, reqCateDetail, reqCateUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
      rules: {
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    changeFile(e) {
      let file = e.raw;
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      let extname = path.extname(file.name); //'.jpg'
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式！");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    cancel() {
      this.info.isshow = false;
    },
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.form.pid === "") {
          errorAlert("请选择上级分类");
          return;
        }
        if (this.form.catename === "") {
          errorAlert("请输入分类名称");
          return;
        }
        if (!this.form.img) {
          errorAlert("请选择图片");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        reqCateAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.reqList();
          }
        });
      });
    },
    getOne(id) {
      reqCateDetail(id).then((res) => {
        this.form = res.data.list;
        this.imgUrl = this.$imgPre + this.form.img;
        this.form.id = id;
      });
    },
    update() {
      this.check().then(() => {
        reqCateUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    closed() {
      if (this.info.title == "编辑分类") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

/* 穿透 */
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>