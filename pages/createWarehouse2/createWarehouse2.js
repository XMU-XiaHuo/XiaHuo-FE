// pages/createWarehouse2/createWarehouse2.js
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
  inputEventCatcher: function (e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'warehouseInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  checkName: function (name) {
    let regName = /^[\u4e00-\u9fa5]{2,10}$/;
    if (!regName.test(name)) {
      return '仓库名格式错误（应为 2 - 10 个汉字）';
    }
    return '';
  },

  nextStep: function () {
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

    // 跳转到成功页面
    wx.navigateTo({
      url: '../createWarehouse3/createWarehouse3'
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
})