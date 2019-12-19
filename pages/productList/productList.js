// pages/productList/productList.js
const {
  $Toast
} = require('../../iview/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有结果
    hasResult: true,
    // 伸缩面板 active 列表
    activeNames: [],
    // 删除 sheet 显示
    actionSheetVisible: false,
    // 删除 sheet 的按钮
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],
    // product 列表
    productList: [{
      name: '黄色XL',
      id: 1
    }, {
      name: '黄色L',
      id: 2
    }, {
      name: '红色XL',
      id: 3
    }, {
      name: '红色L',
      id: 4
    }]
  },

  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  // 删除 product
  deleteProduct: function(){
    this.setData({
      actionSheetVisible: true
    });
  },

  // 确认删除后的操作
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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