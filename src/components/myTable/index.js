import { Table, Divider, Tag, message } from 'antd';
import React from 'react';
import ajax from '../../utils/ajax';
import { connect } from 'react-redux'
import Moment from 'moment'

const columns = [
  {
    title: '活动名称',
    dataIndex: 'Title',
    key: 'Title',
    // render: text => <a>{text}</a>,

  },
  {
    title: '活动类型',
    dataIndex: 'Type',
    key: 'Type',
  },
  {
    title: '活动创建者',
    dataIndex: 'Creator',
    key: 'Creator',
  },
  {
    title: '结束时间',
    key: 'EndTime',
    dataIndex: 'EndTime',
    render: times => {
      // toString(times);
      const date = new Moment(times, 'yyyy-mm-ddTHH:mm:ss.000Z');
      console.log(typeof(times));
      return (
      <span>
        {/* {time.map(aa => {
          let color = aa.length > 5 ? 'green' : 'red';
          return (
            <Tag color={color} key={aa}>
              {aa}
            </Tag>
          );
        })} */}
        <Tag color = "red" >
          {times}
        </Tag>
      </span>
    )},
  },
  {
    title: '',
    key: 'action',
    render: (text, record) => (
      <span>
        <a >详细信息 </a>
        |
        {/* <Divider type="vertical" /> */}
        <a> Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    Creator: 'John Brown',
    Type: '讲座',
    Title: 'New York No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  },
  {
    key: '2',
    Creator: 'Jim Green',
    Type: '讲座',
    Title: 'London No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  },
  {
    key: '3',
    Creator: 'Joe Black',
    Type: '宣讲',
    Title: 'Sidney No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  }, {
    key: '4',
    Creator: 'Joe Black',
    Type: '比赛',
    Title: 'Sidney No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  },
  {
    key: '5',
    Creator: 'Joe Black',
    Type: '实验',
    Title: 'Sidney No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  },
  {
    key: '6',
    Creator: 'Joe Black',
    Type: '实验',
    Title: 'Sidney No. 1 Lake Park',
    EndTime: ['"2020-01-01T04:14:15.000Z"'],
  },
];

class actList extends React.Component {
  state = {
    dataSource:[],
  }
  componentWillMount() {
    try {
      ajax.getActList(this.props.userId).then((res) => {
        let list = JSON.parse(res.text).obj.actiList;
        console.log(list);
        if (JSON.parse(res.text).code === 0)
        // if (res.success)
        {
          message.success('加载成功！');
          this.setState({ dataSource: list });
        } else {
          this.setState({ dataSource: data });
        }
      });
    } catch (exception) {
      message.error(`网络请求出错: ${exception.message}`);
      this.setState({ dataSource: data });
    }
  }
  render() {
    return (
            <Table columns={columns} dataSource={this.state.dataSource} />
        );
  }
}
const mapStateToProps = (state) => {
  return {
    userType: state.Login.userType,
    userId: state.Login.userId,
  }
}

export default connect(mapStateToProps, null)(actList);
