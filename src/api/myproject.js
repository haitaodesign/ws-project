import fetch from '../utils/fetch.js'

export function getprojectlist(params){
    return fetch({
        url:'/getMyProjectList',
        method:'post',
        data:params
    })
}

export function getMembersBySquadId(params){
    return fetch({
        url:'/getMembersBySquadId',
        method:'post',
        data:params
    })
}

export function getMyProjectDetails(params){
    return fetch({
        url:'/getMyProjectDetails',
        method:'post',
        data:params
    })
}

/**
 * 参与组数据添加、修改、删除
 * @param {*} params 
 */
export function groupHandle(params){
    return fetch({
        url:'/groupHandle',
        method:'post',
        data:params
    })
}

export function getMyProjectDetailsLog(params){
    return fetch({
        url:'/getMyProjectDetailsLog',
        method:'post',
        data:params
    });
}