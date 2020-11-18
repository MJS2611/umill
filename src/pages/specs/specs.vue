<template>
  <div>
    <el-button type="primary" @click="willAdd" class="btn">添 加</el-button>

    <v-form :info="info" ref="form"></v-form>

    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加规格",
      },
    };
  },
  components: {
    vForm,
    vList,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加规格",
      };
    },
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑规格",
      }
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>