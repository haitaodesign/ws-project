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