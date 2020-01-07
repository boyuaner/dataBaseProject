import { message,Tag,Table,Popconfirm ,Col,Divider,Card,Row,Button,Upload,Icon,Affix} from 'antd';
import React from 'react';
import MyModal from '../Modal';
import api from '../../api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import AddAct from '../AddAct';
import globalContext from "../globalContext";
import {withRouter} from "react-router-dom";
import {observer,inject} from "mobx-react"
import '../../mock/mock';
@inject("store")
@observer
class ManageActList extends React.Component {
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
      ManList:[],
      modalVisable:false,
    }
  }

  
  componentDidMount(){
    const url = api.host + api.ManList + "?stuId=" +this.state.stuId;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'GET', // or 'PUT'
        }).then(
          res=>{
            res.json().then(data=>{
                // console.log(data.obj.actList);
                this.setState({
                  ManList:data.obj.ManList,
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
    return (
      <div>
      <AddAct visible={true}/>
        {
          this.state.ManList.map(card => {
            return (
              <Card
              // style={{margin:'10px'}}
              title={card.title}
              key={card.projId}
              hoverable={true}
              // loading={this.state.loading}
              extra={
                <MyModal type="form" text="后台信息" id={card.projId}/>
              }
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

export default withRouter(ManageActList);