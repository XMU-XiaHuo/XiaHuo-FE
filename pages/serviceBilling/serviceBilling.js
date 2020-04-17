// pages/serviceBilling/serviceBilling.js
const app = getApp();
const {
  wxRequest
} = app.Request;

const pageLimit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据相关
    page: 1,
    billList: [],
    hasResult: true,
    loading: true,
    noMore: false,

    // 伸缩面板 active 列表
    activeNames: [],

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],

    // map 
    map: {
      orderNum: '订单数量',
      cost: '费用'
    }
  },

  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  // 展示错误 modal
  showModal: function (title = '', msg = '发生了未知的错误') {
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

  // 获取计费单列表
  getBillList: function () {
    let that = this;
    let {
      page,
      billList
    } = this.data;
    let noMore = false;
    that.setData({
      loading: true
    }, () => {
      wxRequest({
        url: '/order/order/orderReports',
        method: 'GET',
        data: {
          pageNum: page,
          pageLimit: pageLimit
        }
      }).then((res) => {
        let {
          result
        } = res;
        let {
          orderReportVOList
        } = result;
        if (orderReportVOList.length < pageLimit) {
          noMore = true;
        }
        that.setData({
          page: page + 1,
          loading: false,
          noMore: noMore,
          billList: billList.concat(orderReportVOList)
        });
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
        that.setData({
          loading: false
        })
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBillList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉触底
   */
  onReachBottom: function () {
    let {
      noMore
    } = this.data;
    if (!noMore) {
      this.getReportList();
    }
  }

})