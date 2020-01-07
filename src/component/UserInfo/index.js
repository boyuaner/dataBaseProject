import { Descriptions, Badge, Card, Avatar, Tag, Typography, Row, Col,message,Button } from 'antd';
import React from "react";
import md5 from "js-md5";
import api from "../../api";
import {observer,inject} from "mobx-react"

const { Paragraph } = Typography;
@inject("store")
@observer
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuId:"",
            tel:"",
            introduction:"",
            isManager:"",
            mail:"",
            imgSrc: "",
            name:"",
            tags:['计科二班','没有钱'],
        }
    }

    componentDidMount() {
        this.getData();
    }
    getData =()=> {
        let url =  api.host + api.userInfo + "?stuId="+this.props.store.user.userId;
        fetch(url,{
            headers:new Headers({
            'Content-Type': 'application/json',
              }),
              method: 'GET', // or 'PUT'
            }).then(
              res=>{
                // console.log(res.json());
                res.json().then(data=>{
                    console.log(data);
                    if(data.code === 0){
                      this.setState({
                        stuId:data.obj.stuId,
                        name:data.obj.name,
                        tel:data.obj.tel,
                        introduction:data.obj.introduction,
                        mail:data.obj.mail,
                      })
                      let hash = md5(this.state.mail);
                      this.setState({
                          imgSrc: "https://www.gravatar.com/avatar/" + hash,
                      })
                    }else {
                        if(data.code === -1){
                            message.warning("用户不存在");
                        }
                    }
                })
              }
            ).catch(
                err=>{
                    message.warning("网络连接异常，信息获取失败！");
                }
            );
    }
    submit=(e)=>{
        let url =  api.host + api.updateMe ;
        fetch(url,{
            headers:new Headers({
            'Content-Type': 'application/json',
              }),
              method: 'POST', // or 'PUT'
              body:JSON.stringify({
                  ...this.state,
              })
            }).then(
              res=>{
                // console.log(res.json());
                res.json().then(data=>{
                    if(data.code === 0){
                      message.success("修改成功！")
                      this.getData();
                    }else {
                        if(data.code === -1){
                            message.warning("修改失败！");
                        }
                    }
                })
              }
            ).catch(
                err=>{
                    message.warning("网络连接异常，修改失败！");
            }
        );
    }
    render() {
        return (
            <Typography>
                    <Card
                    extra={(
                        <Button onClick={this.submit}>
                            提交修改
                        </Button>
                    )}
                    title="我的信息"
                    >
                        <Avatar size={100} src={this.state.imgSrc} />
                        <Descriptions title=" " bordered>
                        <Descriptions.Item label="Name" span={1}>
                            <Paragraph editable={{onChange:(str) => {
                            this.setState({
                                name: str,
                            })
                        }}}>{this.state.name}</Paragraph></Descriptions.Item>
                            <Descriptions.Item label="Tag" span={2}>
                                {(this.state.tags) ? this.state.tags.map(
                                    tag=>{
                                        return(<Tag color="#2db7f5">{tag}</Tag>)
                                    }
                                ):<Tag >没有tag</Tag>}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={1}>
                            <Paragraph editable={{onChange:(str) => {
                                this.setState({
                                    mail: str,
                                })
                            }}}>{this.state.mail}</Paragraph></Descriptions.Item>
                            <Descriptions.Item label="Phone Number" span={1}>
                            <Paragraph editable={{onChange:(str) => {
                            this.setState({
                                tel: str,
                            })
                        }}}>{this.state.tel} </Paragraph></Descriptions.Item>
                            <Descriptions.Item label="Talk about yourself"span={1}>
                            <Paragraph editable={{onChange:(str) => {
                            this.setState({
                                introduction: str,
                            })
                        }}}>{this.state.introduction}</Paragraph></Descriptions.Item>
                        </Descriptions>
                    </Card>
            </Typography>
        )
    }
}
export default UserInfo;
