// pages/stockCheck/stockCheck.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageNumber: '',
    loading: false,
    activeNames: [],
    productList: [],
    hasResult: true,

    // 报损报溢
    reportModal: false,
    reportType: 0,
    report: {
      description: '',
      number: '',
    },
    errorInfo: {
      descriptionError: '',
      numberError: ''
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

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = key;
    console.log(key);
    this.setData({
      [modifyKey]: e.detail
    })
  },
  // 处理收缩面板变化事件
  collapseChangeCatcher(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  // 展示数据
  showData: function(result) {
    if (result.productId === null) {
      this.setData({
        hasResult: false,
        loading: false
      });
    } else {
      this.setData({
        productList: [].concat(result),
        activeNames: [].concat(productId),
        hasResult: true,
        loading: false
      });
    }
  },
  // 根据库位号搜索
  search: function() {
    let that = this;
    let {
      storageNumber
    } = this.data;
    this.setData({
      loading: true
    }, () => {
      wxRequest({
        url: '/storage-location/storage/find',
        method: 'GET',
        data: {
          storageLocation: storageNumber
        }
      }).then((res) => {
        that.showData(res.result);
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
        that.setData({
          loading: false
        });
      });
    });
  },
  // 报损弹窗
  reportDamage: function() {
    this.setData({
      reportModal: true,
      reportType: 0
    })
  },
  // 报溢弹窗
  reportOverflow: function() {
    this.setData({
      reportModal: true,
      reportType: 1
    })
  },
  // 处理输入事件
  inputEventCatcherReport: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'report.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },
  // 提交报损/报溢
  submitReport: function() {
    let {
      reportType,
      report
    } = this.data;
    let {
      description,
      number
    } = report;
    let checkDescriptionResult = this.checkDescription(description);
    let checkNumberResult = this.checkNumber(number, reportType);
    this.setData({
      ['errorInfo.descriptionError']: checkDescriptionResult,
      ['errorInfo.numberError']: checkNumberResult
    })
    if (checkDescriptionResult.length === 0 && checkNumberResult.length === 0) {
      this.setData({
        reportModal: false
      });
    }
  },
  // 检测描述信息
  checkDescription: function(description) {
    if (description === '') {
      return '描述信息不能为空';
    }
    return '';
  },
  // 检测真实数量
  checkNumber: function(number, reportType) {
    if (number === '') {
      return '真实数量不能为空';
    }
    return '';
  },
  // 关闭 modal
  closeReportModal: function() {
    this.setData({
      reportModal: false
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

  },
})