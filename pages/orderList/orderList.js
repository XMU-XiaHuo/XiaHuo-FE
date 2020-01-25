// pages/orderList/orderList.js
const app = getApp();
const {
  wxRequest
} = app.Request;

const pageLimit = 15;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据展示相关
    loading: false,
    orderList: [],
    page: 1,
    noMore: false,

    // 伸缩面板 active 列表
    activeNames: [],
    // 删除 sheet 显示
    actionSheetVisible: false,
    // 删除 sheet 的按钮
    deleteAction: [{
      name: '确认取消订单',
      color: '#ed3f14'
    }],
    deleteOrderId: null,
    deleteOrderIndex: null,

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
  // 打印
  printOrder: function(e){
    let {
      id
    } = e.target.dataset;
    let orderIdList = id.map((value)=>{
      return value.orderId;
    });
    wx.setStorageSync('orderIdList', orderIdList);
    wx.reLaunch({
      url: '../chooseDelivery/chooseDelivery'
    });
  },
  // 删除 order
  deleteOrder: function(e) {
    let {
      id,
      index
    } = e.target.dataset;
    this.setData({
      actionSheetVisible: true,
      deleteOrderId: id,
      deleteOrderIndex: index
    });
  },
  // 确认删除后的操作
  handleDelete() {
    let that = this;
    let {
      deleteOrderId,
      deleteOrderIndex,
      deleteAction,
      orderList
    } = this.data;
    // 设置 loading
    const action = [...deleteAction];
    action[0].loading = true;
    this.setData({
      deleteAction: action
    }, () => {
      wxRequest({
        url: '/order/order/orderStatus?orderId=' + deleteOrderId,
        method: 'PUT',
      }).then((res) => {
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action,
          ['orderList[' + deleteOrderIndex + '].status']: '已取消'
        });
        that.showModal('♪(๑^∇^๑)', '取消订单成功~');
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

  getOrderList: function() {
    let that = this;
    let {
      orderList,
      page
    } = this.data;
    this.setData({
      loading: true
    }, () => {
      wxRequest({
        url: '/order/order/ordersPageLimit',
        method: 'GET',
        data: {
          pageNumber: page,
          pageLimit: pageLimit
        }
      }).then((res) => {
        let {
          orderVOList
        } = res.result;
        console.log(orderVOList);
        that.setData({
          orderList: orderList.concat(orderVOList),
          noMore: orderVOList.length <= 0,
          page: page + 1,
          loading: false
        })
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
        that.setData({
          loading: false,
          noMore: true
        })
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉触底
   */
  onReachBottom: function() {
    let {
      noMore
    } = this.data;
    if (!noMore) {
      this.getOrderList();
    }
  }
})