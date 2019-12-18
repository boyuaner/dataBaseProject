import {action, computed, observable} from 'mobx';
export default class Store {
    @observable 
    user = {
        userId:'',
        name:'',
        manager:false,
        userPhoneNum:'',
    };
    @computed 
    get userId(){
        return this.user.userId;
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
}