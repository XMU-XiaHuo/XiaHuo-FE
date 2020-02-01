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
    storageNumber: '123456',
    loading: false,
    activeNames: [],
    productList: [],
    hasResult: true,

    // 报损报溢
    reportModal: false,
    reportType: 0,
    report: {
      id: null,
      location: '',
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
    let {
      productId
    } = result;
    if (productId === null) {
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
      hasResult: true,
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
  // 报损/报溢弹窗
  report: function(e) {
    let {
      type,
      item
    } = e.target.dataset;
    this.setData({
      reportModal: true,
      reportType: type,
      report: {
        id: item.productId,
        location: item.productLocation,
        description: '',
        number: '',
        oldNumber: item.productNumber
      }
    });
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
    let that = this;
    let {
      reportType,
      report
    } = this.data;
    let {
      id,
      location,
      description,
      number,
      oldNumber
    } = report;
    let checkDescriptionResult = this.checkDescription(description);
    let checkNumberResult = this.checkNumber(number, oldNumber, reportType);
    this.setData({
      ['errorInfo.descriptionError']: checkDescriptionResult,
      ['errorInfo.numberError']: checkNumberResult
    });
    if (checkDescriptionResult.length > 0 || checkNumberResult.length > 0) {
      return;
    }
    reportType = parseInt(reportType);
    wxRequest({
      url: '/storage-location/report',
      method: 'POST',
      data: {
        productId: id,
        productLocation: location,
        description: description,
        newNumber: number
      }
    }).then((res) => {
      that.setData({
        reportModal: false
      }, () => {
        that.showModal('♪(๑^∇^๑)', reportType ? '报溢成功' : '报损成功');
        that.search();
      });
    }, (error) => {
      that.setData({
        reportModal: false
      }, () => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      });
    });
  },
  // 检测描述信息
  checkDescription: function(description) {
    if (description === '') {
      return '描述信息不能为空';
    }
    return '';
  },
  // 检测真实数量
  checkNumber: function(number, oldNumber, reportType) {
    let regNumber = /^\d+$/;
    if (number === '') {
      return '真实数量不能为空';
    }
    if (!regNumber.test(number)) {
      return '真实数量应为非负整数';
    }
    number = parseInt(number);
    oldNumber = parseInt(oldNumber);
    reportType = parseInt(reportType);
    if (reportType) {
      // 如果是报溢
      if (number <= oldNumber) {
        return '报溢时真实数量必须大于库存数量';
      }
    } else {
      // 如果是报损
      if (number >= oldNumber) {
        return '报损时真实数量必须小于库存数量';
      }
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