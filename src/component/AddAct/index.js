import { Button, Modal, Form, Input, DatePicker,Card,message } from 'antd';
import {withRouter} from "react-router-dom"
import React from 'react';
import api from "../../api";
import {observer,inject} from "mobx-react"
const {TextArea } = Input;

// const FileList = Form.create({
//   name:'FileList',
//   onFieldsChange(props, changedFields) {
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     console.log(props)
//     return {
//       name: Form.createFormField({
//         value: props.name,
//       }),
//       typeLimit: Form.createFormField({
//         value: props.typeLimit,
//       }),
//       timeLimit: Form.createFormField({
//         value: props.timeLimit,
//       }),
//       sizeLimit: Form.createFormField({
//         value: props.sizeLimit,
//       }),
//     };
//   },
//   onValuesChange(_, values) {
//     // console.log(values);
//   },
// })(
//   props => {
//     const { getFieldDecorator } = props.form;
//     return (
//       <Form layout="vertical">
//         <Form.Item label="命名要求">
//           {getFieldDecorator('name', {
//           })(<Input placeholder="请输入命名要求"/>)}
//         </Form.Item>
//         <Form.Item label="类型要求">
//           {getFieldDecorator('typeLimit', {
//           })(<Input placeholder="请输入文件类型要求"/>)}
//         </Form.Item>
//         <Form.Item label="ddl">
//           {getFieldDecorator('timeLimit', {
//           })(<Input placeholder="请输入文件ddl要求"/>)}
//         </Form.Item>
//         <Form.Item label="大小要求">
//           {getFieldDecorator('sizeLimit', {
//           })(<Input placeholder="请输入文件大小要求"/>)}
//         </Form.Item>
//       </Form>
//     );
//   }
// )
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props){
      super(props);
      this.state={
        questionNum:0,
        questionList:[],
        fileNum :0,
        fileList:[],
      }
    }
    handleAddQuestion = ()=>{
      this.setState(prevState=>{
          const prevQuesList = prevState.questionList;
          const newQuestion = {
            id: prevState.questionNum,
            content:'',
          }
          return {
            questionNum: prevState.questionNum+1,
            questionList:prevQuesList.concat(newQuestion),
          }
        }
      )
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
    // handleFileNumChange = (value)=>{
    //   let newList = [];
    //   for(let i = 0;i< value;i++){
    //       newList = [...newList,
    //         this.state.fileList[i]? this.state.fileList[i]:{
    //         file:{
    //         id:i+1,
    //         name:'',
    //         typeLimit:'',
    //         timeLimit:'',
    //         sizeLimit:'',
    //       }}
    //     ];
    //   }
    //   this.setState({
    //     fileNum:value,
    //     fileList:newList
    //   })
    // }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator ,getFieldValue} = form;
      return (
        <Modal
          visible={visible}
          title="新建活动"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          width="1000px"
        >
          <Form layout="vertical">
            <Form.Item label="活动名称">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入活动名称!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="活动类型">
              {getFieldDecorator('type',{
                rules: [{ required: true, message: '请输入活动类型!' }],
              })(
                <Input placeholder="请输入活动类型"/>
              )}
            </Form.Item>
            <Form.Item label="活动内容">
              {getFieldDecorator('content',{
                rules: [{ required: true, message: '请输入活动内容!' }],
              })(<TextArea  autoSize/>)}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('endTime',{
                rules: [{ required: true, message: '请输入活动结束时间!' }],
              })(
                <DatePicker placeholder="请选择日期"/>
              )}
            </Form.Item>

            <Form.Item label="添加问题">
                <Card title="问题列表">
                  <Button icon='plus' onClick={this.handleAddQuestion}>
                    添加问题
                  </Button>
                  <br/><br/>
                  { this.state.questionList.map((question)=>{
                    return(
                      getFieldDecorator(`questions[${question.id}]`)(
                        <Input 
                        key={question.id}
                        placeholder={"请输入第"+(question.id+1)+"个问题"} 
                        style={{margin:"10px"}}
                      />
                      )
                    )
                  })
                }
                </Card>
            </Form.Item>
            {/* <Form.Item label="上传文件要求">
              {getFieldDecorator('upload',{
              })(
                <div>请输入要求上传个数： 
                <InputNumber width="100px"min={0} max={5} defaultValue={0} onChange={this.handleFileNumChange} />

                {this.state.fileList.map((files)=>{
                    return(
                      <Card title={"文件"+files.file.id+"描述"} key={files.file.id} style={{margin:"10px"}}>
                        <FileList {...files.file} onChange={(changedFields)=>{
                          let newList = this.state.fileList;
                          newList[files.file.id-1].file = {
                            id:files.file.id,
                            name:(changedFields.name)? changedFields.name.value:newList[files.file.id-1].name,
                            typeLimit:(changedFields.typeLimit)? changedFields.typeLimit.value:newList[files.file.id-1].typeLimit,
                            timeLimit:(changedFields.timeLimit)? changedFields.timeLimit.value:newList[files.file.id-1].timeLimit,
                            sizeLimit:(changedFields.sizeLimit)? changedFields.sizeLimit.value:newList[files.file.id-1].sizeLimit,
                          }
                          this.setState({
                            fileList:newList,
                          })
                          // console.log(this.state.fileList);
                        }}/>
                      </Card>
                    )
                  })}
                </div>
              )}
            </Form.Item> */}
            <Form.Item>
            <Card title="添加文件要求" >
                <Button icon='plus' onClick={this.handleAddFile}>
                  添加文件要求
                </Button>
                <br/><br/>
                  { 
                  this.state.fileList.map((file)=>{
                    return(
                      <Card title={"文件"+(file.id+1)+"要求"}style={{margin:"10px"}}>{
                      getFieldDecorator(`upload[${file.id}].name`)(
                        <Input 
                          key={file.id}
                          placeholder={"请输入命名要求"} 
                          style={{margin:"10px"}}
                      />
                      )}
                      {
                      getFieldDecorator(`upload[${file.id}].typeLimit`)(
                        <Input 
                          key={file.id}
                          placeholder={"请输入文件类型要求"} 
                          style={{margin:"10px"}}
                      />
                      )}
                      {
                      getFieldDecorator(`upload[${file.id}].timeLimit`)(
                        
                        <Input 
                          key={file.id}
                          placeholder={"请输入上传截止时间"} 
                          style={{margin:"10px"}}
                      />
                      )}
                      {
                      getFieldDecorator(`upload[${file.id}].sizeLimit`)(
                        
                        <Input 
                          key={file.id}
                          placeholder={"请输入文件大小要求"} 
                          style={{margin:"10px"}}
                      />
                      )}
                      </Card>
                    )
                  })
                }
                
              </Card>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
@inject("store")
@observer
class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ 
      visible: false,
    });
  };

  handleCreate = () => {
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
            body: JSON.stringify(myvalues)
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
       ),
       new Promise(function(resolve,reject){
        setTimeout(()=> reject(new Error('request timeout')),2000)
        })
        .then((data)=>{
            //请求成功
        }).catch(()=>{
            message.warning("网络连接异常，信息获取失败！");
        })
      ]);
      form.resetFields();
      console.log(form)
      this.setState({ 
        visible: false,
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          新建活动
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          destroyOnClose={true}
        />
      </div>
    );
  }
}
export default withRouter(CollectionsPage);