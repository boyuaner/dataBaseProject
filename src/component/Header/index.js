import React from "react"
import {Link} from "react-router-dom"
import { Layout, Menu, Breadcrumb,Row,Col,Button,Icon } from 'antd';
import { Typography } from 'antd';
import "../../App.css"
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const {SubMenu} = Menu;
class MySidebar extends React.Component {
    state = {
      collapsed: false,
      current: 'mail',
      Content:"ahhaha",
    };
  
    handleClick = e => {
      console.log('click ', e);
      this.setState({
        Content:"66666",
      });
    };
  
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  
    render() {
      return (

          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' ,background:'white'}}>
           <Row>
            <Col span = {2} >
            <Button type="link" onClick={this.handleClick}>
              <Title level ={3}>
                校园活动管理系统
              </Title>
            </Button>
            </Col>
            
            <Col span = {6} offset={4}>
            <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/activitiList">活动列表</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/myActivitiList">我的活动</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/activitiList">排行</Link></Menu.Item>
            </Menu>
            </Col>
              
              <Col span = {4} offset={8}>
              <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              >
              <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="setting" />
                  UserName
                </span>
              }
            >
              <Menu.ItemGroup title="Info">
                <Menu.Item key="setting:1"><Icon type="user" />
                我的资料
                <Link to="/userInfo"/>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Manage">
                <Menu.Item key="setting:2"><Icon type="fire" />
                管理活动
                <Link to="/manageAct"/>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Exit">
                <Menu.Item key="setting:3"><Icon type="export" />
                退出
                <Link to="/logout"/>
                </Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
            </Menu>
            </Col>
           </Row>
          </Header>
          /*{ <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */
        

      );
    }
  }
  export default MySidebar;