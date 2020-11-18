<template>
  <div>
    <el-button type="primary" @click="willAdd" class="btn">添 加</el-button>

    <v-list :list="list" @edit="edit" @init="init"></v-list>

    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import { reqRoleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "",
      },
      list: [],
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
      this.info = { isshow: true, title: "添加角色" };
    },
    init(id) {
      reqRoleList(id).then(res=>{
        this.list = res.data.list
      })
    },
    edit(id){
      this.info = {
        isshow:true,
        title:"编辑角色",
      },
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    this.init()
  },
};
</script>
<style scoped>

</style>