// pages/mainPage/mainPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
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
        url: '../index/index',
        icon: 'image/goods.png'
      },
      {
        title: '商品入库',
        url: '../index/index',
        icon: 'image/ruku.png'
      },
      {
        title: '拣货',
        url: '../pick/pick',
        icon: 'image/pick.png'
      },
      {
        title: '退换货',
        url: '../index/index',
        icon: 'image/tuihuo.png'
      },
      {
        title: '仓储盘点',
        url: '../index/index',
        icon: 'image/store.png'
      },
      {
        title: '查看报表',
        url: '../index/index',
        icon: 'image/baobiao.png'
      },
      {
        title: '报损',
        url: '../index/index',
        icon: 'image/baosun.png'
      },
      {
        title: '报溢',
        url: '../index/index',
        icon: 'image/baoyi.png'
      }
    ]
  },

  navigateTo: function(e) {
    let {
      url
    } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      app.eventEmitter.on('getUserInfo', (res) => {
        this.setData({
          userInfo: res.userInfo
        })
      })
    };
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