import { Table, Input, Button, Popconfirm, Form,Rate,message } from 'antd';
import React from 'react';
import api from "../../api";
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const desc = ['terrible','terrible', 'bad','bad', 'not so bad', 'just soso',  'normal','normal', 'good','good', 'wonderful'];
    this.columns = [
      {
        title: '学号',
        dataIndex: 'stuId',
        width: '20%',
        editable: false,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '20%',
        editable: false,
      },
      {
        title: '奖项名',
        dataIndex: 'awardName',
        width: '20%',
        editable: true,
      },
      {
        title: '分数',
        dataIndex: 'score',
        width: '20%',
        editable: true,
      },
      // {
      //   title: '修改评分',
      //   dataIndex: 'rate',
      //   render: (text, record) =>
      //     this.state.dataSource.length >= 1 ? (
      //       <span>
      //         <Rate tooltips={desc} count={10} onChange={(value)=>{
      //           const dataSource = [...this.state.dataSource];
      //           dataSource[record.key].rate = value;
      //           this.setState({
      //             dataSource: dataSource,
      //           })
      //         }} value={record.rate} />
      //         {record.rate ? <span className="ant-rate-text">{desc[record.rate - 1]}</span> : ''}
      //       </span>
      //     ) : null
      // },
    ];

    this.state = {
      projId : this.props.id,
      dataSource: [
        {
          key: '0',
          name: '王锟',
          rate: 3 ,
          awards:'最具商业价值奖',
          stuId:'1123123123'
        },
        {
          key: '1',
          name: '尹永琪',
          rate: 5,
          awards:'没奖',
          stuId:'1123123123'
        },
      ],
      count: 2,
    };
  }
  componentDidMount(){
    const url = api.host + api.getParterDetail + "?projId=" + this.props.id;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'GET', // or 'PUT'
        }).then(
          res=>{
            res.json().then(data=>{
                // console.log(data.obj.actList);

                let newSource = data.obj.list;
                for(let i = 0;i < this.state.dataSource.length-1;i++){
                  newSource[i] = {
                    ...newSource[i],
                    key:i,
                  }
                }
                this.setState({dataSource:newSource})
            })
          }
        ).catch(
            err=>{
              message.warning("网络连接异常，人员信息获取失败！");
            }
     );
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    const url = api.host + api.scoreEveryOne ;
    fetch(url, {
        headers:new Headers({
        'Content-Type': 'application/json',
          }),
          method: 'POST', // or 'PUT'
          body:JSON.stringify({
            ScoreArray:this.state.dataSource,
            projId:this.state.projId,
          })
        }).then(
          res=>{
            res.json().then(data=>{
                // console.log(data.obj.actList);
                if(data.code === 0){
                  message.success("修改成功")
              }else{
                message.error("修改失败")
              }
            })
          }
        ).catch(
            err=>{
              console.log(err)
              message.warning("网络连接异常，人员信息修改失败！");
            }
     );
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button type="primary" style={{ marginBottom: 16 }}>
          <a href={api.host+api.manageFile+"?projId="+this.state.projId}>附件下载</a>
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable;