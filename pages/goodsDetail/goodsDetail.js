// pages/goodsDetail/goodsDetail.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    goodsId: null,
    goodsInfo: {
      name: '',
      unit: '',
      expireDate: '',
      description: '',
      properties: ''
    },

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  // 跳转到编辑页面
  goToEditGoods: function() {
    wx.navigateTo({
      url: '../editGoods/editGoods?id=' + this.data.goodsId
    })
  },

  // 跳转到产品列表页面
  goToProductList: function() {
    wx.navigateTo({
      url: '../productList/productList?id=' + this.data.goodsId
    })
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
    let id = options.id;
    this.setData({
      loading: true,
      goodsId: id
    }, () => {
      wxRequest({
        url: '/goods/goods/goods',
        method: 'GET',
        data: {
          goodsId: id
        }
      }).then((res) => {
        let {
          result
        } = res;
        let {
          name,
          description,
          measuringUnit,
          validTime,
          properties
        } = result;
        that.setData({
          goodsInfo: {
            name: name,
            description: description,
            unit: measuringUnit,
            expireDate: validTime,
            properties: properties.join(' | ')
          },
          loading: false
        })
      })
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },
})