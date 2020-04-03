// pages/log/pages/reportList/reportList.js
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
    reportList: [],
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
      productId: '',
      productName: '产品名',
      productLocation: "库位号",
      createTime: "操作时间",
      description: "描述信息",
      newNumber: '新数量',
      oldNumber: '原数量',
      reportUserId: '',
      reportUserName: '操作者'
    }
  },

  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
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

  // 获取报损/报溢单接口
  getReportList: function() {
    let that = this;
    let {
      page,
      reportList
    } = this.data;
    let noMore = false;
    that.setData({
      loading: true
    }, () => {
      wxRequest({
        url: '/storage-location/reportList',
        method: 'GET',
        data: {
          page: page,
          pageLimit: pageLimit
        }
      }).then((res) => {
        let {
          result
        } = res;
        console.log(result);
        let {
          storageReportVOList
        } = result;
        if (storageReportVOList.length < pageLimit) {
          noMore = true;
        }
        that.setData({
          page: page + 1,
          loading: false,
          noMore: noMore,
          reportList: reportList.concat(storageReportVOList)
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
  onLoad: function(options) {
    this.getReportList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉触底
   */
  onReachBottom: function() {
    let {
      noMore
    } = this.data;
    if (!noMore) {
      this.getReportList();
    }
  }

})