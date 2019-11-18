// pages/mainPage/mainPage.js

const imgPath = '../../components/top-menu'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routeList: [{
        title: '仓库信息管理',
        url: '../warehouseInfoManage/warehouseInfoManage',
        icon: imgPath + '/image/warehouse.png'
      },
      {
        title: '权限管理',
        url: '../authorityManage/authorityManage',
        icon: imgPath + '/image/quanxian.png'
      },
      {
        title: '商品管理',
        url: '../index/index',
        icon: imgPath + '/image/goods.png'
      },
      {
        title: '商品入库',
        url: '../index/index',
        icon: imgPath + '/image/ruku.png'
      },
      {
        title: '拣货',
        url: '../index/index',
        icon: imgPath + '/image/pick.png'
      },
      {
        title: '退换货',
        url: '../index/index',
        icon: imgPath + '/image/tuihuo.png'
      },
      {
        title: '仓储盘点',
        url: '../index/index',
        icon: imgPath + '/image/store.png'
      },
      {
        title: '查看报表',
        url: '../index/index',
        icon: imgPath + '/image/baobiao.png'
      },
      {
        title: '报损',
        url: '../index/index',
        icon: imgPath + '/image/baosun.png'
      },
      {
        title: '报溢',
        url: '../index/index',
        icon: imgPath + '/image/baoyi.png'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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