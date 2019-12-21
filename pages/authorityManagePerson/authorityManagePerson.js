// pages/authorityManagePerson/authorityManagePerson.js
const {
  Roles,
  Description
} = require('../../data/role.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleList: []
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
      if (index < 2) { // 如果开启创建者或管理员权限，则取消勾选其他角色
        for (let i = 0; i < 6; i++) {
          roleList[i].switch = index === i ? true : false;
        }
        this.setData({
          roleList: roleList
        })
      } else { // 如果开启其他角色权限，则取消创建者和管理员
        this.setData({
          ['roleList[0].switch']: false,
          ['roleList[1].switch']: false,
          ['roleList[' + index + '].switch']: e.detail.value
        })
      }
    } else { // 否则，正常勾选
      this.setData({
        ['roleList[' + index + '].switch']: e.detail.value
      })
    }
  },

  formatRoleList: function() {
    let res = [];
    Object.keys(Roles).forEach((key) => {
      if (key !== '无权限') {
        res.push({
          title: key,
          label: Description[key],
          switch: false
        })
      }
    })
    this.setData({
      roleList: res
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.formatRoleList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})