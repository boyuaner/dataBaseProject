import {action, computed, observable} from 'mobx';
export default class UserInfoStore {
    @observable 
    user = {
        userId:'',
        name:'',
        manager:false,
        userPhoneNum:'',
        refreshMyList:false,
    };
    @computed 
    get userId(){
        return this.user.userId;
    }
    @computed 
    get refreshMyList(){
        return this.user.refreshMyList;
    }
    @computed 
    get name(){
        return this.user.name;
    }
    @computed 
    get manager(){
        return this.user.manager;
    }
    @action 
    updateUser(user){
        this.user = user;
    }
    @action 
    updateMyList(fresh){
        this.user.refreshMyList = fresh;
    }
    @action
    updateUserId(userId){
        this.user.userId = userId;
    }
}