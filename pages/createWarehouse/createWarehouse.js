// pages/createWarehouse/createWarehouse.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '谭源杰',
      identity: '330105199807120017',
      phone: '18059235981',
      email: '413145873@qq.com'
    },
    errorInfo: {
      nameError: '',
      identityError: '',
      phoneError: '',
      emailError: ''
    },
    modalVisible: false,
    errorTitle: '出错了๑Ծ‸Ծ๑',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确定',
    }],
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
  checkIdentity: function(identity) {
    let regIdentity = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!identity || identity.length === 0) {
      return '身份证号不能为空'
    }
    if (!regIdentity.test(identity)) {
      return '身份证号格式错误';
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
  // 下一步
  nextStep: function() {
    let {
      name,
      identity,
      phone,
      email
    } = this.data.userInfo;
    let that = this;

    // 检测姓名
    let checkNameResult = this.checkName(name);
    // 检测身份证号
    let checkIdentityResult = this.checkIdentity(identity);
    // 检测手机号
    let checkPhoneResult = this.checkPhone(phone);
    // 检测邮箱
    let checkEmailResult = this.checkEmail(email);
    this.setData({
      errorInfo: {
        nameError: checkNameResult,
        identityError: checkIdentityResult,
        phoneError: checkPhoneResult,
        emailError: checkEmailResult
      }
    });

    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkIdentityResult.length > 0 || checkPhoneResult.length > 0 || checkEmailResult.length > 0) {
      return;
    }

    this.editUserInfo(name, identity, phone, email).then((res) => {
      // 跳转
      wx.navigateTo({
        url: '../createWarehouse2/createWarehouse2'
      })
    }, (error) => {
      // 展示错误 modal
      this.showModal(error.message);
    });
  },
  // 展示错误 modal
  showModal: function(errorMsg) {
    let that = this;
    this.setData({
      errorMsg: errorMsg || '未知的错误'
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

})