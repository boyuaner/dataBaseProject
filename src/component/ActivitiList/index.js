import { Tag,Table,Popconfirm ,Col,Divider,Card,Row} from 'antd';
import React from 'react';
import MyModal from '../Modal';
class ActivitiList extends React.Component {
  constructor(props) {
    super(props);
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
    }
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
                  <MyModal text="Detail"/>
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