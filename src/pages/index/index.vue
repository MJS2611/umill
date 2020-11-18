<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <!-- 侧边栏导航 background-color 背景色 text-color 字体颜色
        active-text-color 激活的文字的颜色 unique-opened 只有一个子菜单展开
        router 路由模式-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <span class="ospans">{{userInfo.username}}</span>
            <el-button type="primary" size="mini" @click="logout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name" class="main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    logout() {
      this.changeUser({});
      this.$router.push("./login");
    },
  },
  mounted() {
    console.log(this.userInfo);
  },
};
</script>

<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.main {
  padding-bottom: 20px;
}
.header {
  position: absolute;
  top: 15px;
  right: 0;
}
</style>