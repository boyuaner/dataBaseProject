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
      actList:[],
    }
  }
  handleUpload = (e)=>{
    
  }
  componentDidMount(){
    const url = api.host + api.actDetail + "?stuId=" +this.state.stuId;
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
      headers: {
        authorization: 'authorization-text',
      },
      method:"POST",
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