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
    userName: '',
    roleList: [],
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
    ]
  },

  // 跳转
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

  // 获取权限信息-接口
  getPermissionInfo: function(code) {
    return wxRequest({
      url: '/user/user/permissions',
      method: 'GET'
    });
  },

  // 获取个人信息-接口
  getUserInfo: function() {
    return wxRequest({
      url: '/user/user/info',
      method: 'GET'
    });
  },

  // 获取微信头像
  getWxUserInfo: function() {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.getWxUserInfo();
    Promise.all([this.getPermissionInfo(), this.getUserInfo()]).then((resList) => {
      let permissionRes = resList[0].result;
      let userRes = resList[1].result;
      that.setData({
        userName: userRes.name,
        roleList: permissionRes,
        userInfoLoading: false
      })
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