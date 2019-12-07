// pages/warehouseInfoManage/warehouseInfoManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseInfo: {
      name: '',
      address: '',
      info: ''
    },
    errorInfo: {
      nameError: '',
      addressError: '',
      infoError: ''
    }
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'warehouseInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  checkName: function(name) {
    let regName = /^[\u4e00-\u9fa5]{2,15}$/;
    if (!regName.test(name)) {
      return '仓库名格式错误（应为 2 - 15 个汉字）';
    }
    return '';
  },

  confirmEdit: function() {
    let {
      name,
      address,
      info
    } = this.data.warehouseInfo;
    
    // 检测仓库名
    let checkNameResult = this.checkName(name);
    this.setData({
      ['errorInfo.nameError']: checkNameResult
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