import React from "react";
import Header from "../Header";
import MyContent from "../Content";
import {Route,Switch,Router} from "react-router-dom";
import UserInfo from '../UserInfo'
import ActivitiList from '../ActivitiList'
import MyActivitiList from '../MyActivitiList'
import ManageActList from '../ManageActList'
import Rank from '../Rank'
import { Layout } from "antd";
import "../../App.css"
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();
// {Footer} = Layout;
class MainPage extends React.Component{
    render(){
        return (
            <Router history={history}>
                <Layout>            
                <Header/>
                <MyContent>
                    <Switch>
                        <Route exact path="/" component={ActivitiList} />
                        <Route path="/activitiList" component={ActivitiList} />
                        <Route path="/myActivitiList" component={MyActivitiList} />
                        <Route path="/userInfo" component={UserInfo} />
                        <Route path="/manageAct" component={ManageActList} />
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
export default MainPage;