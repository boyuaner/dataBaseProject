import React from "react";
import Header from "../Header";
import MyContent from "../Content";
import {Route,Switch,Router,Redirect,withRouter} from "react-router-dom";
import UserInfo from '../UserInfo'
import ActivitiList from '../ActivitiList'
import MyActivitiList from '../MyActivitiList'
import ManageActList from '../ManageActList'
import Rank from '../Rank'
import { Layout } from "antd";
import "../../App.css"
import { createBrowserHistory } from 'history'
import globalContext from '../globalContext'
let history = createBrowserHistory();
// {Footer} = Layout;
class MainPage extends React.Component{
    static contextType = globalContext;
    componentDidMount(){
        if(this.context.userId === ""){
            
            this.props.history.push("/login");
        }else {
            // this.props.history.push("/activitiList")
            console.log(this.context.userId);
        }
    }
    requireAdmin(Layout,props){
        if(this.context.manager){
            return <Layout {...props}/>
        }else {
            return <div/>
        }
    }
    render(){
        return (
            <Router history={history}>
                <Layout>
                <Header/>
                <MyContent>
                    <Switch>
                        {/* <Route exact path="/" component={ActivitiList} /> */}
                        <Route path="/activitiList" component={ActivitiList} />
                        <Route path="/myActivitiList" component={MyActivitiList} />
                        <Route path="/userInfo" component={UserInfo} />
                        <Route path="/manageAct" component={props=>this.requireAdmin(ManageActList,props)} />
                        <Route path="/rank" component={Rank} />
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