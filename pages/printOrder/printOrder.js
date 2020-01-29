// pages/printOrder/printOrder.js
const app = getApp();
const {
  wxRequest
} = app.Request;
const fs = wx.getFileSystemManager();

const {
  randomString,
  formatTime
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
      let date = new Date();
      let fileName = randomString(date);
      fs.writeFile({
        filePath: `${wx.env.USER_DATA_PATH}/${fileName}.html`,
        data: res,
        encoding: 'utf-8',
        success() {
          let logContent = `${formatTime(date)} 写入文件 （./${fileName}.html），所选快递为${deliveryName}\n`;
          that.writeLog({
            filePath: `${wx.env.USER_DATA_PATH}/log.doc`,
            content: logContent,
            successCbk() {
              that.setData({
                loading: false,
                fileName: fileName + '.html'
              });
            }
          })
        },
        fail(error) {
          console.log(error);
        }
      });
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },

  writeLog: function({
    filePath,
    content,
    successCbk
  }) {
    fs.stat({
      path: filePath,
      success(res) {
        fs.appendFile({
          filePath: filePath,
          data: content,
          encoding: 'utf-8',
          success(res) {
            successCbk(res);
          },
          fail(error) {
            console.log(error);
            that.showModal('出错了๑Ծ‸Ծ๑', error.errorMsg);
          }
        });
      },
      fail(error) {
        fs.writeFile({
          filePath: filePath,
          data: `此为日志文件，所有快递单可在同级文件夹下找到。\n${content}`,
          encoding: 'utf-8',
          success(res) {
            successCbk(res);
          },
          fail(error) {
            console.log(error);
            that.showModal('出错了๑Ծ‸Ծ๑', error.errorMsg);
          }
        });
      }
    });
  },

  openOrder: function() {
    let that = this;
    wx.openDocument({
      filePath: `${wx.env.USER_DATA_PATH}/log.doc`,
      fileType: 'doc',
      success: function(res) {

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