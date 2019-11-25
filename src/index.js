/**
 * 程序的入口, 类似java中的main
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import './utils/index.js';  // 引入各种prototype辅助方法
import store from 'redux/store.js';  // redux store

// 开始引入各种自定义的组件
import App from './components/App';
import Welcome from './components/Welcome';
import Error from './components/Error';
import Hello from './components/Hello';
import actList from './components/myTable';
import fileList from './components/fileList';
import userInfo from './components/myInfo';
//import DBTable from './components/DBTable';

// 将DBTable组件做成动态路由, 减小bundle size
// 注意不要再import DBTable了, 不然就没意义了
// 一些比较大/不常用的组件, 都可以考虑做成动态路由
const DBTableContainer = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./components/DBTable').default)
  }, 'DBTable');
};

// 路由表, 只要menu.js中所有的叶子节点配置了路由就可以了
// 我本来想根据menu.js自动生成路由表, 但那样太不灵活了, 还是自己配置好些
const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />

        <Route path="mainPage" component={Welcome} />

        <Route path="activities">
          <Route path="option1" component={actList} />
          <Route path="option2" component={Hello} />
          <Route path="option3" component={Hello} />
        </Route>
        <Route path="suTuo" component={actList} />
        <Route path="homeWork" component={fileList} />

        {/* //右上菜单 */}
        <Route path="userMenu" >
          <Route path="userInfo" component={userInfo} />
          <Route path="security" component={Hello} />
          <Route path="class" component={Hello} />
          <Route path="manager" >
            {/* <Route path="create" tableName="test" getComponent={DBTableContainer} /> */}
            <Route path="manageAct" tableName="test" getComponent={DBTableContainer} />
          </Route>
        </Route>

      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
