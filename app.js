//app.js
const EventEmitter = require('utils/eventEmitter.js');
const Request = require('utils/request.js');

App({
  onLaunch: function() {
    // 初始化事件监听器
    this.eventEmitter = new EventEmitter();
    this.Request = Request;

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              this.eventEmitter.trigger('getUserInfo', res);
            }
          })
        } else {
          wx.reLaunch({
            url: '../../pages/userAuthorize/userAuthorize'
          })
        }
      },
    })
  },
  globalData: {
    userInfo: null
  }
})