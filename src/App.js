import React from "react"
import Login from "./component/Login"
import Register from "./component/Register"
import MainPage from "./component/MainPage"
import { Router, Route, Link,Switch,Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();

function requireAuth(Layout, props) {
    if (true) { // 未登录
      return <Redirect to="/login" />;
    } else {
      return <Layout {...props} />
    }
  }

export default class App extends React.Component{
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/main" component={props=>requireAuth(MainPage,props)} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
                
            </Router>
        );
    }
}