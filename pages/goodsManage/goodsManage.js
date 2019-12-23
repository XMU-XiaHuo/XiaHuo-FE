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
    deleteGoodsId: null,
    deleteGoodsIndex: null,

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
    loading: true,
    noMore: false,
    goodsList: []

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
  // 搜索商品
  search: function() {
    let that = this;
    let {
      goodsName
    } = this.data;
    this.setData({
      loading: true,
      isSearching: goodsName !== ""
    }, () => {
      wxRequest({
        url: '/goods/goods/searchGoods',
        method: 'GET',
        data: {
          goodsName: goodsName
        }
      }).then((res) => {
        let {
          result
        } = res;
        if (!result || result.length === 0) {
          that.setData({
            hasResult: false,
            noMore: false
          });
        }
        that.setData({
          loading: false,
          goodsList: result,
          noMore: true
        })
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      });
    });

  },
  // 查看商品详情
  jumpToInfoPage: function(e) {
    let {
      id
    } = e.target.dataset;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + id
    })
  },
  // 删除商品相关
  handleDelete() {
    let that = this;
    let {
      deleteGoodsId,
      deleteGoodsIndex,
      goodsList
    } = this.data;
    // 设置 loading
    const action = [...this.data.deleteAction];
    action[0].loading = true;
    this.setData({
      deleteAction: action
    }, () => {
      wxRequest({
        url: '/goods/goods/goods?goodsId=' + deleteGoodsId,
        method: 'DELETE',
      }).then((res) => {
        goodsList.splice(deleteGoodsIndex,1);
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action,
          goodsList: goodsList
        });
        that.showModal('♪(๑^∇^๑)', '删除成功~');
      }, (error) => {
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action
        });
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      });
    });
  },
  // 打开删除确认框
  openDeleteAction(e) {
    let {
      id,
      index
    } = e.target.dataset;
    this.setData({
      actionSheetVisible: true,
      deleteGoodsId: id,
      deleteGoodsIndex: index
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
    let {
      page,
      goodsList
    } = this.data;
    let that = this;
    let noMore = false;

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
        let {
          result
        } = res;
        let {
          goodsInfoVOS
        } = result;
        if (result.goodsInfoVOS.length < pageLimit) {
          noMore = true;
        }
        that.setData({
          page: page + 1,
          loading: false,
          noMore: noMore,
          goodsList: goodsList.concat(goodsInfoVOS)
        });
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
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
    let {
      noMore,
      isSearching
    } = this.data;
    if (!noMore && !isSearching) {
      this.getGoodsList();
    }
  }

})