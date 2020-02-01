// pages/mainPage/mainPage.js
const app = getApp();
const {
  wxRequest
} = app.Request;
const {
  Routes
} = require('../../data/route.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userName: '',
    warehouseName: '厦货',
    roleList: [],
    userInfoLoading: true,
    routeList: Routes
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
  // 获取仓库信息-接口
  getWarehouseInfo: function() {
    return wxRequest({
      url: '/user/warehouse/warehouse',
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
        console.log(res);
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
    let userName = wx.getStorageSync('userName');
    let warehouseName = wx.getStorageSync('warehouseName');
    if (userName === "") {
      this.getUserInfo().then(({
        result
      }) => {
        wx.setStorageSync("userName", result.name);
        that.setData({
          userName: result.name,
        })
      })
    } else {
      that.setData({
        userName: userName,
      })
    }
    if (warehouseName === "") {
      this.getWarehouseInfo().then(({
        result
      }) => {
        wx.setStorageSync("warehouseName", result.warehouseName)
        that.setData({
          warehouseName: result.warehouseName
        })
      })
    } else {
      that.setData({
        warehouseName: warehouseName
      })
    }
    this.getPermissionInfo().then(({
      result
    }) => {
      that.setData({
        roleList: result,
        userInfoLoading: false
      })
    });
  },

})