import { Modal, Button ,Col,Row,Form,Input} from 'antd';
import React from "react";
import Article from "../Article";
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
      <Form>
            {getFieldDecorator('id')(
              <Input type='hidden'/>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label='姓名'>
                  {getFieldDecorator('name', {
                    rules: [
                      {required: true, message: '请输入姓名',}
                    ]
                  })(
                    <Input placeholder='请输入'/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label='公司'>
                  {getFieldDecorator('company')(
                    <Input placeholder='请输入'/>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
    );
    let content= "";
    if(this.props.type === "article") content = article;
    if(this.props.type === "form") content = form;
    return (
      <Col span={1}>
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
      </Col>
    );
  }
});
export default CollectionCreateForm;