import React from "react"
import {  Button,Upload, Icon, Tag, message, Typography } from "antd"
import {observer,inject} from "mobx-react"
import api from "../../api"
const { Title, Paragraph } = Typography;
@inject("store")
@observer
class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable:this.props.store.user.manager,
            id: this.props.match.params.id,
            content: '',
            title: '',
            type: '',
            endTime: '',
            creator: '',
            fileList: [],
            uploadDetail: [],
        }
    }
    componentDidMount() {
        const url = api.host + api.actDetail + "?actId=" + this.state.id;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'GET', // or 'PUT'
        }).then(
            res => {
                res.json().then(data => {
                    this.setState({
                        content: data.obj.article,
                        title: data.obj.Title,
                        type: data.obj.Type,
                        endTime: data.obj.EndTime,
                        creator: data.obj.Creator,
                        fileList: data.obj.file,
                        uploadDetail: data.obj.upload,
                    });
                    console.log(this.state);
                });
            }
        ).catch(
            err => {
                message.warning("网络连接异常，信息获取失败！");
            }
        )
    }
    handleTitleChange = (str)=>{
        this.setState({
            title:str,
        })
    }
    handleContentChange = (str)=>{
        this.setState({
            content:str,
        })
    }
    render() {
        const UploadProps = {
            action: api.host + api.upload,
            method: "POST",
            // fileList:this.state.fileList,
            customRequest: (options) => {
                const formdata = new FormData();
                formdata.append('file', options.file);
                formdata.append('proj_id', this.state.id);
                formdata.append('stuId', this.state.stuId);
                formdata.append('uploadId', this.state.uploadDetail.id);

                // let url = api.host + api.upload;
                fetch(options.action, {
                    method: 'POST', // or 'PUT'
                    body: formdata,
                }).then((res) => {
                    res.json().then((data) => {
                        console.log(data.code);
                        if (data.code === 0)
                            message.success("上传成功！");
                    })
                }).catch((err) => {
                    console.log(err)
                })
            },
            onChange(info) {
                console.log(info.file.status);
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功！`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            }
        };
        return (
                <Typography  style={{ background: '#fff', padding: 24, minHeight: 400 }}>
                    <Title >
                        {this.state.title}
                    </Title>
                    <strong>
                        <Tag color="#87d068">
                            创建者:{this.state.creator}
                        </Tag>
                        <Tag color="#f50">
                            结束时间:{this.state.endTime}
                        </Tag>
                    </strong>
                    <br /><br />
                    <Paragraph >
                        {this.state.content}
                        
                    </Paragraph>
                    <a>2019-2020加州大学欧文分校学期访学研修项目通知（本科）.docx</a>
                    <br/>
                    <a>2019-2020美国加州大学欧文分校【本科】学期访学学分项目介绍.doc</a>
                    <br/>
                    <a>2019-2020美国加州大学欧文分校【本科】学期访学学分项目报名表.doc</a>
                    <br/>
                    <br/>
                    <Upload {...UploadProps}>
                        <Button>
                        <Icon type="upload" />上传附件
                    </Button>
                    </Upload>
                </Typography>
        );
    }
}
export default Article;