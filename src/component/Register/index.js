import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import "../../App.css"
import api from "../../api"
const { Title } = Typography;


class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let url = api.host + api.register;
        fetch( url ,{
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          method: 'POST', // or 'PUT'
          body: JSON.stringify(values), 
        }).then( 
            response => {
                if(response.status === 200){
                    alert("注册成功！");
                    this.props.history.push('/main');
                    console.log('Success:', response);
                }
            }
          )
        .catch(
        //   alert("注册失败"),
          error => {
              console.error('Error:', error);
              this.props.history.push('/main');
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
                {getFieldDecorator('repeatPassword', {
                    rules: [{ required: true, message: 'Repeat your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="repeatPassword"
                    />,
                )}
            </Col>
          </Form.Item>
          <Form.Item>
          <Col span={4} offset={10}>
            {getFieldDecorator('phoneNum', {
                rules: [{ required: true, message: 'Input your phone number' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="phoneNumber"
                />,
              )}
          </Col>
          </Form.Item>
          <Form.Item>
                <Col span={4} offset={10}>
                    <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                    Register
                    </Button>    
                    <br/>
                    <Link to="/login">Have an account? Login!</Link>
                </Col>
                
            </Form.Item>
          
        </Row>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;