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
    loadingText: '加载成员中...',
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
    canShare: true,
    shareCode: '',

    // 报错 modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  // 编辑相关
  jumpToEditPage: function(e) {
    let {
      item
    } = e.target.dataset;
    wx.setStorageSync('roles', item.roles);
    wx.navigateTo({
      url: '../authorityManagePerson/authorityManagePerson?id=' + item.userId
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
          members: members
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
  cancelDelete() {
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
  showModal: function(errorTitle = '', errorMsg = '发生了未知的错误') {
    let that = this;
    this.setData({
      errorTitle: errorTitle,
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
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      that.setData({
        loading: false
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    wxRequest({
      url: '/user/user/inviteUrl',
      method: 'GET'
    }).then((res) => {
      that.setData({
        shareCode: res.result,
        canShare: true
      });
    }, (error) => {
      that.setData({
        canShare: false
      });
    });
  },


  /**
   * 生命周期函数--监听页面转发
   */
  onShareAppMessage: function(options) {
    let {
      shareCode
    } = this.data;
    return {
      title: '测试',
      path: '/pages/invited/invited?inviteCode=' + shareCode,
      imageUrl: 'image/warehouse.png'
    }
  }

})