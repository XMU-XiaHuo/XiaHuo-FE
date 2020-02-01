// pages/storageList/storageList.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据相关
    productList: [],
    hasResult: true,
    loading: true,

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
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

  jump: function(e) {
    let {
      item
    } = e.target.dataset;
    wx.navigateTo({
      url: '../storageProduct/storageProduct?id=' + item.productId + '&name=' + item.productName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wxRequest({
      url: '/storage-location/storage/allProduct',
      method: 'GET',
    }).then((res) => {
      let {
        result
      } = res;
      that.setData({
        productList: result,
        loading: false,
        hasResult: result.length > 0
      })
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      that.setData({
        loading: false
      })
    });
  },

})