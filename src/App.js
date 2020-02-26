import React from "react"
import Login from "./component/Login"
import { withCookies } from 'react-cookie';
import Register from "./component/Register"
import MainPage from "./component/MainPage"
import { Route, Switch, Redirect } from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
        <Switch>
          <Route exact path="/main" render={() => (<MainPage cookies={this.props.cookies}/>)} />
          <Route exact path="/login" render={() => (<Login cookies={this.props.cookies}/>)} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget" component={Register} />
          <Redirect from='' to="/login" />
        </Switch>
    );
  }
}
export default withCookies(App);