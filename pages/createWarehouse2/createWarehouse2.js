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
  checkAddress: function(address) {
    if (address.length === 0) {
      return '仓库地址不能为空';
    }
    if (address.length > 50) {
      return '仓库地址应在 50 字内';
    }
    return '';
  },
  checkInfo: function (info) {
    if (info.length === 0) {
      return '仓库简介不能为空';
    }
    if (info.length > 80) {
      return '仓库简介应在 80 字内';
    }
    return '';
  },

  nextStep: function() {
    let {
      name,
      address,
      info
    } = this.data.warehouseInfo;

    // 检测仓库名
    let checkNameResult = this.checkName(name);
    this.setData({
      ['errorInfo.nameError']: checkNameResult
    });

    // 检测仓库地址
    let checkAddressResult = this.checkAddress(address);
    this.setData({
      ['errorInfo.addressError']: checkAddressResult
    });

    // 检测仓库简介
    let checkInfoResult = this.checkInfo(info);
    this.setData({
      ['errorInfo.infoError']: checkInfoResult
    });

    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkAddressResult.length > 0 || checkInfoResult.length > 0) {
      return;
    }

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