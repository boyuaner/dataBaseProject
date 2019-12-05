import React from "react"
import Login from "./component/Login"
import Register from "./component/Register"
import MainPage from "./component/MainPage"
import { Router, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
let history = createBrowserHistory();
export default class App extends React.Component{
    render(){
        return (
            <Router history={history}>
                {/* <Route exact path="/login" component={Login} /> */}
                {/* <Route exact path="/register" component={Register} /> */}
                <Route exact path="/" component={MainPage} />
            </Router>
        );
    }
}