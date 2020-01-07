import React from "react"
import { Select, Row, Col, DatePicker, Button, Upload, Tag, message, Typography,Tooltip,Divider,Input,Form,Card } from "antd"
import moment from 'moment'
import { observer, inject } from "mobx-react"
import api from "../../api"
import '../../mock/mock';
const { Title, Paragraph } = Typography;
const { Option } = Select;
const {TextArea } = Input;
const CollectionCreateForm = Form.create({ name: 'form' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props){
      super(props);
      this.state={
        questionNum:'',
        questionList:'',
        fileNum :'',
        fileList:'',
      }
    }
    handleAddQuestion = ()=>{
        const newQuestion = {
          id: this.props.data.questions.length,
          content:'',
        }
      this.props.data.questions.concat(newQuestion);
      console.log(this.props.data.questions)
    }
    handleAddFile =()=>{
      this.setState(prevState=>{
        const prevFileList = prevState.fileList;
        const newfileList = {
          id: prevState.fileNum,
          name:'',
          typeLimit:'',
          timeLimit:'',
          sizeLimit:'',
        }
        return {
          fileNum: prevState.fileNum+1,
          fileList:prevFileList.concat(newfileList),
        }
      }
    )
    }
    render() {
      const { form } = this.props;
      const { getFieldDecorator ,getFieldValue} = form;
      return (
          <Form layout="vertical">
            <Form.Item label="活动名称">
              {getFieldDecorator('title',{
                      initialValue:this.props.data.title,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="活动类型">
              {getFieldDecorator('type',{
                      initialValue:this.props.data.type,
              })(
                <Input placeholder="请输入活动类型"/>
              )}
            </Form.Item>
            <Form.Item label="活动内容">
              {getFieldDecorator('content',{
                 initialValue:this.props.data.content,
              })(<TextArea  autoSize/>)}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('endTime',{
                 initialValue:moment(this.props.data.endTime)
              })(
                <DatePicker placeholder="请选择日期" />
              )}
            </Form.Item>
            {this.props.data.questions.length !== 0 ? (
              <Form.Item label="">
              <Card title="修改问题">
                {
                this.props.data.questions.map((question,index)=>{
                  return(
                    getFieldDecorator(`questions[${index}]`,{
                      initialValue:question.content,
                    })(
                      <Input 
                      key={index}
                      style={{margin:"10px"}}
                    />
                    )
                  )
                })
              }
              </Card>
            </Form.Item>
            ):''}
            
            { this.props.data.uploadDetail.length !== 0 ? (
              <Form.Item>
                
              <Card title="修改文件要求" >
                    { 
                    this.props.data.uploadDetail.map((file,index)=>{
                      return(
                        <Card key={index} title={(file.name)}style={{margin:"10px"}}>
                          <div>
                          命名方式：
                          {
                        getFieldDecorator(`upload[${index}].name`,{
                          initialValue:file.name,
                        })(
                          <Input 
                            key={(index-1)*4}
                            style={{margin:"10px"}}
                        />
                        )}</div>
                        <div>
                          类型限制：
                        {
                        getFieldDecorator(`upload[${index}].typeLimit`,{
                          initialValue:file.typeLimit,
                        })(
                          <Input 
                            key={(index-1)*4+1}
                            style={{margin:"10px"}}
                        />
                        )}</div>
                        <div>
                          时间限制：
                        {
                        getFieldDecorator(`upload[${index}].timeLimit`,{
                          initialValue:file.timeLimit,
                        })(
                            <Input 
                            key={(index-1)*4+2}
                            style={{margin:"10px"}}
                        />
                        )}</div>
                        <div>
                          大小限制：
                        {
                        getFieldDecorator(`upload[${index}].sizeLimit`,{
                          initialValue:file.sizeLimit,
                        })(
                          <Input 
                            key={(index-1)*4+3}
                            style={{margin:"10px"}}
                        />
                        )}</div>
                        </Card>
                      )
                    })
                  }
                </Card>
              </Form.Item>
            ):""
            }
            
            {this.props.children}
          </Form>
          
      );
    }
  },
);

@inject("store")
@observer
class ModifyProj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: this.props.store.user.manager,
      id: this.props.match.params.id,
      content: '',
      title: '',
      type: '',
      endTime: '',
      creator: '',
      fileList: [],
      uploadDetail: [],
      fileTypeLimit: '',
      questions:[],
    }
  }
  onSubmit=()=>{
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      const myvalues = {
        ...values,
        stuId:this.props.store.userId,
      }
      const url = api.host + api.updateProj ;
      Promise.race([fetch(url, {
            headers:new Headers({
            'Content-Type': 'application/json',
            }),
            method: 'POST', // or 'PUT',
            body: JSON.stringify({...myvalues,projId:this.state.id})
          }).then(
            res=>{
              res.json().then(data=>{
                  if(data.code === 0){
                    message.success("新建成功！");
                  }else if(data.code === 1){
                    message.warning("无权限！");
                  }
              })
            }
          ).catch(
            err=>{
                message.warning("网络连接异常，信息获取失败！");
            }
       )
      ]);
    });
  }
  componentDidMount() {
    const url = api.host + api.actDetail + '?projId='+this.state.id;
    fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET', // or 'PUT'
    }).then(
      res => {
        res.json().then(data => {
          if(data.code === 0){
            this.setState({
              content: data.obj.content,
              title: data.obj.title,
              type: data.obj.type,
              endTime: data.obj.endTime,
              creator: data.obj.creator,
              fileList: data.obj.file,
              uploadDetail: data.obj.upload,
              questionnaire: data.obj.questionnaire,
              questions:data.obj.question
            });
          }else {
            message.error("无权限访问")
          }
        });
      }
    ).catch(
      err => {
        console.log(err)
        message.warning("网络连接异常，信息获取失败！");
      }
    )
  }
  onCancel=()=>{
    this.props.history.push('/manageAct');
  }
  handleTitleChange = (str) => {
    this.setState({
      title: str,
    })
  }
  handleContentChange = (str) => {
    this.setState({
      content: str,
    })
  }
  hadleTimeChange = (time, timeString) => {
    console.log(time, timeString);
  }
  handleSelectType = (value) => {
    console.log(`selected ${value}`);
  }
  handleFileTypeLimitChange = (value)=>{
    this.setState({
      fileTypeLimit: value,
    })
    console.log(value);
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    const UploadProps = {
      action: api.host + api.addProjFile,
      method: "POST",
      // fileList:this.state.fileList,
      customRequest: (options) => {
        const formdata = new FormData();
        formdata.append('file', options.file);
        formdata.append('projId', this.state.id);
        formdata.append('stuId', this.props.store.userId);
        formdata.append('uploadId', this.state.uploadDetail.id);

        // let url = api.host + api.upload;
        fetch(options.action, {
          method: 'POST', // or 'PUT'
          body: formdata,
        }).then((res) => {
          res.json().then((data) => {
            console.log(data.code);
            if (data.code === 0)
            options.onSuccess(null, options.file);
          })
        }).catch((err) => {
          options.onError(err,null,options.file)
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
      <div>
        <Typography style={{ background: '#fff', padding: "24px 24px 0 24px", minHeight: 100 }}>
          <Title editable={{ onChange: this.handleTitleChange }}>
            {this.state.title}
          </Title>
          <Upload {...UploadProps} data={this.state.id}>
            <Button icon="upload">上传附件</Button>
          </Upload>
          <br/>
        <CollectionCreateForm 
          data={this.state}
          wrappedComponentRef={this.saveFormRef}
        >
          <div style={{margin:"0 20px 0 20px"}}>
                <Button icon="save" type="primary" onClick={this.onSubmit}>
                    保存
                      </Button>
                      <Divider type="vertical "/>
                  <Button type="danger" icon="stop"onClick={this.onCancel}>
                    取消
                  </Button>
          </div>
        </CollectionCreateForm>
        
        </Typography>
            
      </div>
    );
  }
}
export default ModifyProj;