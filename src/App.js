import React from "react"
import Login from "./component/Login"
import Register from "./component/Register"
import MainPage from "./component/MainPage"

import { Router, Route, Switch,Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();

function requireAuth(Layout, props) {
    if (false) { // 未登录
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
                    <Route exact path="/" component={props=>requireAuth(MainPage,props)}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Redirect from='' to="/" />
                </Switch>
            </Router>
        );
    }
}