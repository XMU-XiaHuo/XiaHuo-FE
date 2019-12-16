// pages/enterWarehouse/enterWarehouse.js

let giveSuggestId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {
      name: '',
      number: '',
      location: ''
    },
    errorInfo: {
      nameError: '',
      numberError: '',
      locationError: ''
    },
    suggestGoodsList: ['上衣', '裤子', '帽子', '袜子', '抱枕', '棉被'],
    isSuggesting: true
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'goodsInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  // 输入商品名出推荐
  inputGoodsName: function(e) {
    let that = this;
    let giveSuggestion = function() {
      if (!that.data.goodsInfo.name) {
        return;
      }
      // doSomething
      that.setData({
        isSuggesting: false
      })
    };
    if (this.data.isSuggesting) {
      clearTimeout(giveSuggestId);
      giveSuggestId = setTimeout(() => {
        giveSuggestion();
      }, 500);
    } else {
      this.setData({
        isSuggesting: true
      })
    }

    this.setData({
      ['goodsInfo.name']: e.detail
    });
  },

  // 选择某个推荐的项目
  chooseSuggest: function(e) {
    let {
      value
    } = e.target.dataset;
    this.setData({
      ['goodsInfo.name']: value,
      isSuggesting: true
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