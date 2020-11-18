export const state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations={
   changeUserInfo(state,obj){
       state.userInfo=obj
       sessionStorage.setItem("userInfo",JSON.stringify(obj))
   }
}
export const getters={
    userInfo(state){
        return state.userInfo
    }
}