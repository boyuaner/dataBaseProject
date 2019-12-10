import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
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
      stuId : Cookie.load("stuId"),
      actList:[],
    }
  }
  componentDidMount(){
    const url = api.host + api.actDetail;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'POST', // or 'PUT'
          body: JSON.stringify({stuId:this.state.stdId}),
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
              style={{margin:'10px'}}
              title={card.Title}
              key={card.proj_id}
              hoverable={true}
              extra={
                <div>
                  <MyModal text="Detail" id={card.proj_id}/>
                </div>
              }
              >
                <div><strong>
                  <Tag color="#87d068">
                    创建者:{card.Creator}
                  </Tag>
                  <Tag color="#f50">
                    结束时间:{card.Endtime}
                  </Tag>
                  </strong>
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