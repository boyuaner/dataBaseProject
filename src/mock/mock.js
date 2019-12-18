import Mock from 'mockjs';
import FetchMock from 'fetch-mock';
import api from '../api';
FetchMock.once(api.host+api.login,Mock.mock({
    'code':0,
    'obj':{
    'isManager|':1,
    'name':'@cname',
}}))
FetchMock.get(RegExp(api.host+api.actList+".*"),Mock.mock({
    'obj':{
        'actList|3-5':[{ //活动列表 
            'proj_id|+1':0, // 活动id
            'Title':"@ctitle", //活动名称
            'Endtime':'@date("yyyy-MM-dd")', //活动结束时间
            'Type|1':["Qua","Arr","Noti"], // 活动类型
            'Creator':"@cname" // 活动创建者
        }]
    }})
)
FetchMock.get(RegExp(api.host+api.actDetail+".*"),Mock.mock({
    'obj':{
        'Title':'@ctitle', //活动名称
        'Type|1':["Qua","Arr","Noti"], // 活动类型
        'Endtime':'@date("yyyy-MM-dd")',  //活动结束时间
        'Creator':"@cname", // 活动创建者
        'article':'@cparagraph', // 活动文章
        'question|3-5':[{
            'content':'@csentence', 
            'id|+1':0,
        }], // 活动 问题-id-内容
        'file|1-2':[{
            'name':'@ctitle',
            'id|+1':0,
        }], // 活动可下载文件的id
        'upload':[{
            'name':'@ctitle', 
            'typeLimit|1':[
                '.jpg','.png','.cpp','.c','.py','.js','.html','.java'
            ], 
            'timeLimit':'@time', 
            'sizeLimit|1-100':1, 
            'id|+1':0,
        }], // 活动-上传文件要求
        'Questionnaire':'http://wjx.top', // 活动问卷
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
FetchMock.once('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
});