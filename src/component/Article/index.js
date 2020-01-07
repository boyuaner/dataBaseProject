import React from "react"
import { Select,Row,Col,Button,Upload, Icon, Tag, message, Typography,Divider,Card,Popover,Input,InputNumber } from "antd"
import {observer,inject} from "mobx-react"
import {withRouter} from "react-router-dom"
import api from "../../api"
const { Title, Paragraph } = Typography;
const { Option } = Select;
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
            questionList: [],
            questionnaire:'',
            answer:[],
            score:'61',
            awardName:''
        }
    }
    componentDidMount() {
        const url = api.host + api.actDetail + "?projId=" + this.state.id;
        fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'GET', // or 'PUT'
        }).then(
            res => {
                res.json().then(data => {
                    this.setState({
                        content: data.obj.content,
                        title: data.obj.title,
                        type: data.obj.type,
                        endTime: data.obj.endTime,
                        creator: data.obj.creator,
                        fileList: data.obj.file,
                        uploadDetail: data.obj.upload,
                        questionnaire:data.obj.questionnaire,
                        questionList:data.obj.question,
                        fileState:'uploading',
                    });
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
    submit = ()=>{
        let url1 = api.host+api.answer;
        let myvalues = {
            stuId:this.props.store.user.userId,
            projId:this.state.id,
            ans:this.state.answer,
        }
        let url2 = api.host + api.addScore;
        const myvalues2={
            partnerId:this.props.store.user.userId,
            projId:this.state.id,
            awardName:this.state.awardName,
            score:this.state.score,
        }
        Promise.race([fetch(url1, {
            headers:new Headers({
            'Content-Type': 'application/json',
            }),
            method: 'POST', // or 'PUT',
            body: JSON.stringify(myvalues)
          }),
        fetch(url2, {
        headers:new Headers({
        'Content-Type': 'application/json',
        }),
        method: 'POST', // or 'PUT',
        body: JSON.stringify(myvalues2)
      })
    ]).then(
        res=>{
          res.json().then(data=>{
              if(data.code === 0){
                message.success("提交成功！");
              }else if(data.code === -1){
                message.warning("提交失败！");
              }
          })
        }
      ).catch(
        err=>{
            message.warning("网络连接异常，信息获取失败！");
            }
        );
    }
    render() {
        const UploadProps = {
            action: api.host + api.upload,
            method: "POST",
            // fileList:this.state.fileList,
            customRequest: (options) => {
                const formdata = new FormData();
                formdata.append('file', options.file);
                formdata.append('projId', this.state.id);
                formdata.append('stuId', this.props.store.user.userId);
                formdata.append('uploadId', options.data);

                // let url = api.host + api.upload;
                fetch(options.action, {
                    method: 'POST', // or 'PUT'
                    body: formdata,
                }).then((res) => {
                    res.json().then((data) => {
                        if (data.code === 0){
                            options.onSuccess(null, options.file);
                        }
                    })
                }).catch((err) => {
                    options.onError(err,null,options.file)
                })
            },
            onChange(info) {
                // const reader = new FileReader();
                // reader.onloadend = (obj) => {
                // this.imageDataAsURL = obj.srcElement.result;
                // };
                // reader.readAsDataURL(info.file.originFileObj);
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
                        <Tag color="#2db7f5">
                            活动类型:{this.state.type}
                        </Tag>
                    </strong>
                    <br /><br />
                    <Paragraph >
                        {this.state.content}
                    </Paragraph>
                    <br/>
                    <Row gutter={[8,8]}>
                    {
                        this.state.questionList.length !== 0 ? (
                        <Col span={12}>
                        <Card title="请回答以下问题...">
                        {this.state.questionList.map((question,index) =>{
                            let newanswer =  this.state.answer;
                            newanswer[index] = {
                                queId:question.id,
                                ansContent: newanswer[index] ? newanswer[index].ansContent:'',
                            };
                            return (
                                <Row gutter={[8,8]} key={index}>
                                <Col span={24}>
                                <div>{question.content}</div>
                                </Col>
                                <Col span={24}>
                                <Input value={newanswer[index].ansContent} onChange={({ target: { value } })=>{
                                    newanswer[index] = {
                                        ansContent:value,
                                    };
                                    this.setState({
                                        answer: newanswer,
                                    })
                                }}/>
                                </Col>
                                </Row>
                            )
                        })
                        }
                        </Card>
                        </Col>):""
                    }
                    {   this.state.fileList.length !== 0 ? (
                    <Col span={12}>
                        <Card title="附件列表">{
                        this.state.fileList.map((file)=>{
                            return (
                                <Col span={24}>
                                    <a href={api.host+api.getProjFile+"?fileId="+file.id}>{file.name}</a>
                                </Col>
                            );
                        })}
                        </Card>
                    </Col>
                    ):""
                    }
                    {this.state.uploadDetail.length !== 0 ?(
                        <Col span={12}>
                            <Card title="上传文件">{
                                this.state.uploadDetail.map((file)=>{
                                    const demands = (
                                        <div>
                                            <p>类型限制:{file.typeLimit}</p>
                                            <p>大小限制:{file.sizeLimit}</p>
                                            <p>Deadline:{file.timeLimit}</p>
                                        </div>
                                    )
                                    return(
                                        <Col span={24}>
                                        文件{file.id+1}：
                                        <Tag color="#87d068">{file.name}</Tag>
                                        <Divider type="vertical "/>
                                        <Upload {...UploadProps} data={file.id}>
                                        <Popover content={demands} title="上传要求"><Button><Icon type="upload" />上传附件</Button></Popover>
                                        </Upload>
                                        </Col>
                                    )
                                })
                            }
                            </Card>
                        </Col>):""}
                        <Col span={6}>
                            <Card title="活动结果">
                                <Col span={12}>
                                奖项：
                                <Select style={{ width: 120 }}onChange={(value)=>{
                                    this.setState({
                                        awardName:value,
                                    })
                                }}>
                                    <Option value="firstPrize">一等奖</Option>
                                    <Option value="secondPrize">二等奖</Option>
                                    <Option value="thirdPrize">三等奖</Option>
                                    <Option value="SuccessPrize">优秀奖</Option>
                                </Select>
                                </Col>
                            <Col span={12}>
                                本次素拓分
                                <InputNumber min={0} max={100} defaultValue={61} onChange={(value)=>{
                                    console.log(value);
                                    this.setState({
                                        score:value,
                                    })
                                }} />
                            </Col>
                            </Card>
                        </Col>
                    </Row>  
                    <br/>
                    <Row gutter={[16,16]}>
                        <Col span={2} >
                        <Button icon="diff" type="primary" onClick={this.submit}>
                            确定提交
                        </Button>
                        </Col>
                    </Row>
                </Typography>
                
        );
    }
}
export default withRouter(Article);