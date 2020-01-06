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
      actList:[],
      modalVisable:false,
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
    return (
      <div>
      <AddAct visible={true}/>
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
                <MyModal type="form" text="后台信息" id={card.proj_id}/>
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