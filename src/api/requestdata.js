// 通过封装axios和调用mock数据，统一管理api接口数据
import fetch from '../utils/fetch.js'

export function login(loginform){
    return fetch({
        url:'/index',
        method:'get',
        params:loginform
    });
}

export function getHomeData(){
    return fetch({
        url:'/getIndexInfo',
        method:'post'
    })
}

export function getDeptData(){
    return fetch({
        url:'/getDepartment',
        method:'post'
    })
}

export function getGroupData(data){
    return fetch({
        url:'/getGroup',
        method:'post',
        data:data
    })
}
// 项目统计列表
export function getselectOnPro(){
    return fetch({
      url:'/ProReport/selectOnPro',
      method:'post',
     
})
}
// 日报
export function getselectTaskReport(){
    return fetch({
        url:'/DayReport/selectTaskReport',
        method:'post',
        data:{
            current:1,
            pageSize:5 
        }
    })
}