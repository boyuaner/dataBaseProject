import { Modal, Button ,Col} from 'antd';
import React from "react";
import Article from "../Article";

class MyModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            visible: false,
            id:this.props.id,
        };
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Col span={3}>
        <Button type="link" size="small" onClick={this.showModal}>
          {this.props.text}
        </Button>
        <Modal
          title="详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Article id={this.state.id}/>
        </Modal>
      </Col>
    );
  }
}
export default MyModal;