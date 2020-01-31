// pages/pick/pick.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMenuTitle: '拣货',

    loading: false,
    loadingText: '',
    isScan: false,
    pickOrder: {},
    dataShow: false,

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },
  // 扫描二维码
  scan: function() {
    let that = this;
    this.setData({
      loading: true,
      loadingText: '加载扫码中..',
      isScan: true,
    }, () => {
      wx.scanCode({
        success(res) {
          let {
            result
          } = res;
          that.setData({
            loading: true,
            loadingText: '加载拣货单中..',
          }, () => {
            wxRequest({
              url: '/picking-orders/picking/pickingOrder',
              method: 'POST',
              data: {
                jsonString: result
              }
            }).then((res) => {
              that.setData({
                pickOrder: res.result,
                loading: false,
                dataShow: true,
                topMenuTitle: '拣货单详情'
              });
              console.log(res.result);
            }, (error) => {
              that.showModal('出错了๑Ծ‸Ծ๑', error.message);
            });
          })
        },
        fail() {
          that.setData({
            loadingText: '๑Ծ‸Ծ๑微信扫码出错'
          })
        }
      })
    })
  },
  // 执行拣货动作
  pickOperation: function(e) {
    let that = this;
    let {
      value
    } = e.target.dataset;
    let {
      pickOrder
    } = this.data;
    wxRequest({
      url: '/picking-orders/picking/pickOperation',
      method: 'POST',
      data: {
        operateType: parseInt(value),
        pickingId: pickOrder.id,
        pickingType: pickOrder.pickingType
      }
    }).then((res) => {
      console.log(res);
      that.showModal('♪(๑^∇^๑)', '操作成功');
      wx.reLaunch({
        url: '../pick/pick',
      });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})