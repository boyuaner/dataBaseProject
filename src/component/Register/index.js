import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { Link,withRouter } from 'react-router-dom'
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import "../../App.css"
import api from "../../api"
import {observer,inject} from "mobx-react"
const { Title } = Typography;

@inject("store")
@observer
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const url = api.host + api.register;
        fetch( url ,{
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          method: 'POST', // or 'PUT'
          body: JSON.stringify(values), 
        }).then( 
            res => {
                res.json().then(data =>{
                  if(data.code === 0){
                    this.props.store.updateUser ({
                      manager : false,
                      userId: values.stuId,
                      name : data.obj.name,
                  })
                    // this.props.store.updateUserId(values.stuId);
                    this.props.history.replace('/main');
                    message.success("注册成功!");

                  }else {
                    message.warning("注册失败！请检查用户名或密码！")
                  }
                }
              )
            }
          )
        .catch(
        //   alert("注册失败"),
          error => {
              console.error('Error:', error);
            }
          );
        }
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {getFieldValue} = this.props.form;
    return (
      <div>
      <img style={{"position":"absolute","height":"1269px","width":"2558px"}} src="/background.jpg" alt=""/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Row>
        <Col span={10} offset={10}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={[30,10]}>
            <Col span={24}>
            <Title >校园活动管理助手</Title >
            </Col>
            
            <Form.Item>
            <Col span={12}>
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
            <Col span={12}>
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
              <Col span={12}>
                  {getFieldDecorator('repeatPassword', {
                      rules: [
                        { required: true,message: '请再次输入新密码(6~20位数字、字母或下划线)'},
                        { validator(rule, value, callback){
                            if(!value){
                                callback()//如果还没填写，则不进行一致性验证
                            }
                            if(value === getFieldValue('password')){
                                callback()
                            }
                            else{
                                callback('两次密码不一致')
                            }
                        }}
                    ],
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
            <Col span={12}>
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
              <Col span={24} >
                  <Button onClick={this.handleSubmit} size="large" type="primary">
                  Register
                  </Button>    
                  <br/>
                  
              </Col>
              <Col span={6}>
              <Link to="/login">Have an account? Login!</Link>
              </Col>
          </Row>
        </Form>
        </Col>
      </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default withRouter(WrappedNormalLoginForm);