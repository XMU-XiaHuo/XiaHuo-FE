// pages/goodsManage/goodsManage.js
const app = getApp();
const {
  wxRequest
} = app.Request;

const pageLimit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索相关
    goodsName: '',
    isSearching: false,
    hasResult: true,

    // 删除相关
    actionSheetVisible: false,
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],

    // 页面滚动相关
    isPageScroll: false,
    scrollTop: 0,

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],

    // 商品数据相关
    page: 1,
    loading: true

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
  // 打开删除确认框
  openDeleteAction() {
    this.setData({
      actionSheetVisible: true
    });
  },
  // 取消删除确认框
  cancelDelete() {
    this.setData({
      actionSheetVisible: false
    });
  },

  // 创建商品跳转
  createGoods: function() {
    wx.navigateTo({
      url: '../createGoods/createGoods'
    })
  },

  // 获取商品列表-接口
  getGoodsList: function() {
    let page = this.data.page;
    let that = this;

    that.setData({
      loading: true
    }, () => {
      wxRequest({
        url: '/goods/goods/goodsList',
        method: 'GET',
        data: {
          page: page,
          pageLimit: pageLimit
        }
      }).then((res) => {
        console.log(res);
        that.setData({
          page: page + 1,
          loading: false
        })
      }, (error) => {
        that.showModal('๑Ծ‸Ծ๑', error.message);
      });
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
    this.getGoodsList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉触底
   */
  onReachBottom: function() {
    let that = this;
    this.getGoodsList();
  }

})