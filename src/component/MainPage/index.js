import React from "react";
import MySidebar from "../Sidebar";
import MyContent from "../Content";

import { Layout } from "antd";
import "../../App.css"


class MainPage extends React.Component{
    render(){
        return (
            <Layout>            
                <MySidebar/>
                <MyContent/>
                {/* <MyModal/> */}
            </Layout>
            
        );
    }
}
export default MainPage;