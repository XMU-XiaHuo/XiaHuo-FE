// pages/goodsManage/goodsManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName: '',
    isSearching: false,
    hasResult: true,
    actionSheetVisible: false,
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],
    isPageScroll: false,
    scrollTop: 0

  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = key;
    this.setData({
      [modifyKey]: e.detail
    })
  },

  search: function() {
    console.log(this.data.goodsName);
    this.setData({
      isSearching: true
    });

    setTimeout(() => {
      this.setData({
        isSearching: false
      })
    }, 1000);
  },

  openDeleteAction() {
    this.setData({
      actionSheetVisible: true
    });
  },

  // 查看商品详情
  jumpToInfoPage: function() {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail'
    })
  },

  // 删除商品相关
  handleDelete() {
    const action = [...this.data.deleteAction];
    action[0].loading = true;

    this.setData({
      deleteAction: action
    });

    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        actionSheetVisible: false,
        deleteAction: action
      });
    }, 2000);
  },

  handleCancel() {
    this.setData({
      actionSheetVisible: false
    });
  },

  /**
   * 生命周期函数--监听页面滚动
   */
  onPageScroll: function(ev) {
    let _this = this;
    let {
      windowHeight
    } = wx.getSystemInfoSync();

    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == windowHeight) {
      // 向下滚动
      if (this.data.isPageScroll === false) {
        this.setData({
          isPageScroll: true
        })
      }
    } else {
      // 向上滚动
      if (this.data.isPageScroll === true) {
        this.setData({
          isPageScroll: false
        })
      }
    }
    // 给scrollTop重新赋值
    setTimeout(function() {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0);
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