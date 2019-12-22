// pages/authorityManage/authorityManage.js
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
    loading: true,
    actionSheetVisible: false,
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],
    isPageScroll: false,
    scrollTop: 0
  },

  // 编辑相关
  jumpToEditPage: function() {
    wx.navigateTo({
      url: '../authorityManagePerson/authorityManagePerson'
    })
  },

  // 删除成员
  openDeleteAction() {
    this.setData({
      actionSheetVisible: true
    });
  },

  // 确认删除
  handleDelete() {
    const action = [...this.data.deleteAction];
    action[0].loading = true;

    this.setData({
      deleteAction: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        actionSheetVisible: false,
        deleteAction: action
      });
    }, 2000);
  },

  // 取消删除
  handleCancel() {
    this.setData({
      actionSheetVisible: false
    });
  },

  // 获取成员列表-接口
  getMemberInfo: function() {
    return wxRequest({
      url: '/user/user/members',
      method: 'GET'
    });
  },

  // 删除成员-接口
  getMemberInfo: function() {
    return wxRequest({
      url: '/user/user/member',
      method: 'DELETE'
    });
  },
  /**
   * 生命周期函数--监听页面滚动
   */
  onPageScroll: function(ev) {
    let _this = this;
    let {
      windowHeight
    } = wx.getSystemInfoSync();

    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == windowHeight) {
      // 向下滚动
      if (this.data.isPageScroll === false) {
        this.setData({
          isPageScroll: true
        })
      }
    } else {
      // 向上滚动
      if (this.data.isPageScroll === true) {
        this.setData({
          isPageScroll: false
        })
      }
    }
    // 给scrollTop重新赋值
    setTimeout(function() {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMemberInfo().then((res) => {
      console.log(res);
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