import Mock from 'mockjs';
import FetchMock from 'fetch-mock';
import api from '../api';
FetchMock.once(api.host+api.login,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'yqy',
}}))
FetchMock.once(api.host+api.actList+"?stdId=201805130168",Mock.mock({
    'actiList|3-5':[{ //活动列表 
    	'proj_id|+1':0, // 活动id
        'Title':"", //活动名称
        'Endtime':'@date("yyyy-MM-dd")', //活动结束时间
    	'Type|1':["Qua","Arr","Noti"], // 活动类型
        'Creator':"@cname" // 活动创建者
    }]
}))
FetchMock.once(api.host+api.actDetail,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'yqy',
}}))
FetchMock.once(api.host+api.userInfo,Mock.mock({
    'code':0,
    'obj':{
    'isManager':1,
    'name':'yqy',
}}))
FetchMock.once('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
  });