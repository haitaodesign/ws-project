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
//项目日报
export function getproReports(){
    return fetch({
        url:'/proReports',
        method:'post',
        data:{
            current:1,
            pageSize: 5
        }
    })
}

//任务日报
export function getselectSubtaskReport(){
    return fetch({
        url:'/selectSubtaskReport',
        method:'post',
        data:{
            current: 1,
            pageSize: 5
        }
    })
}
// 日报（子任务日报）
export function getselectTaskReport(){
    return fetch({
        url:'/selectTaskReport',
        method:'post',
        data:{
            current:1,
            pageSize:5 
        }
    })
}

export function submitApplyData(data){
    return fetch({
        url:'/applyProject',
        method:'post',
        data:data,
        dataType:'json'
    })
}
//归档项目列表
export function getselectFinPro(data){
    return fetch({
        url:'/selectFinPro',
        method:'post',
        data:{
            current:1,
            pageSize:5  
        }
    })
}
//归档项目详情页
export function getselectFinProInfo(data){
    return fetch({
        url:'/selectFinProInfo',
        method:'post',
        data:{
            id:1,
            proId:1
        }
    })
}
//查询回收列表
export function getselectRecPro(data){
    return fetch({
        url:'/selectRecPro',
        method:'post',
        data:{
            current:1,
            pageSize:5
        }
    })
}
//驳回详情页
export function getselectRecProInfo(data){
    return fetch({
        url:'/selectRecProInfo',
        method:'post',
        data:{
            id:1,
            proId:1
        }
    })
}
//立项待审批
export function getUpProjectList(data){
    return fetch({
        url:'/getUpProjectList',
        method:'post',
        data:{
          current:1,
          pageSize:5  
        }
    })
}
//立项待审批详情页
export function getUpDetails(data){
    return fetch({
        url:'/getUpDetails',
        method:'post',
        data:{
            id:1,
            proId:1
        }
    })
}
//上线待审批列表
export function getOnlinePro(data){
    return fetch({
        url:'/selectOnPro',
        method:"post",
        data:{
            current:1,
            pageSize:5
        }
    })
}
//上线待审批详细信息
export function getselectOnProInfo(data){
    return fetch({
        url:'/selectOnProInfo',
        method:'post',
        data:{
            id:1,
            proId:1
        }
    })
}
//审批通过
export function getselectInsertProPassLog(data){
    return fetch({
        url:'/selectInsertProPassLog',
        method:'post',
        data:{
            proId:1
        }
    })
}
//审批驳回
export function getselectInsertProReturnLog(data){
    return fetch({
        url:'/selectInsertProReturnLog',
        method:'post',
        data:{
            proId:1
        }
    })
}