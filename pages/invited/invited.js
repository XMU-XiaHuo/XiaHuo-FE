// pages/invited/invited.js
const app = getApp();
const {
  wxRequest,
  getTopPage
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    
    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  // 展示错误 modal
  showModal: function(title = '', msg = '发生了未知的错误') {
    let that = this;
    this.setData({
      errorTitle: title,
      errorMsg: msg
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
    let token = wx.getStorageSync("token");
    if (!token) {
      // 如果没有 token 先跳转到 login 界面，再返回
      wx.setStorageSync('reLaunchUrl', getTopPage());
      wx.reLaunch({
        url: '..index/index',
      })
    }

  },

})