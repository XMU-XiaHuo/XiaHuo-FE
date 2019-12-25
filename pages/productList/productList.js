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
    deleteProductId: null,
    deleteProductIndex: null,

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
  // 跳转到编辑 product 页面
  editProduct: function(e) {
    let {
      item
    } = e.target.dataset;
    wx.setStorageSync('product', item);
    wx.navigateTo({
      url: '../editProduct/editProduct'
    })
  },
  // 删除 product
  deleteProduct: function(e) {
    let {
      id,
      index
    } = e.target.dataset;
    this.setData({
      actionSheetVisible: true,
      deleteProductId: id,
      deleteProductIndex: index
    });
  },
  // 确认删除后的操作
  handleDelete() {
    let that = this;
    let {
      deleteProductId,
      deleteProductIndex,
      deleteAction,
      productList
    } = this.data;
    // 设置 loading
    const action = [...deleteAction];
    action[0].loading = true;
    this.setData({
      deleteAction: action
    }, () => {
      wxRequest({
        url: '/goods/product/product?productId=' + deleteProductId,
        method: 'DELETE',
      }).then((res) => {
        productList.splice(deleteProductIndex, 1);
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action,
          productList: productList
        });
        that.showModal('♪(๑^∇^๑)', '删除成功~');
      }, (error) => {
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action
        });
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      });
    });
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
        that.setData({
          loading: false
        })
      });
    });
  }
})