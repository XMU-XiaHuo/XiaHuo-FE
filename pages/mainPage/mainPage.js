// pages/mainPage/mainPage.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userInfoLoading: true,
    routeList: [{
        title: '个人信息管理',
        url: '../personInfoManage/personInfoManage',
        icon: 'image/info.png'
      },
      {
        title: '仓库信息管理',
        url: '../warehouseInfoManage/warehouseInfoManage',
        icon: 'image/warehouse.png'
      },
      {
        title: '权限管理',
        url: '../authorityManage/authorityManage',
        icon: 'image/quanxian.png'
      },
      {
        title: '商品管理',
        url: '../goodsManage/goodsManage',
        icon: 'image/goods.png'
      },
      {
        title: '商品入库',
        url: '../enterWarehouse/enterWarehouse',
        icon: 'image/ruku.png'
      },
      {
        title: '拣货',
        url: '../pick/pick',
        icon: 'image/pick.png'
      },
      {
        title: '退换货',
        url: '../mainPage/mainPage',
        icon: 'image/tuihuo.png'
      },
      {
        title: '仓储盘点',
        url: '../stockCheck/stockCheck',
        icon: 'image/store.png'
      },
      {
        title: '查看日志',
        url: '../mainPage/mainPage',
        icon: 'image/log.png'
      }
      // {
      //   title: '报损',
      //   url: '../reportDamage/reportDamage',
      //   icon: 'image/baosun.png'
      // },
      // {
      //   title: '报溢',
      //   url: '../index/index',
      //   icon: 'image/baoyi.png'
      // }
    ]
  },

  // 获取仓库信息
  getBaseInfo: function(code) {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/warehouse/warehouse',
        method: 'GET'
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },

  navigateTo: function(e) {
    let {
      url
    } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },

  getWxUserInfo: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userInfoLoading: false
      });
    } else {
      app.eventEmitter.on('getUserInfo', (res) => {
        this.setData({
          userInfo: res.userInfo,
          userInfoLoading: false
        })
      })
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBaseInfo().then((res) => {
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})