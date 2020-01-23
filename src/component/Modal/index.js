import { Modal, Button ,message,Col,Row,Form,Input,Divider} from 'antd';
import copy from "copy-to-clipboard"
import React from "react";
import Article from "../Article";
import {withRouter} from "react-router-dom"
import ManageForm from "../ManageForm"
import api from "../../api"
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
class MyModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            visible: false,
            id:this.props.id,
            type:this.props.type,
            tokenGetting:false,
        };
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  getToken =()=>{
    this.setState({
      tokenGetting:true
    });
    const url = api.host + api.token ;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'POST', // or 'PUT'
          body:JSON.stringify({
            projId:this.state.id,
          })
        }).then(
          res=>{
            res.json().then(data=>{
                // console.log(data.obj.actList);
                if(data.code === 0){
                  this.setState({
                    tokenGetting:false,
                  });
                  copy(data.obj.token);
                  message.success("已复制到剪贴板！")
                  Modal.info({
                    title:'Token',
                    content:data.obj.token,
                  })
                }
                
                else {
                  message.error("获取失败！请检查权限")
                }
            })
          }
        ).catch(
            err=>{
                message.warning("网络连接异常，信息获取失败！");
            }
     );
  }
  handleClick = (card)=>{
    // console.log(card);
    this.props.history.push("/manageAct/"+this.state.id);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    const article =(
      <Article id={this.state.id}/>
    );
    const form = (
      <ManageForm id={this.state.id}/>
    );
    let content= "";
    if(this.props.type === "article") content = article;
    if(this.props.type === "form") content = form;

    return (
      <div>
        <Button span={2} type="primary" onClick={this.getToken} loading={this.state.tokenGetting}>
          获取Token
        </Button>
        <Divider type="vertical"/>
        <Button span={2} type="primary" onClick={this.handleClick}>
          修改
        </Button>
        <Divider type="vertical"/>
        <Button type="link" size="small" onClick={this.showModal}>
          {this.props.text}
        </Button>
        <Modal
          title="详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={this.props.okText}
          cancelText={this.props.cancelText}
        >
          {content}
        </Modal>
      </div>
        
    );
  }
});
export default withRouter(CollectionCreateForm);