// pages/authorityManage/authorityManage.js
const app = getApp();
const {
  wxRequest
} = app.Request;

const {
  Roles,
  Description
} = require('../../data/role.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 成员列表展示相关
    loading: true,
    members: [],

    // 删除相关
    actionSheetVisible: false,
    deleteAction: [{
      name: '删除',
      color: '#ed3f14'
    }],
    deleteMemberId: null,
    deleteMemberIndex: null,

    // 邀请新成员相关
    isPageScroll: false,
    scrollTop: 0,

    // 报错 modal 相关
    modalVisible: false,
    errorTitle: '๑Ծ‸Ծ๑',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  // 编辑相关
  jumpToEditPage: function() {
    wx.navigateTo({
      url: '../authorityManagePerson/authorityManagePerson'
    })
  },

  // 删除成员
  openDeleteAction(e) {
    let {
      id,
      index
    } = e.target.dataset;
    this.setData({
      actionSheetVisible: true,
      deleteMemberId: id,
      deleteMemberIndex: index,
    });
  },

  // 确认删除
  handleDelete() {
    let that = this;
    let {
      deleteMemberId, 
      deleteMemberIndex,
      members
    } = this.data;
    // 设置 loading
    const action = [...this.data.deleteAction];
    action[0].loading = true;
    this.setData({
      deleteAction: action
    }, () => {
      wxRequest({
        url: '/user/user/member?memberId=' + deleteMemberId,
        method: 'DELETE',
      }).then((res) => {
        members.splice(deleteMemberIndex, 1);
        action[0].loading = false;
        that.setData({
          actionSheetVisible: false,
          deleteAction: action,
          memberList: memberList
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

  // 取消删除
  handleCancel() {
    this.setData({
      actionSheetVisible: false
    });
  },

  // 获取成员列表-接口
  getMemberInfo: function() {
    return wxRequest({
      url: '/user/user/members',
      method: 'GET'
    });
  },

  // 删除成员-接口
  deleteMember: function() {
    return wxRequest({
      url: '/user/user/member',
      method: 'DELETE'
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

  // 展示错误 modal
  showModal: function(errorMsg = '发生了未知的错误') {
    let that = this;
    this.setData({
      errorMsg: errorMsg
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.getMemberInfo().then((res) => {
      that.setData({
        members: res.result,
        loading: false
      })
    }, (error) => {
      that.showModal(error.message);
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