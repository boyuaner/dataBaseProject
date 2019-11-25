import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import globalConfig from 'config';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';
import { message, Button, Radio, Row, Col } from 'antd';
import './index.less';
import { loginSuccessCreator } from '../../redux/Login.js';

const logger = Logger.getLogger('Login');

/**
 * 定义Login组件
 */
class Login extends React.PureComponent {

  // 这个login样式是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 一般而言公司内部都会提供基于LDAP的统一登录, 用到这个登录组件的场景应该挺少的

  state = {
    username: '',  // 当前输入的用户名
    password: '',  // 当前输入的密码
    repasssword:'',
    requesting: false, // 当前是否正在请求服务端接口
    register : false,
    tel :'',
    name :'',
  };

  // controlled components

  handleUsernameInput = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordInput = (e) => {
    this.setState({ password: e.target.value });
  };
  handlePasswordReInput = (e) => {
    this.setState({ repassword: e.target.value });
  };

  handleLoginOrRegist = (e) => {
    this.setState({ register: e.target.value });
  }
  handleName = (e) => {
    this.setState({ name: e.target.value });
  }
  handleTel = (e) => {
    this.setState({ tel: e.target.value });
  }
  /**
   * 处理表单的submit事件
   *
   * @param e
   */
  handleSubmit = async(e) => {  // async可以配合箭头函数
    e.preventDefault();  // 这个很重要, 防止跳转
    this.setState({ requesting: true });
    // const hide = message.loading('正在验证...', 0);
    if (this.state.register) {
      const username = this.state.username;
      const password = this.state.password;
      logger.debug('username = %s, password = %s', username, password);
      try {
        // 服务端验证
        const res = await ajax.login(username, password);
        // hide();
        // logger.debug('login validate return: result %o', res);
        console.log(res.text);
        if (JSON.parse(res.text).code === 0)
        // if (res.success)
        {
          message.success('登录成功');
          // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
          this.props.handleLoginSuccess('yqy', (JSON.parse(res.text).obj.isManager === 0 ? 'normal' : 'manager'), username);
        } else {
          message.error(`登录失败: ${res.message}, 请联系管理员`);
          // message.success('登录成功');
          this.setState({ requesting: false });
        }
      } catch (exception) {
        message.error(`网络请求出错: ${exception.message}`);
        logger.error('login error, %o', exception);
        this.setState({ requesting: false });
      }
    } else {
      const username = this.state.username;
      const password = this.state.password;
      const rePassword = this.state.repassword;
      const tel = this.state.tel;
      const name = this.state.name;
      if (password === rePassword) {
        const res = await ajax.register(username, password, tel, name);
        hide();
        try {
          if (JSON.parse(res.text).code == 0)
          // if (res.success)
        {
            message.success('注册成功');
          // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
            this.props.handleLoginSuccess(res.data, res.type, username);
          } else {
            message.error(`注册失败: ${res.message}, 请联系管理员`);
          // message.success('登录成功');
            this.setState({ requesting: false });
          }} catch (exception) {
            message.error(`网络请求出错: ${exception.message}`);
            logger.error('login error, %o', exception);
            this.setState({ requesting: false });
          }
      } else {
        message.error('两次输入密码不同，请检查输入');
        // message.success('登录成功');
        this.setState({ requesting: false });
      }
    }

  };

  render() {
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    return (
      <div id="loginDIV">

        {/*debug模式下显示fork me on github*/}
        <div className="login">
          <h1>{globalConfig.name}</h1>
          <Radio.Group offset={6} value={this.state.register} onChange={this.handleLoginOrRegist}>
            <Radio.Button value>-------登录-------</Radio.Button>
            <Radio.Button value={false}>-------注册-------</Radio.Button>
            <br />
          </Radio.Group>
          <form onSubmit={this.handleSubmit}>
            <input className="login-input" type="text" value={this.state.username}
              onChange={this.handleUsernameInput} placeholder="用户名" required="required"
            />
            <input className="login-input" type="password" value={this.state.password}
              onChange={this.handlePasswordInput} placeholder="密码" required="required"
            />
            {this.state.register ? '' : (
              <input className="login-input" type="password" value={this.state.repassword}
                onChange={this.handlePasswordReInput} placeholder="确认密码" required="required"
              />
            )}
            {this.state.register ? '' : (
              <input className="login-input" type="text" value={this.state.tel}
                onChange={this.handleTel} placeholder="手机号" required="required"
              />
            )}
            {this.state.register ? '' : (
              <input className="login-input" type="text" value={this.state.name}
                onChange={this.handleName} placeholder="姓名" required="required"
              />
            )}

            <button className="btn btn-primary btn-block btn-large"
              type="submit" disabled={this.state.requesting}
    >
              Comfirm
            </button>

          </form>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};

// 不需要从state中获取什么, 所以传一个null
export default connect(null, mapDispatchToProps)(Login);
