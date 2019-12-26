// pages/storageProduct/storageProduct.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: null,
    productName: '',
    productList: [],
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

  getStorageProduct: function(productId) {
    let that = this;
    wxRequest({
      url: '/storage-location/storage/findLocation',
      method: 'GET',
      data: {
        productId: productId
      }
    }).then((res) => {
      let {
        result
      } = res;
      that.setData({
        productList: result,
        loading: false
      })
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      that.setData({
        loading: false
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      id,
      name
    } = options;
    this.setData({
      productId: id,
      productName: name
    });
    this.getStorageProduct(id);
  },

})