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

    // 批量处理相关
    isChoosing: false,

    // 页面滚动相关
    isPageScroll: false,
    scrollTop: 0,

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
  printOrder: function(e) {
    let {
      id,
      name
    } = e.target.dataset;
    wx.setStorageSync('orderIdList', [id]);
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
  // 获取订单列表
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
        orderVOList = orderVOList.map((value) => {
          return Object.assign(value, {
            isChoose: false
          })
        })
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
  // 开启批量处理
  openBatchChoose: function() {
    this.setData({
      isChoosing: true
    })
  },
  // 关闭批量处理
  closeBatchChoose: function() {
    let {
      orderList
    } = this.data;
    orderList.forEach((value) => {
      value.isChoose = false;
    })
    this.setData({
      orderList: orderList,
      isChoosing: false
    })
  },
  // 选择单个订单
  choose: function(e) {
    let {
      index
    } = e.target.dataset;
    let {
      orderList
    } = this.data;
    orderList[index].isChoose = true;
    this.setData({
      orderList
    })
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
  },

  /**
   * 生命周期函数--监听页面滚动
   */
  onPageScroll: function(ev) {
    let _this = this;
    let {
      windowHeight
    } = wx.getSystemInfoSync();

    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == windowHeight) {
      // 向下滚动
      if (this.data.isPageScroll === false) {
        this.setData({
          isPageScroll: true
        })
      }
    } else {
      // 向上滚动
      if (this.data.isPageScroll === true) {
        this.setData({
          isPageScroll: false
        })
      }
    }
    // 给scrollTop重新赋值
    setTimeout(function() {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0);
  }
})