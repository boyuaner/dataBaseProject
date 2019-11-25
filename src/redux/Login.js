// 登录成功的事件
export const loginSuccessCreator = (userName, userType, userId) => {
  return { type: 'LOGIN_SUCCESS', payload: { userName, userType , userId } };
};

const initState = {
  login: false,  // 是否已登录
  userName: '未登录', // 登录后的用户名
  userType: 'normal', //  用户类型
  userId: '', // 用户id
};

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, login: true, userName: action.payload.userName, userType: action.payload.userType, userId: action.payload.userId };
    default:
      return state;
  }
};

export default { initState, reducer };
