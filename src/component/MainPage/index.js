import React from "react";
import Header from "../Header";
import MyContent from "../Content";
import {Route,Switch,Router,Redirect,withRouter} from "react-router-dom";
import UserInfo from '../UserInfo'
import ModifyProj from '../ModifyProj'
import MyActivitiList from '../MyActivitiList'
import ManageActList from '../ManageActList'
import Rank from '../Rank'
import api from "../../api"
import {observer,inject} from "mobx-react"
import { Layout,message } from "antd";
import "../../App.css"
import { createBrowserHistory } from 'history'
import Article from '../Article'

let history = createBrowserHistory();
// {Footer} = Layout;
@inject("store")
@observer
class MainPage extends React.Component{
    componentDidMount(){
        if(this.props.cookies.get("id") === undefined){
            this.props.history.push("/login");
        }else {
            let url = api.host + api.sendCookie;
            fetch( url ,{
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'GET', // or 'PUT'
                }).then( 
                response => {
                    response.json().then(data =>{
                        if(data.code === 0){
                        this.props.store.updateUser ({
                            refreshMyList:false,
                            manager : data.obj.isManager === 1 ? true : false,
                            userId: this.props.cookies.get("id"),
                            name : data.obj.name,
                        })
                        this.props.history.push('/main');
                        // message.success("登录成功!");
                        }else {
                        message.warning("登录失败！请检查用户名或密码！")
                        }
                    }
                    )
                }
                )
            .catch(
                error =>{
                message.warning("登录异常");
                console.error('Error:', error)
                } 
            );
        }
    }
    requireAdmin(Layout,props){
        if(this.props.store.user.manager){
            return <Layout {...props}/>
        }else {
            return <div/>
        }
    }
    handleLogout = ()=>{
        message.success("已退出");
        this.props.store.updateUser({
          userId:'',
          userName:'',
          manager:false,
          userPhoneNum:'',
        })
        this.props.cookies.remove("id");
        this.props.history.push("/login");
      }
    render(){
        return (
            <Router history={history}>
                <Layout>
                <Header logout={this.handleLogout}/>
                <MyContent>
                    <Switch>
                        <Route path='/main' component={MyActivitiList} />
                        {/* <Route path="/myActivitiList" component={MyActivitiList} /> */}
                        <Route path="/userInfo" component={UserInfo} />
                        <Route path="/actDetail/:id" component={Article}/>
                        <Route exact path="/manageAct" component={props=>this.requireAdmin(ManageActList,props)} />
                        <Route path="/manageAct/:id" component={props=>this.requireAdmin(ModifyProj,props)} />
                        
                    </Switch>
                </MyContent>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                {/* <MyModal/> */}
                </Layout>
            </Router>
        );
    }
}
export default withRouter(MainPage);