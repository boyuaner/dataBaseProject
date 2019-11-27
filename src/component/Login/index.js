import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import "../../App.css"
import api from "../../api"
const { Title } = Typography;


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let url = api.host + api.login;
        fetch( url ,{
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          method: 'POST', // or 'PUT'
          body: JSON.stringify(values), 
        }).catch(
          alert("登陆失败"),
          error => console.error('Error:', error)
        )
        .then(
          alert("登录成功！"),
          response => console.log('Success:', response)
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
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
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
              <a className="login-form-forgot" href="">
                Forgot password? <br/> 
              </a>
          </Col>
            
            <Col span={4} offset={10}>
              <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>    
                <br/>
            </Col>
            
            <Col span={3} offset={10}>Or  <a href="">register now!</a></Col>
            </Form.Item>
          
        </Row>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;