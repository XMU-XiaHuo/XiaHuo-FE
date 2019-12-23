// components/top-menu/top-menu.js
const app = getApp();

const {
  Routes
} = require('../../data/route.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '页面标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    sideBarHidden: true,
    maskHidden: true,
    routeList: Routes
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSideBar() {
      this.setData({
        sideBarHidden: !this.data.sideBarHidden,
        maskHidden: !this.data.maskHidden
      });
    },
    exit: function() {
      wx.navigateTo({
        url: '../index/index'
      })
    },
  },

  lifetimes: {
    
  },
})