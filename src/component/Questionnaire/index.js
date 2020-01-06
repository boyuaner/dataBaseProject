import { Card,Form, Input, Button, Radio } from 'antd';
import React from "react"
class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
    return (
      <div>
        <Card title="请回答以下问题..">
        <Form layout={formLayout}>
          <Form.Item label="问题1：请问有无出国打算?" {...formItemLayout}>
            <Input placeholder="请输入回答..." />
          </Form.Item>
          <Form.Item label="问题2：请问您的意向国家是哪个?" {...formItemLayout}>
            <Input placeholder="请输入回答..." />
          </Form.Item>
          {/* <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item> */}
        </Form>
        </Card>
      </div>
      
    );
  }
}

export default FormLayoutDemo;