/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */

// 其实理论上可以嵌套更多层菜单的, 但是我觉得超过3层就不好看了
// 可用的图标见这里: https://ant.design/components/icon-cn/
// import globalConfig from '../config';
// 定义siderbar菜单
const sidebarMenu = [
  {
    key: 'mainPage',  // route时url中的值
    name: '首页',  // 在菜单中显示的名称
    icon: 'smile',  // 图标是可选的
  },
  {
    key: 'activities',
    name: '活动',
    icon: 'bulb',  // 图标是可选的
    child: [
      {
        key: 'option1',
        name: '查看所有活动',
        icon: 'play-circle',   // 二级三级菜单也可以带图标
      },
      {
        key: 'option2',
        name: '已参加',
        icon: 'android',
      },
      {
        key: 'option3',
        name: '正在进行',
        icon: 'bulb',
      },
    ],
  },
  {
    key: 'suTuo',
    name: '素拓历史',
    icon: 'appstore',
  },
  {
    key: 'homeWork',
    name: '作业提交',
    icon: 'eye',
  },
];

export default sidebarMenu;

// 定义header菜单, 格式和sidebar是一样的
// 特殊的地方在于, 我规定header的最右侧必须是用户相关操作的菜单, 所以定义了一个特殊的key
// 另外注意这个菜单定义的顺序是从右向左的, 因为样式是float:right
export const headerMenu = [
  {
    // 一个特殊的key, 定义用户菜单, 在这个submenu下面设置icon/name不会生效
    key: 'userMenu',
    child: [
      {
        key: 'userInfo',
        name: '我的信息',
        icon: 'bulb',
        // 对于headerMenu的菜单项, 可以让它跳到外部地址, 如果设置了url属性, 就会打开一个新窗口
        // 如果不设置url属性, 行为和sidebarMenu是一样的, 激活特定的组件, 注意在index.js中配置好路由, 否则会404
        // url: 'http://jxy.me',
      },
      {
        key: 'security',
        name: '安全设置',
        icon: 'security-scan',
      },
      {
        key: 'class',
        name: '班级',
        icon: 'cloud',
      },
      {
        key: 'manager',
        name: '管理',
        child: [
          {
            key: 'manageAct',
            name: '管理活动',
            icon: 'appstore',
            // url: 'http://jxy.me',
          },
        ],
      },
    ],
  }
];
