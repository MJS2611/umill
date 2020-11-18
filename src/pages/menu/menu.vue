<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="btn" @click="willAdd">添 加</el-button>

     <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
     
     <v-form ref="form" :info="info" :list="list" @init="init"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import {reqMenuList} from "../../utils/http"


export default {
    data(){
        return{
            info:{
                isshow:false,
                title:"添加菜单"
            },
            list:[]
        }
    },
    components:{
        vList,
        vForm
    },
    computed: {
      ...mapGetters({}),
    },
    methods: {
      ...mapActions({}),
      willAdd(){
          this.info.isshow = true;
          this.info.title = "添加菜单"
      },
      init(){
          reqMenuList().then(res=>{
              this.list = res.data.list;
          })
      },
      edit(id){
        this.info.isshow = true
        this.info.title = "编辑菜单"
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