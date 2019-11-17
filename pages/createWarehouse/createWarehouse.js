// pages/createWarehouse/createWarehouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '',
      identity: '',
      phone: '',
      email: ''
    },
    errorInfo: {
      nameError: '',
      identityError: '',
      phoneError: '',
      emailError: ''
    }
  },

  // 处理输入事件
  inputEventCatcher: function (e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'userInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  checkName: function (name) {
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(name)) {
      return '姓名格式错误（应为2-4个汉字）';
    }
    return '';
  },
  checkIdentity: function (identity) {
    let regIdentity = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
    if (!regIdentity.test(identity)) {
      return '身份证号格式错误';
    }
    return '';
  },

  // 下一步
  nextStep: function() {
    let {
      name,
      identity,
      phone,
      email
    } = this.data.userInfo;
    
    // 检测姓名
    let checkNameResult = this.checkName(name);
    this.setData({
      ['errorInfo.nameError']: checkNameResult
    })

    // 检测身份证号
    let checkIdentityResult = this.checkIdentity(identity);
    this.setData({
      ['errorInfo.identityError']: checkIdentityResult
    })

    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkIdentityResult.length > 0) {
      return;
    }

    // 跳转，这里先注释
    // wx.navigateTo({
    //   url: '../createWarehouse2/createWarehouse2'
    // })
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