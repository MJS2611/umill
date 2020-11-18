import axios from "axios"
import qs from "qs"
import store from "../store"
import router from "../router"
import { errorAlert } from "./alert"
import Vue from "vue"
//开发环境使用 8080
let baseUrl = "/aa"
Vue.prototype.$imgPre = "http://localhost:3000"
//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$imgPre=""

// 请求拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    console.log(res);
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if (res.data.msg === "登录已过期或访问权限受限") {
        store.dispatch("changeUser", {})
        router.push("/login")
    }
    return res
})


// 失败弹框
axios.interceptors.response.use(res => {
    console.log("本次请求的地址是" + res.config.url);
    console.log(res)
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    return res
})

/*  菜单接口 */
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}
//列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 详情
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })

}
// 更新
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

/* 角色管理接口 */
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}
// 列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
// 删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 编辑
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

/* 管理员管理  */
export const reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 列表
export const reqManageList = (sp) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: sp
    })
}
// 删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}
//详情
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//修改
export const reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}

/* 登录接口 */
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

// 会员list
export const reqVipList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",

    })
}

// 编辑
export const reqVipDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 修改
export const reqVipUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 商品分类
export const reqCateAdd = (cate) => {
    let dd = new FormData()
    for (let i in cate) {
        dd.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dd
    })
}

// 列表
export const reqCateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}

//删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// .详情
export const reqCateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改
export const reqCateUpdate = (cate) => {
    let dd = new FormData()
    for (let i in cate) {
        dd.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dd
    })
}

// 添加 
export const reqSpecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 
export const reqSpecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqSpecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 修改 
export const reqSpecsUpdate = (user) => {

    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
// 总数
export const reqSpecsCount = () => {

    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// 轮播图
export const reqBannerAdd = (banner) => {
    let dd = new FormData()
    for (let i in banner) {
        dd.append(i, banner[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dd
    })
}

// 列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}

//删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// .详情
export const reqBannerDetail = id => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改
export const reqBannerUpdate = (banner) => {
    let dd = new FormData()
    for (let i in banner) {
        dd.append(i, banner[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dd
    })
}

// 商品管理
export const reqGoodsAdd = (goods) => {
    let dd = new FormData()
    for (let i in goods) {
        dd.append(i, goods[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dd
    })
}

// 列表
export const reqGoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// .详情
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改
export const reqGoodsUpdate = (goods) => {
    let dd = new FormData()
    for (let i in goods) {
        dd.append(i, goods[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dd
    })
}

// 总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}



