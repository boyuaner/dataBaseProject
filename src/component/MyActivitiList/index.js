import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row,Button,Upload,Icon} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class MyActivitiList extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const {cookies} = this.props;
    this.state = {
      loading : true,
      cardList: [
        {
          proj_id: 1,
          Title: 'Did you hear about the two silk worms in a race?',
          Endtime:'2019.1.1',
          Type:'Activit',
          Creator:'kun'
        },
        {
          proj_id: 2,
          Title: 'Did you hear about the two silk worms in a race?',
          Endtime:'2019.1.1',
          Type:'Activit',
          Creator:'kun'
        },
        {
          proj_id: 3,
          Title: 'Did you hear about the two silk worms in a race?',
          Endtime:'2019.1.1',
          Type:'Activit',
          Creator:'kun'
        },
        {
          proj_id: 4,
          Title: 'Did you hear about the two silk worms in a race?',
          Endtime:'2019.1.1',
          Type:'Activit',
          Creator:'kun'
        },
      ],
      stuId : cookies ? cookies.load("stuId") : "201805130168",
      // stuId:"201805130168",
      actList:[],
    }
  }
  handleUpload = (e)=>{
    
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
            res.json().then(data=>{
              if(data.code === 0){
                this.setState({
                  actList:data.obj.actList,
                  loading:false,
                })
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
      name: 'file',
      action: api.host+api.upload,
      // headers: {
      //   "content-type": 'mage/jpeg',
      // },
      // method:"POST",
      customRequest: (options) => {
        console.log(options);
        // const data= new FormData()
        // data.append('file', options.file);
        // // data.append('proj_id',card.proj_id);
        // data.append('uploadId',this.state.stuId+"_1");
        // // let url = api.host + api.upload;
        // fetch(options.action, {
        //   headers:new Headers({
        //     'Content-Type': 'application/json; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
        //       }),
        //   method: 'POST', // or 'PUT'
          
        // }).then((res) => {
        //   options.onSuccess(res.data, options.file)
        // }).catch((err) => {
        //   console.log(err)
        // })
        
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <div>
        {
          this.state.cardList.map(card => {
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
                    <Col span={3}>
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
                    <Upload {...UploadProps}>
                      <Button>
                        <Icon type="upload" /> Click to Upload
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