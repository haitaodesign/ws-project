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

/**
 * 开发中详情页日记记录和开发日志
 * @param {*} params 
 */
export function getMyProjectDetailsLog(params){
    return fetch({
        url:'/getMyProjectDetailsLog',
        method:'post',
        data:params
    });
}

/**
 * 根据类型查询二级类型名称
 * @param {*} params 
 */
export function getSecondLeverType(params){
    return fetch({
        url:'/getSecondLeverType',
        method:'post',
        data:params
    });
}

// 任务分配详情页api


/**
 * 基本信息，项目信息，参与组
 * @param {*} params 
 */
export function getTaskDetails(params){
    return fetch({
        url:'/getTaskDetails',
        method:'post',
        data:params
    });
}

/**
 * 子任务列表
 * @param {*} params 
 */
export function getSubTaskList(params){
    return fetch({
        url:'/getSubTaskList',
        method:'post',
        data:params
    });
}

/**
 * 子任务列表RUD
 * @param {*} params 
 */
export function handleSubTaskList(params){
    return fetch({
        url:'/handleSubTaskList',
        method:'post',
        data:params
    });
}

/**
 * 获取处理人数据
 * @param {*} params 
 */
export function getMembersByLoginUser(){
    return fetch({
        url:'/getMembersByLoginUser',
        method:'post',
    });
}


/**
 * 添加开发日志
 * @param {*} params 
 */
export function addProDeveLog(params){
    return fetch({
        url:'/addProDeveLog',
        method:'post',
        data:params
    });
}

