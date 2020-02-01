// pages/leaveWarehouse/leaveWarehouse.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      name: '取消'
    }, {
      color: '#409eff',
      name: '确定',
    }],
  },

  // 展示确认 modal
  showModal: function(title, msg) {
    let that = this;
    this.setData({
      isError: false,
      errorTitle: '๑Ծ‸Ծ๑',
      errorMsg: '确认要退出仓库吗',
      modalButtons: [{
        name: '取消'
      }, {
        color: '#409eff',
        name: '确定',
      }]
    }, () => {
      that.setData({
        modalVisible: true
      })
    });
  },

  // 展示错误 modal
  showErrorModal: function(errorTitle, errorMsg) {
    let that = this;
    this.setData({
      isError: true,
      errorTitle: '出错了๑Ծ‸Ծ๑',
      errorMsg: errorMsg || '未知的错误',
      modalButtons: [{
        color: '#409eff',
        name: '确定',
      }]
    }, () => {
      that.setData({
        modalVisible: true
      })
    });
  },

  //  modal 的交互
  clickModal({
    detail
  }) {
    let that = this;
    const index = detail.index;
    let {
      isError
    } = this.data;
    if (isError) {
      this.setData({
        modalVisible: false
      })
    } else {
      if (index === 1) {
        that.leave().then((res) => {
          wx.reLaunch({
            url: '../index/index'
          });
        }, (error) => {
          that.showErrorModal(error.message);
        })
      }
      this.setData({
        modalVisible: false
      })
    }
  },

  // 退出仓库请求
  leave: function(name, address, info) {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/user/warehouse',
        method: 'PUT'
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },

  // 退出仓库总流程
  exitWarehouse: function() {
    this.showModal();
  },

})