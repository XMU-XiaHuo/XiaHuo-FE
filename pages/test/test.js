// pages/test/test.js
const {
  wxRequest
} = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  testWxLogin: function() {
    wx.login({
      success(res) {
        console.log("这个是code悠总：" + res.code);
        if (res.code) {
         
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // get 不带参数
    // wxRequest('/get/test', 'GET').then((res) => {
    //   console.log(res);
    // });

    // get 带参数
    // wxRequest('/user', 'GET',{
    //   name:'TanYJie'
    // }).then((res) => {
    //   console.log(res);
    // });

    // post
    // wxRequest('/post/test', 'POST', {
    //   id: 1,
    //   test: true
    // }).then((res) => {
    //   console.log(res);
    // });
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