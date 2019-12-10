import { Descriptions, Badge,Card,Avatar } from 'antd';
import React from "react";
const userinfo = {
        name:"yqy",
        class:"2",
        grade:"2018",
        phoneNumber:"159 xxxx xxxx",
        introduction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam odio diam, et dapibus nunc fermentum sagittis. Donec hendrerit, arcu quis vestibulum vehicula, magna justo congue metus, vel tempus magna ipsum eget dolor. Maecenas malesuada est lorem, a accumsan est dictum quis. Nulla commodo mi non interdum placerat. Morbi feugiat lorem arcu, id luctus nulla ultricies sed. Proin blandit et ante in pellentesque. Aliquam non eleifend lectus. Aenean et semper lorem. Praesent feugiat sem non vestibulum bibendum. Etiam laoreet felis dui, at molestie nunc imperdiet id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut quis velit quis mauris tincidunt suscipit sit amet quis odio.",
    };
class UserInfo extends React.Component{
    render(){
        return (
        <Card>
            <Avatar size={100} icon="user" />
            <Descriptions title=" " bordered>
            <Descriptions.Item label="Name"span={3}><h3>{userinfo.name}</h3></Descriptions.Item>
            <Descriptions.Item label="Class"span={1}>{userinfo.class}</Descriptions.Item>
            <Descriptions.Item label="Grade"span={1}>{userinfo.grade}</Descriptions.Item>
            <Descriptions.Item label="Phone Number"span={1}>{userinfo.phoneNumber} </Descriptions.Item>
            <Descriptions.Item label="Talk about yourself">{userinfo.introduction} </Descriptions.Item>
            </Descriptions>
        </Card>
            
        )
    }
}
export default UserInfo;
  