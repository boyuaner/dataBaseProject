import Mock from 'mockjs';
import FetchMock from 'fetch-mock';
import api from '../api';
FetchMock.post(api.host+api.login,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'@cname',
}}))
FetchMock.get(api.host+api.sendCookie,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'@cname',
}}))
FetchMock.get(api.host+api.actList,Mock.mock({
    'obj':{
        'projList|3-5':[{ //活动列表 
            'projId|+1':0, // 活动id
            'title':"@ctitle", //活动名称
            'endTime':'@date("yyyy-MM-dd")', //活动结束时间
            'type|1':["Qua","Arr","Noti"], // 活动类型
            'creator':"@cname" // 活动创建者
        }]
    }})
)
FetchMock.get(RegExp(api.host+api.actDetail+".*"),Mock.mock({
    'code':0,
    'obj':{
        'title':'@ctitle', //活动名称
        'type|1':["Qua","Arr","Noti"], // 活动类型
        'endTime':'@date("yyyy-mm-dd")',  //活动结束时间
        'creator':"@cname", // 活动创建者
        'content':'@cparagraph', // 活动文章
        'question|3-5':[{
            'content':'@csentence', 
            'id|+1':0,
        }], // 活动 问题-id-内容
        'file|1-2':[{
            'name':'@ctitle',
            'id|+1':0,
        }], // 活动可下载文件的id
        'upload|2':[{
            'name':'@ctitle', 
            'typeLimit|1':[
                '.jpg','.png','.cpp','.c','.py','.js','.html','.java'
            ], 
            'timeLimit':'@time', 
            'sizeLimit|1-100':1, 
            'id|+1':0,
        }], // 活动-上传文件要求
        'questionnaire':'http://wjx.top', // 活动问卷
}}))
FetchMock.post(api.host+api.userInfo,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'yqy',
}}))
FetchMock.post(api.host+api.upload,Mock.mock({
    'code':0,
}))

FetchMock.get(RegExp(api.host+api.joinAct+".*"),Mock.mock({
    'code|0-1':1,
}))
FetchMock.get(RegExp(api.host+api.getParterDetail+".*"),Mock.mock({
    'code|0-1':1,
}))
FetchMock.post(api.host+api.ManList,Mock.mock({
    'obj':{
        'ManList|5-10':[{
            'title':'@ctitle', //活动名称
            'type|1':["Qua","Arr","Noti"], // 活动类型
            'endTime':'@date("yyyy-mm-dd")',  //活动结束时间
            'creator':"@cname", // 活动创建者
            'projId|1-100':1,
        }]
        
}}))
FetchMock.post(api.host+api.token,Mock.mock({
    'code|0-1':0,
    'obj':{
        'token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qX2lkIjoiMjkiLCJzdHVJZCI6IjIwMTgwNTEzMDE2OCIsInRpbWUiOjE1NzgzOTcxNTUwNTIsImlhdCI6MTU3ODM5NzE1NSwiZXhwIjoxNTc5MDAxOTU1LCJpc3MiOiI5ZjY1MWYxMjA3Y2JmMTcwOTVhOWZlYTNhMWVjNmQ3ZCJ9.0kYhnM11eiseI8lYni31qlMW_nkFJ0glnHTPMevac64"
    }
}))

FetchMock.once('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
});