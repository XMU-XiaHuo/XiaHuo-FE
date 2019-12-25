// pages/authorityManagePerson/authorityManagePerson.js
const app = getApp();
const {
  wxRequest
} = app.Request;

const {
  Roles,
  Description
} = require('../../data/role.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    roleList: [],

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }]
  },

  onSwitchChange(e) {
    let {
      index
    } = e.currentTarget.dataset;
    let {
      value
    } = e.detail;
    let roleList = [];
    if (value) { //如果是开开关
      roleList = Object.assign(this.data.roleList);
      if (index < 1) { // 如果开启创建者或管理员权限，则取消勾选其他角色
        for (let i = 0; i < 5; i++) {
          roleList[i].switch = index === i ? true : false;
        }
        this.setData({
          roleList: roleList
        })
      } else { // 如果开启其他角色权限，则取消创建者和管理员
        this.setData({
          ['roleList[0].switch']: false,
          ['roleList[' + index + '].switch']: e.detail.value
        })
      }
    } else { // 否则，正常勾选
      this.setData({
        ['roleList[' + index + '].switch']: e.detail.value
      })
    }
  },

  formatRoleList: function(roles) {
    let res = [];
    Object.keys(Roles).forEach((key) => {
      if (key !== '无权限' && key !== '创建者') {
        res.push({
          title: key,
          label: Description[key],
          switch: roles.includes(key)
        })
      }
    })
    this.setData({
      roleList: res
    });
  },

  // 保存
  save: function() {
    let that = this;
    let {
      roleList,
      userId
    } = this.data;
    let res = [];
    roleList.forEach((role) => {
      if (role.switch) {
        res.push(role.title);
      }
    });
    wxRequest({
      url: '/user/user/member',
      method: 'PUT',
      data: {
        memberId: userId,
        roleCNName: res
      }
    }).then((res) => {
      that.showModal('♪(๑^∇^๑)', '修改成功');
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message)
    });
  },

  // 展示错误 modal
  showModal: function(errorTitle = '', errorMsg = '发生了未知的错误') {
    let that = this;
    this.setData({
      errorTitle: errorTitle,
      errorMsg: errorMsg
    }, () => {
      that.setData({
        modalVisible: true
      })
    });
  },
  // 错误 modal 的交互
  clickModal({
    detail
  }) {
    this.setData({
      modalVisible: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let roles = wx.getStorageSync('roles');
    this.formatRoleList(roles);
    this.setData({
      userId: options.id
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.removeStorageSync('roles');
  },
})