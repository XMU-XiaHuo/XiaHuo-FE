// pages/myAuthority/myAuthority.js
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
    roleList: [],
    loading: true
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
    let that = this;
    return new Promise((resolve, reject) => {
      Object.keys(Roles).forEach((key, index) => {
        if (key !== '无权限') {
          res.push({
            title: key,
            label: Description[key],
            have: false
          })
        }
      })
      that.setData({
        roleList: res
      }, () => {
        resolve(res);
      });
    });
  },

  // 获取权限信息
  getPermissionInfo: function(code) {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/user/permissions',
        method: 'GET'
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.formatRoleList().then((roleList) => {
      that.getPermissionInfo().then(({
        result = []
      }) => {
        if (result.length > 0) {
          result.forEach((valueRes) => {
            roleList.forEach((value, index) => {
              if (valueRes === value.title) {
                roleList[index].have = true;
              }
            })
          });
          that.setData({
            roleList: roleList,
            loading: false
          })
        }
      })
    });
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