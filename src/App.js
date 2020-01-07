import React from "react"
import Login from "./component/Login"
import Register from "./component/Register"
import MainPage from "./component/MainPage"
import { CookiesProvider } from 'react-cookie';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {Provider} from 'mobx-react'
import Store from './store/store'
import globalContext from './component/globalContext'
let history = createBrowserHistory();
const store = {
  store:new Store()
}
export default class App extends React.Component {

  render() {
    return (
      <CookiesProvider>
         <Provider {...store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forget" component={Register} />
              <Redirect from='' to="/login" />
            </Switch>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}