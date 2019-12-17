import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row,Button,Upload,Icon} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import globalContext from "../globalContext";
import '../../mock/mock';
class MyActivitiList extends React.Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };
  static contextType = globalContext;
  constructor(props) {
    super(props);
    // const {cookies} = this.props;
    this.state = {
      loading : true,
      // stuId : this.context.userId,
      stuId:"201805130168",
      actList:[],
    }
  }
  componentDidMount(){
    const url = api.host + api.actList + "?stuId=" +this.state.stuId;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'GET', // or 'PUT'
        }).then(
          res=>{
            // console.log(res.json());
            res.json().then(data=>{
                console.log(data.obj.actList);
                this.setState({
                  actList:data.obj.actList,
                  loading:false,
                })
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
      // name:"file",
      action: api.host+api.upload,
      method:"POST",
      // fileList:this.state.fileList,
      customRequest: (options) => {
        
        const formdata= new FormData();
        formdata.append('file', options.file);
        formdata.append('proj_id',4);
        formdata.append('stuId',this.state.stuId);
        // console.log(this.state.actList);
        formdata.append('uploadId',3);
        
        // let url = api.host + api.upload;
        fetch(options.action, {
          method: 'POST', // or 'PUT'
          body:formdata,
        }).then((res) => {
          res.json().then( (data)=>{
            console.log(data.code);
            if(data.code === 0)
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
      <div>
        {
          this.state.actList.map(card => {
            return (
              <Card
              // style={{margin:'10px'}}
              title={card.Title}
              key={card.proj_id}
              hoverable={true}
              // loading={this.state.loading}
              extra={
                <div>
                  <MyModal 
                  type="article" 
                  text="Detail" 
                  id={card.proj_id}
                  />
                </div>
              }
              >
                <div>
                  <Row type="flex" justify="start" align="middle">
                    <Col span={22}>
                    <strong>
                    <Tag color="#87d068">
                      创建者:{card.Creator}
                    </Tag>
                    <Tag color="#f50">
                      结束时间:{card.Endtime}
                    </Tag>
                    </strong>
                    </Col>
                    <Col span={1}>
                    <Upload {...UploadProps} data={card.proj_id}>
                    {/* data={{proj_id:card.proj_id,uploadId:card.key}} */}
                      <Button>
                        <Icon type="upload" /> 点击上传文件
                      </Button>
                    </Upload>
                    </Col>
                  </Row>
                </div>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

export default MyActivitiList;