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
    this.setData({
      ['roleList[' + index + '].switch']: e.detail.value
    })
  },

  formatRoleList: function() {
    let res = [];
    Object.keys(Roles).forEach((key) => {
      if (key !== 'none') {
        res.push({
          title: Roles[key],
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