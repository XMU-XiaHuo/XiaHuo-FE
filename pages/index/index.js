//index.js

const app = getApp();

const {
  wxRequest
} = require('../../utils/request.js');

Page({
  data: {
    logo: 'image/logo.png',
    loadingText: '登录中...',
    modalVisible: false,
    errorTitle: '登录出错了๑Ծ‸Ծ๑',
    errorMsg: '',
    modalButtons: [{
        name: '取消'
      },
      {
        color: '#409eff',
        name: '重试',
      }
    ],
    userInfo: {},
    warehouse: [{
        name: '厦门吴悠是xxxxxxxxxxxxxx仓库',
        role: 'owner'
      },
      {
        name: '福州仓库',
        role: 'admin'
      },
      {
        name: '泉州仓库',
        role: 'picker'
      },
    ],

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../mainPage/mainPage'
    })
  },
  jumpToCreatePage: function() {
    wx.navigateTo({
      url: '../createWarehouse/createWarehouse'
    })
  },
  // wxLogin 获取 code
  getCode: function() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject();
          }
        },
        fail(error) {
          reject(error);
        }
      })
    })
  },
  // 发 code 到后端
  codeToBackEnd: function(code) {
    return new Promise((resolve, reject) => {
      wxRequest('/user/user/user', 'GET', {
        code: code
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },
  // 展示错误 modal
  showModal: function(errorMsg) {
    let that = this;
    this.setData({
      errorMsg: errorMsg
    }, () => {
      that.setData({
        modalVisible: true
      })
    });
  },
  // 错误 modal 的交互
  clickModal({
    detail
  }) {
    const index = detail.index;
    if (index === 1) {
      console.log('重试登录')
    }
    this.setData({
      modalVisible: false
    })
  },
  // 重试登录
  reTry: function() {
    this.userLogin();
  },
  // 用户登录总流程
  userLogin: function() {
    Promise.resolve().then(() => {
      this.setData({
        loadingText: '微信授权中...'
      });
      return this.getCode();
    }).then((code) => {
      // wxLogin 成功
      this.setData({
        loadingText: '登录中...'
      });
      return this.codeToBackEnd(code);
    }, (error) => {
      // wxLogin 失败
      this.showModal('微信授权失败\n请检查您的网络连接, 并稍后重试');
      console.log(error);
    }).then((res) => {
      // codeToBackEnd 成功
      console.log(res);
    }, (error) => {
      // codeToBackEnd 失败
      this.showModal('系统后台出错, 请稍后重试');
      console.log(error);
    });
  },
  onLoad: function() {
    this.userLogin();
    this.showModal('微信授权失败\n请检查您的网络连接, 并稍后重试');
  },

})