import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row,Button} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
class ActivitiList extends React.Component {
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
                  actList:data.actList,
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
              // loading={true}
              extra={
                <div>
                  {/* <MyModal 
                  type="article" 
                  okText="参加" 
                  cancelText="取消" 
                  text="Detail" 
                  id={card.proj_id}
                  /> */}
                  <Button type="primary" >参加活动</Button>
                </div>
              }
              >
                <div>
                  <Row>
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
                  
                  <MyModal 
                  type="article" 
                  okText="参加" 
                  cancelText="取消" 
                  text="Detail" 
                  id={card.proj_id}
                  />
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

export default ActivitiList;