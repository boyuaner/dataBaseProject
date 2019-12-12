import React from "react"
import Login from "./component/Login"
import Register from "./component/Register"
import MainPage from "./component/MainPage"
import { CookiesProvider } from 'react-cookie';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import globalContext from './component/globalContext'
let history = createBrowserHistory();

export default class App extends React.Component {

  requireAuth(Layout, props) {
    if (this.context.userId === "") { // 未登录
      return <Redirect to="/login" />;
    } else {
      return <Layout {...props} />;
    }
  }
  render() {
    return (
      <CookiesProvider>
        <globalContext.Provider value={{
          userId : "",
          userPhoneNum: "",
          manager:false,
        }}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={props=>this.requireAuth(MainPage,props)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Redirect from='' to="/" />
            </Switch>
          </Router>
        </globalContext.Provider>
      </CookiesProvider>
    );
  }
}