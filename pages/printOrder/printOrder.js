// pages/printOrder/printOrder.js
const app = getApp();
const {
  wxRequest
} = app.Request;
const fs = wx.getFileSystemManager();

const {
  randomString
} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    loadingText: '生成快递单中..',
    fileName: '',

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  printOrder: function(deliveryName) {
    let orderIdList = wx.getStorageSync('orderIdList');
    let that = this;
    wxRequest({
      url: '/picking-orders/print/wayBillPrint',
      method: 'POST',
      data: {
        courierWay: deliveryName,
        orderIdList: orderIdList
      },
      isFile: true
    }).then((res) => {
      that.setData({
        loadingText: '下载快递单中..'
      });
      if (res.message) {
        that.showModal('出错了๑Ծ‸Ծ๑', res.message);
        that.setData({
          loadingText: '下载快递单出错'
        });
        return;
      }
      let fileName = randomString();
      fs.writeFile({
        filePath: `${wx.env.USER_DATA_PATH}/${fileName}.html`,
        data: res,
        encoding: 'utf-8',
        success() {
          that.setData({
            loading: false,
            fileName: fileName + '.html'
          });
        },
        fail(error) {
          console.log(error);
        }
      });
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },

  writeFile: function(){
    fs.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/订单信息.html`,
      data: res,
      encoding: 'utf-8',
      success() {
        that.setData({
          loading: false
        });
      },
      fail(error) {
        console.log(error);
      }
    });
  },

  openOrder: function() {
    let that = this;
    console.log(`${wx.env.USER_DATA_PATH}/order.docx`)
    wx.openDocument({
      filePath: `${wx.env.USER_DATA_PATH}/order.docx`,
      fileType: 'docx',
      success: function(res) {
        console.log('打开文件成功');
      },
      fail: function(error) {
        console.log(error);
        that.showModal('出错了๑Ծ‸Ծ๑', '打开文件失败')
      }
    });
  },

  backToOrderList: function() {
    wx.removeStorageSync('orderIdList');
    wx.reLaunch({
      url: '../orderList/orderList',
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
    let {
      deliveryName
    } = options;
    this.printOrder(deliveryName);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
})