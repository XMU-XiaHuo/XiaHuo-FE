// pages/chooseDelivery/chooseDelivery.js
const app = getApp();
const fs = wx.getFileSystemManager();
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
    deliveryList: [],

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wxRequest({
      url: '/picking-orders/print/wayBillList',
      method: 'GET'
    }).then((res) => {
      let deliveryList = res.result.map((value) => {
        return {
          'title': value,
          'switch': false
        }
      })
      that.setData({
        deliveryList: deliveryList
      })
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      that.setData({
        loading: false
      })
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.removeStorageSync('orderIdList');
  },

  onSwitchChange(e) {
    let {
      index
    } = e.currentTarget.dataset;
    let {
      value
    } = e.detail;
    let {
      deliveryList
    } = this.data;
    if (value) { // 如果是开开关
      for (let i = 0; i < deliveryList.length; i++) {
        deliveryList[i].switch = index === i ? true : false;
      }
      this.setData({
        deliveryList: deliveryList
      })
    } else { // 否则，正常勾选
      this.setData({
        ['deliveryList[' + index + '].switch']: e.detail.value
      })
    }
  },

  nextStep: function() {
    let that = this;
    let {
      deliveryList
    } = this.data;
    let deliveryName = '';
    for (let i = 0; i < deliveryList.length; i++) {
      if (deliveryList[i].switch === true) {
        deliveryName = deliveryList[i].title;
      }
    }
    if (deliveryName === '') {
      that.showModal('๑Ծ‸Ծ๑', '请选择一家快递商');
      return;
    }
    let orderIdList = wx.getStorageSync('orderIdList');
    wxRequest({
      url: '/picking-orders/print/wayBillPrint',
      method: 'POST',
      data: {
        courierWay: deliveryName,
        orderIdList: orderIdList
      },
      isFile: true
    }).then((res) => {
      console.log(`${wx.env.USER_DATA_PATH}/3.doc`)
      fs.writeFileSync(`${wx.env.USER_DATA_PATH}/3.doc`, res, 'utf-8');
      wx.openDocument({
        filePath: `${wx.env.USER_DATA_PATH}/3.doc`,
        fileType: 'doc',
        success: function(res) {
          console.log('打开文档成功');
        },
        fail: function(error) {
          console.log(error);
        }
      })
      // wx.downloadFile({
      //   url: `${wx.env.USER_DATA_PATH}/3.doc`,
      //   success: function(res) {
      //     if (res.statusCode === 200) {

      //     }
      //   },
      //   fail: function(error) {
      //     console.log(error);
      //   }
      // })
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
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
})