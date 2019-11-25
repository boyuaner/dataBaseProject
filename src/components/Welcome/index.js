import React from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          Welcome, 欢迎使用校园活动管理助手！
          <br />
        </h1>
      </div>
    );
  }

}

export default Welcome;
