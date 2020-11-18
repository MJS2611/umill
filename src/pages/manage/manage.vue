<template>
  <div>
    <el-button type="primary" @click="willAdd " class="btn" >添 加</el-button>

    <v-list :list="list" @init="newInit" @edit="edit"></v-list>
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

    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import { reqManageList, reqManageCount } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加用户",
      },
      list: [],
      total: 0,
      size: 2,
      page: 1,
    };
  },
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加用户",
      };
    },
    init() {
      reqManageList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list ? res.data.list : [];
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
        console.log(this.list )
      });
    },
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑用户",
      };
      this.$refs.form.getOne(uid);
    },
    newInit() {
      this.init();
      this.getCount();
    },
    getCount() {
      reqManageCount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    changePage(page) {
      (this.page = page), this.init();
    },
  },
  mounted() {
    this.init();
    this.getCount();
  },
};
</script>
<style scoped>
.total {
  margin-top: 20px;
  text-align: right;
}
</style>