import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { Link,withRouter } from 'react-router-dom'
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import "../../App.css"
import api from "../../api"
import '../../mock/mock';
// import bkgimg from '../../../public/background.png'
import {observer,inject} from "mobx-react"

const { Title } = Typography;

@inject("store")
@observer
class NormalLoginForm extends React.Component {
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
                if(data.code === 0){
                  this.props.store.updateUser ({
                    refreshMyList:false,
                    manager : data.obj.isManager === 1 ? true : false,
                    userId: values.stuId,
                    name : data.obj.name,
                })
                  // this.props.store.updateUserId(values.stuId);
                  this.props.history.replace('/main');
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
      <div>
      <img style={{"position":"absolute","height":"1269px","width":"2558px"}} src="/background.png" alt=""/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Row>
        <Col span={9} offset={11}>
          <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={[30,10]}>
            <Col span={24}>
            <Title >校园活动管理助手</Title >
            </Col>
            <Form.Item>
            <Col span={6} >
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
            <Col span={6} >
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
            <Col span={24} >
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
            <br/>
              <Col span={24}>
                <Button loading={this.state.loading} size="large" type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>    
                  
              </Col>
              <br/>
              <Col span={3}>Or  <Link to="/register">register now!</Link></Col>
              </Form.Item>
            
          </Row>
        </Form>
      </Col>
    </Row>
    </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default withRouter(WrappedNormalLoginForm);