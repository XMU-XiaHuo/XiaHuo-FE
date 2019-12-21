// pages/personInfoManage/personInfoManage.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({
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
    },
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '返回',
    }],
  },

  // 获取个人信息
  getUserInfo: function() {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/user/info',
        method: 'GET'
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'userInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },
  checkName: function(name) {
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!name || !regName.test(name)) {
      return '姓名格式错误（应为 2 - 4 个汉字）';
    }
    return '';
  },
  checkPhone: function(phone) {
    let regPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!phone || phone.length === 0) {
      return '手机号不能为空'
    }
    if (!regPhone.test(phone)) {
      return '手机号格式错误';
    }
    return '';
  },
  checkEmail: function(email) {
    let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email || email.length === 0) {
      return '邮箱不能为空'
    }
    if (!regEmail.test(email)) {
      return '邮箱格式错误';
    }
    return '';
  },

  // 修改个人信息
  editUserInfo: function(name, identity, phone, email) {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/user/info',
        method: 'PUT',
        data: {
          email,
          identity,
          name,
          phone
        }
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },

  // 保存
  save: function() {
    let {
      name,
      identity,
      phone,
      email
    } = this.data.userInfo;
    let that = this;

    // 检测姓名
    let checkNameResult = this.checkName(name);
    this.setData({
      ['errorInfo.nameError']: checkNameResult
    })

    // 检测手机号
    let checkPhoneResult = this.checkPhone(phone);
    this.setData({
      ['errorInfo.phoneError']: checkPhoneResult
    })

    // 检测邮箱
    let checkEmailResult = this.checkEmail(email);
    this.setData({
      ['errorInfo.emailError']: checkEmailResult
    })

    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkPhoneResult.length > 0 || checkEmailResult.length > 0) {
      return;
    }

    this.editUserInfo(name, identity, phone, email).then((res) => {
      this.showModal('♪(๑^∇^๑)', '保存成功');
    }, (error) => {
      // 展示错误 modal
      this.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },
  // 展示错误 modal
  showModal: function(title = '', msg = '未知的错误') {
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
  clickModal() {
    this.setData({
      modalVisible: false
    })
  },

  init: function() {
    let that = this;
    this.getUserInfo().then((res) => {
      that.setData({
        userInfo: res.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();
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