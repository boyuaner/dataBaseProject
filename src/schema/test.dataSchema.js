import React from 'react';
import { Icon } from 'antd';

// 定义某个表的dataSchema, 结构跟querySchema很相似, 见下面的例子
// 注意: 所有的key不能重复

// 这个配置不只决定了table的schema, 也包括用于新增/删除的表单的schema

module.exports = [
  {
    key: 'id',  // 传递给后端的key
    title: 'ID',  // 前端显示的名字

    // 其实dataType对前端的意义不大, 更重要的是生成后端接口时要用到, 所以要和DB中的类型一致
    // 对java而言, int/float/varchar/datetime会映射为Long/Double/String/Date
    dataType: 'int',  // 数据类型, 目前可用的: int/float/varchar/datetime

    // 这一列是否是主键?
    // 如果不指定主键, 不能update/delete, 但可以insert
    // 如果指定了主键, insert/update时不能填写主键的值;
    // 只有int/varchar可以作为主键, 但是实际上主键一般都是自增id
    primary: true,

    // 可用的showType: normal/radio/select/checkbox/multiSelect/textarea/image/file/cascader
    showType: 'normal',  // 默认是normal, 就是最普通的输入框

    showInTable: true,  // 这一列是否要在table中展示, 默认true
    disabled: false, // 表单中这一列是否禁止编辑, 默认false

    // 扩展接口, 决定了这一列渲染成什么样子
    render: (text, record) => text,
  },
  {
    key: 'score',
    title: '活动名称',
    dataType: 'varchar',
    showType: 'text',  // 用于编辑大段的文本
  },
  {
    key: 'Type',
    title: '活动类型',
    dataType: 'int',
    showType: 'radio',
    options: [{ key: '1', value: '讲座' }, { key: '2', value: '实验' }],
    defaultValue: '1',
  },
  {
    key: 'apartment',
    title: '是否必须参加',
    dataType: 'varchar',
    showType: 'select',
    options: [{ key: 'yes', value: '是' }, { key: 'no', value: '否' }],

    // 对于dataSchema可以设置校验规则, querySchema不能设置
    // 设置校验规则, 参考https://github.com/yiminghe/async-validator#rules
  },
  {
    key: 'pic1',
    title: '活动图片',
    dataType: 'varchar',
    showType: 'image',  // 后端必须提供图片上传接口
    showInTable: false,
  },
  {
    key: 'desc',
    title: '活动简介',
    dataType: 'varchar',
    showType: 'textarea',  // 用于编辑大段的文本
    showInTable: false,
    defaultValue: '',
    validator: [{ type: 'string', max: 500, message: '最长500个字符' }],
  },

  {
    key: 'birthday',
    title: '活动日期',
    // 对于日期类型要注意下, 在js端日期被表示为yyyy-MM-dd HH:mm:ss的字符串, 在java端日期被表示为java.util.Date对象
    // fastjson反序列化时可以自动识别
    // 序列化倒是不用特别配置, 看自己需求, fastjson会序列化为一个字符串, 前端原样展示
    dataType: 'datetime',
    // 对于datetime而言, 配置showType是无意义的
    placeholder: '请输入日期',
  },
];
