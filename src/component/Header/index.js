import React from "react"
import {Link,withRouter} from "react-router-dom"
import { Layout, Menu, Breadcrumb,Row,Col,Button,Icon, message, Divider } from 'antd';
import { Typography,Input } from 'antd';
import "../../App.css"
import {observer,inject} from "mobx-react"
import api from "../../api"
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const {SubMenu} = Menu;
@inject("store")
@observer
class MySidebar extends React.Component {
    state = {
      collapsed: false,
      actToken:"",
      upOrRight:'up',
    };
  
    backToHome = e => {
      this.props.history.push('/')
    };
  
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
    
    handleTokenChange = (e) => {
      this.setState({
        actToken: e.target.value,
      })
    }
    hadleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) =>{
      console.log(selectedKeys);
    }
    handleTokenClick = (e) => {
      let url = api.host+api.joinAct+"?projToken="+this.state.actToken+"&stuId="+this.state.stuId;
      fetch(url,{
        method: 'GET',
      }).then(
        res=>{
          res.json().then(
            data=>{
              console.log(data.code);
              if(data.code === 0){
                message.success("加入成功！");
              }else if(data.code === -1){
                message.error("加入失败！无权限加入");
              }else {
                message.error("加入失败！")
              }
            }
          )
        }
      )
    }

    render() {
      // console.log(this.props.store)
      const MenuUpRight = (
        
        <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="setting" />
                  {this.props.store.user.name}
                </span>
              }
            >
        <Menu.ItemGroup title="Info">
          <Menu.Item key="setting:1"><Icon type="user" />
          我的资料
          <Link to="/userInfo"/>
          </Menu.Item>
        </Menu.ItemGroup>
        {(this.props.store.user.manager === true) ? (<Menu.ItemGroup title="Manage">
          <Menu.Item key="setting:2"><Icon type="fire" />
          管理活动
          <Link to="/manageAct"/>
          </Menu.Item>
        </Menu.ItemGroup>) : null }
        <Menu.ItemGroup title="Exit">
          <Menu.Item key="setting:3" onClick={this.props.logout}><Icon type="export" />
          退出
          </Menu.Item>
          </Menu.ItemGroup>
          </SubMenu>
      );
      return (

          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' ,background:'white'}}>
           <Row>
            <Col span = {2} >
            <Button type="link" onClick={this.backToHome}>
              <Title level ={3}>
                校园活动管理系统
              </Title>
            </Button>
            </Col>
            
            {/* <Col span = {6} offset={4}>
            <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onSelect={this.hadleSelect}
            >
              
            </Menu>
            </Col> */}
            <Col span = {2} offset={10} >
              <Input 
              size="default" 
              placeholder="请输入活动口令！" 
              value={this.state.actToken} 
              onPressEnter={this.handleTokenClick} 
              onChange={this.handleTokenChange}/>
            </Col>
            
            <Col span = {2}><Divider type="vertical "/>
            <Button onClick={this.handleTokenClick}>加入！</Button></Col>
              <Col span = {4}>
              <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onSelect={this.hadleSelect}
              >
              <Menu.Item key="1" ><Link to="/myActivitiList">我的活动</Link></Menu.Item>
              {MenuUpRight}
            </Menu>
            </Col>
           </Row>
          </Header>
    
      );
    }
  }
  export default withRouter(MySidebar);