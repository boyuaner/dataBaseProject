import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { Link,withRouter } from 'react-router-dom'
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import globalContext from "../globalContext";
import "../../App.css"
import api from "../../api"
import '../../mock/mock';
const { Title } = Typography;


class NormalLoginForm extends React.Component {
  static contextType = globalContext;
  state = {
    loading : false,
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading:true,
        })
        console.log('Received values of form: ', values);
        let url = api.host + api.login;
        fetch( url ,{
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          method: 'POST', // or 'PUT'
          body: JSON.stringify(values), 
        }).then( 
          response => {
            response.json().then(data =>{
                console.log(data);
                if(data.code === 0){
                  this.context.manager = data.obj.isManager === 1 ? true : false;
                  this.context.userId = values.stuId;
                  this.context.userName = data.obj.name;
                  this.props.history.replace('/');
                  message.success("登录成功!");

                }else {
                  message.warning("登录失败！请检查用户名或密码！")
                }
              }
            )
          }
        )
      .catch(
        error =>{
          message.warning("登录异常");
          console.error('Error:', error)
        } 
      );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row>
        <Col span={24}><br/> </Col>
        <Col span={24}><br/> </Col>
        <Col span={24}><br/> </Col>
        <Col span={24}><br/> </Col>
          <Col span={8} offset={10}>
          <Title >校园活动管理助手</Title >
          </Col>
          <Form.Item>
          <Col span={4} offset={10}>
              {getFieldDecorator('stuId', {
                rules: [{ required: true, message: 'Please input your studentID!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="studentID"
                />,
              )}
          </Col>
          </Form.Item>
          <Form.Item>
          <Col span={4} offset={10}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
          </Col>
          </Form.Item>
          <Form.Item>
          <Col span={4} offset={10}>
              {/* {
                getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })()} */}
              <Checkbox>Remember me</Checkbox>
              <Link to="/forget">
                Forgot password? <br/> 
              </Link>
          </Col>
            
            <Col span={4} offset={10}>
              <Button loading={this.state.loading} size="large" type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>    
                <br/>
            </Col>
            
            <Col span={3} offset={10}>Or  <Link to="/register">register now!</Link></Col>
            </Form.Item>
          
        </Row>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default withRouter(WrappedNormalLoginForm);