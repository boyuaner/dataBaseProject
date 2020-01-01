import React from "react";
import Header from "../Header";
import MyContent from "../Content";
import {Route,Switch,Router,Redirect,withRouter} from "react-router-dom";
import UserInfo from '../UserInfo'
import ActivitiList from '../ActivitiList'
import MyActivitiList from '../MyActivitiList'
import ManageActList from '../ManageActList'
import Rank from '../Rank'
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
        if(this.props.store.user.userId === ""){
            // this.props.history.push("/login");
        }else {
            return (
                <Redirect to='/activiList'/>
            )
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
        this.props.history.push("/login");
      }
    render(){
        return (
            <Router history={history}>
                <Layout>
                <Header logout={this.handleLogout}/>
                <MyContent>
                    <Switch>
                        <Route exact path="/" component={MyActivitiList} />
                        <Route path="/myActivitiList" component={MyActivitiList} />
                        <Route path="/userInfo" component={UserInfo} />
                        <Route path="/actDetail/:id" component={Article}/>
                        <Route path="/manageAct" component={props=>this.requireAdmin(ManageActList,props)} />
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