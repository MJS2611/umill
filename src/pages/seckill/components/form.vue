<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px" prop="value">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change="time"
            >></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid" placeholder="请选择分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择分类" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" prop="goodsid">
          <el-select v-model="user.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in threeCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsList,
  reqSeckAdd,
  reqSeckDetail,
  reqSeckUpdate,
  reqSeckDel,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // value: [{type:'date',required:true,message:'请输入时间',trigger:'change'}],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsid: [{ required: true, message: "请选择商品", trigger: "change" }],
       
      },
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: "",
      // 二级分类的list
      secondCateList: [],
      threeCateList: [],
      //规格属性list
      // attrsList: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqSeckList: "seckill/reqList",
    }),
    time(value) {
      (this.user.begintime = value[0]), (this.user.endtime = value[1]);
    },
    changeFirst() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeSecond() {
      reqGoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.threeCateList = res.data.list;
        console.log(this.threeCateList);
      });
    },
    empty() {
      (this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.value = "");
      this.secondCateList = [];
    },
    cancel() {
      this.info.isshow = false;
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.value.length === 0) {
          errorAlert("请选择时间");
          return;
        }
        if (this.user.first_cateid === "") {
          errorAlert("请选择一级分类");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("请选择二级分类");
          return;
        }
        
        if (this.user.goodsid === "") {
          errorAlert("商品不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then((res) => {
        reqSeckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.reqSeckList();
          }
        });
      });
    },
    getOne(id) {
      reqSeckDetail(id).then((res) => {
        console.log(res);
        this.user = res.data.list;
        this.user.id = id;
        this.changeFirst();
        this.changeSecond();
        this.value = [
          new Date(Number(res.data.list.begintime)),
          new Date(Number(res.data.list.endtime)),
        ];
      });
    },
    update() {
      reqSeckUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.reqSeckList();
        }
      });
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
    opened() {
      this.editor = new E("#edit");
      this.editor.txt.html(this.user.description);
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
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