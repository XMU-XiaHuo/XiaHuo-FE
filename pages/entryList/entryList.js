// pages/log/pages/entryList/entryList.js
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
    // 数据相关
    page: 1,
    entryList: [],
    hasResult: true,
    loading: true,
    noMore: false,

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],

  },

  // 展示错误 modal
  showModal: function (title = '', msg = '发生了未知的错误') {
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
  // 获取商品列表-接口
  getEntryList: function () {
    let that = this;
    let {
      page,
      entryList    } = this.data;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wxRequest({
      url: '/storage-location/entryList',
      method: 'GET',
      data: {
        page: 1,
        pageLimit: 20
      }
    }).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
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