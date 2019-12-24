// pages/productList/productList.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据展示相关
    loading: false,
    goodsId: null,
    hasResult: true,
    productList: [],

    // 伸缩面板 active 列表
    activeNames: [],
    // 删除 sheet 显示
    actionSheetVisible: false,
    // 删除 sheet 的按钮
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],

  },

  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  // 删除 product
  deleteProduct: function() {
    this.setData({
      actionSheetVisible: true
    });
  },
  // 确认删除后的操作
  handleDelete() {
    const action = [...this.data.deleteAction];
    action[0].loading = true;

    this.setData({
      deleteAction: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        actionSheetVisible: false,
        deleteAction: action
      });
    }, 2000);
  },
  // 取消删除
  cancelDelete() {
    this.setData({
      actionSheetVisible: false
    });
  },
  // 创建 product
  createProduct: function() {
    wx.navigateTo({
      url: '../createProduct/createProduct?id=' + this.data.goodsId
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
  // 展示数据
  showData: function(result) {
    this.setData({
      loading: false,
      hasResult: result.length > 0,
      productList: result
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let id = 4;
    this.setData({
      goodsId: id,
      loading: true
    }, () => {
      wxRequest({
        url: '/goods/product/products',
        method: 'GET',
        data: {
          goodsId: id
        }
      }).then((res) => {
        that.showData(res.result);
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      });
    });
  },

})