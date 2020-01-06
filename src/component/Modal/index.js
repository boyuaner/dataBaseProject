import { Modal, Button ,Col,Row,Form,Input,Divider} from 'antd';
import React from "react";
import Article from "../Article";
import {withRouter} from "react-router-dom"
import ManageForm from "../ManageForm"
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
class MyModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            visible: false,
            id:this.props.id,
            type:this.props.type,
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