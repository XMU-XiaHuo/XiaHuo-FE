// pages/printOrder/printOrder.js
const {
  randomString
} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    loadingText: '生成快递单中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(randomString());
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})