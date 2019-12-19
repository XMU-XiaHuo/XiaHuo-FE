// pages/stockCheck/stockCheck.js
const {
  $Toast
} = require('../../iview/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageNumber: '',
    isSearching: false,
    activeNames: ['1', '2'],
    hasResult: true,
    modalVisible: true,
    reportType: 0,
    report: {
      description: '',
      number: '',
    },
    errorInfo: {
      descriptionError: '',
      numberError: ''
    }

  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  // 根据库位号搜索
  search: function() {
    console.log(this.data.storageNumber);
    this.setData({
      isSearching: true
    });

    setTimeout(() => {
      this.setData({
        isSearching: false
      })
    }, 1000);
  },

  // 报损弹窗
  reportDamage: function() {
    this.setData({
      modalVisible: true,
      reportType: 0
    })
  },

  // 报溢弹窗
  reportOverflow: function() {
    this.setData({
      modalVisible: true,
      reportType: 1
    })
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'report.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  // 提交报损/报溢
  submitReport: function() {
    let {
      reportType,
      report
    } = this.data;
    let {
      description,
      number
    } = report;
    let checkDescriptionResult = this.checkDescription(description);
    let checkNumberResult = this.checkNumber(number, reportType);
    this.setData({
      ['errorInfo.descriptionError']: checkDescriptionResult,
      ['errorInfo.numberError']: checkNumberResult
    })
    if (checkDescriptionResult.length === 0 && checkNumberResult.length === 0) {
      this.setData({
        modalVisible: false
      });
      $Toast({
        content: reportType ? '报溢成功' : '报损成功',
        type: 'success'
      });
    }
  },
  
  // 检测描述信息
  checkDescription: function(description) {
    if (description === '') {
      return '描述信息不能为空';
    }
    return '';
  },
  // 检测真实数量
  checkNumber: function(number, reportType) {
    if (number === '') {
      return '真实数量不能为空';
    }
    return '';
  },

  // 关闭 modal
  handleClose: function() {
    this.setData({
      modalVisible: false
    })
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