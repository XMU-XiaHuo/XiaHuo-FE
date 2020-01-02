// pages/invited/invited.js
const app = getApp();
const {
  wxRequest,
  getTopPage
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    valid: true,
    inviteCode: null,

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  handleInvite: function(e) {
    let that = this;
    let {
      type
    } = e.target.dataset;
    let {
      inviteCode
    } = this.data;
    wxRequest({
      url: '/user/user/invite?inviteCode=' + inviteCode + '&isAgree=' + type,
      method: 'PUT'
    }).then((res) => {
      console.log('这里是 invite 接口的返回值：')
      console.log(res);
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message)
    });
  },

  // 展示错误 modal
  showModal: function(title = '', msg = '发生了未知的错误') {
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
  clickModal({
    detail
  }) {
    this.setData({
      modalVisible: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let token = wx.getStorageSync("token");
    let topPage = getTopPage();
    let {
      inviteCode
    } = options;
    console.log('这里是被邀请者，inviteCode 为 ' + inviteCode);
    if (!token) {
      // 如果没有 token 先跳转到 login 界面，再返回
      wx.setStorageSync('reLaunchUrl', topPage);
      wx.reLaunch({
        url: '../index/index',
      })
    }
    this.setData({
      inviteCode: inviteCode
    }, () => {
      wxRequest({
        url: '/user/user/inviteInfo',
        method: 'GET',
        data: {
          inviteCode: inviteCode
        }
      }).then((res) => {
        console.log('这里是 inviteInfo 接口的返回值：')
        console.log(res);
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message)
      });
    })

  },

})