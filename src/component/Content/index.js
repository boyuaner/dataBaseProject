import React from "react";
import { Typography, Layout, Breadcrumb  } from "antd";
import ActivitiList from "../ActivitiList";
import "../../App.css"
const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
class MyContent extends React.Component {
   
    render() {
        return (
            <Content style={{ padding: '50px 50px'  }} >
                <Breadcrumb style={{ margin: '16px 16px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                {/* <ActivitiList/> */}
                {this.props.children}
            </Content>
        );
    }
}
export default MyContent;