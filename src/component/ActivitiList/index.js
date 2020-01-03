import React from "react"
import { Select, Row, Col, DatePicker, Button, Upload, Tag, message, Typography } from "antd"
import moment from 'moment'
import { observer, inject } from "mobx-react"
import api from "../../api"
const { Title, Paragraph } = Typography;
const { Option } = Select;
@inject("store")
@observer
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: this.props.store.user.manager,
      id: this.props.match.params.id,
      content: '',
      title: '',
      type: '',
      endTime: '',
      creator: '',
      fileList: [],
      uploadDetail: [],
    }
  }
  componentDidMount() {
    const url = api.host + api.actDetail + "?actId=" + this.state.id;
    fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET', // or 'PUT'
    }).then(
      res => {
        res.json().then(data => {
          console.log(data.obj)
          this.setState({
            content: data.obj.article,
            title: data.obj.Title,
            type: data.obj.Type,
            endTime: data.obj.Endtime,
            creator: data.obj.Creator,
            fileList: data.obj.file,
            uploadDetail: data.obj.upload,
          });
          console.log(this.state);
        });
      }
    ).catch(
      err => {
        message.warning("网络连接异常，信息获取失败！");
      }
    )
  }
  handleTitleChange = (str) => {
    this.setState({
      title: str,
    })
  }
  handleContentChange = (str) => {
    this.setState({
      content: str,
    })
  }
  hadleTimeChange = (time, timeString) => {
    console.log(time, timeString);
  }
  handleSelectType = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const UploadProps = {
      action: api.host + api.upload,
      method: "POST",
      // fileList:this.state.fileList,
      customRequest: (options) => {
        const formdata = new FormData();
        formdata.append('file', options.file);
        formdata.append('proj_id', this.state.id);
        formdata.append('stuId', this.state.stuId);
        formdata.append('uploadId', this.state.uploadDetail.id);

        // let url = api.host + api.upload;
        fetch(options.action, {
          method: 'POST', // or 'PUT'
          body: formdata,
        }).then((res) => {
          res.json().then((data) => {
            console.log(data.code);
            if (data.code === 0)
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
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
      <div>
        <Typography style={{ background: '#fff', padding: "24px 24px 0 24px", minHeight: 100 }}>
          <Title editable={{ onChange: this.handleTitleChange }}>
            {this.state.title}
          </Title>
        </Typography>
        <Row gutter={[16, 24]} style={{ padding: "0 0 0 20px" }}>
          <strong>
            <Col span={2}>
              <Tag color="#87d068">
                创建者:{this.state.creator}
              </Tag>
            </Col>
            <Col span={4}>
              <Tag color="#f50">
                结束时间:{this.state.endTime}
              </Tag>
            </Col>
          </strong>
        </Row>
        <Row gutter={[16, 24]} style={{ padding: "20px 0 0 20px" }}>
          <Col span={4}>
            <DatePicker showTime placeholder="请选择一个结束时间" onChange={this.hadleTimeChange} onOk={this.hadleTimeChange} />
          </Col>
          <Col span={6}>
            <Select
              mode="multiple"
              style={{ width: '50%' }}
              placeholder="请选择该活动对应标签"
              // defaultValue={['a10', 'c12']}
              onChange={this.handleSelectType}
            >
              {children}
            </Select>
          </Col>
        </Row>
        <Typography style={{ background: '#fff', padding: 20, minHeight: 100 }}>
          <Paragraph editable={{ onChange: this.handleContentChange }}>
            {this.state.content}
          </Paragraph>
          <Row>
            <Col span={24} style={{ padding: "0 0 10px 0" }}>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleContentChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Upload {...UploadProps}>
                <Button icon="upload">
                  上传附件
                </Button>
              </Upload>
            </Col>

          </Row>
          <br />

          <Row>
            <Col span={2}>
              <Button icon="save" type="primary">
                保存修改
                  </Button>
            </Col>
            <Col span={2}>
              <Button type="danger" icon="stop">
                取消
              </Button>
            </Col>
          </Row>
        </Typography>


      </div>
    );
  }
}
export default Article;