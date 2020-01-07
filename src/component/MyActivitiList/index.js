import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row,Button,Upload,Icon} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import globalContext from "../globalContext";
import {withRouter} from "react-router-dom";
import {observer,inject} from "mobx-react"
import '../../mock/mock';
@inject("store")
@observer
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
      stuId:this.props.store.user.userId,
      projList:[],
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
                // console.log(data.obj.actList);
                this.setState({
                  projList:data.obj.projList,
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
  handleClick = (card)=>{
    // console.log(card);
    this.props.history.push("/actDetail/"+card.projId);
  }
  render() {


    return (
      <div>
        {
          this.state.projList.map(card => {
            return (
              <Card
              // style={{margin:'10px'}}
              title={card.title}
              key={card.projId}
              hoverable={true}
              loading={this.state.loading}
              // extra={
              //   <div>
              //     <MyModal 
              //     type="article" 
              //     text="Detail" 
              //     id={card.proj_id}
              //     />
              //   </div>
              // }
              onClick={() => this.handleClick(card)}
              >
                <div>
                  <Row type="flex" justify="start" align="middle">
                    <Col span={22}>
                    <strong>
                    <Tag color="#87d068">
                      创建者:{card.creator}
                    </Tag>
                    <Tag color="#f50">
                      结束时间:{card.endTime}
                    </Tag>
                    <Tag color="#2db7f5">
                      活动类型:{card.type}
                    </Tag>
                    </strong>
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

export default withRouter(MyActivitiList);