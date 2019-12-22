// pages/warehouseInfoManage/warehouseInfoManage.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseInfo: {
      name: '',
      address: '',
      info: ''
    },
    errorInfo: {
      nameError: '',
      addressError: '',
      infoError: ''
    },
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }],
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      key
    } = e.target.dataset;
    let modifyKey = 'warehouseInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },
  checkName: function(name) {
    if (!name || name.length < 2) {
      return '仓库名格式错误（应为 2 - 15 个汉字）';
    }
    return '';
  },
  checkAddress: function(address) {
    if (!address) {
      return '仓库地址不能为空';
    }
    return '';
  },
  checkInfo: function(info) {
    if (!info) {
      return '仓库简介不能为空';
    }
    return '';
  },
  // 保存
  save: function() {
    let {
      name,
      address,
      info
    } = this.data.warehouseInfo;

    // 检测仓库名
    let checkNameResult = this.checkName(name);
    this.setData({
      ['errorInfo.nameError']: checkNameResult
    });
    // 检测仓库地址
    let checkAddressResult = this.checkAddress(address);
    this.setData({
      ['errorInfo.addressError']: checkAddressResult
    });
    // 检测仓库简介
    let checkInfoResult = this.checkInfo(info);
    this.setData({
      ['errorInfo.infoError']: checkInfoResult
    });
    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkAddressResult.length > 0 || checkInfoResult.length > 0) {
      return;
    }

    // 请求后台
    this.editWarehouseInfo(name, address, info).then((res) => {
      this.showModal('♪(๑^∇^๑)', '保存成功');
    }, (error) => {
      // 展示错误 modal
      this.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },
  // 修改仓库信息-接口
  editWarehouseInfo: function(name, address, info) {
    return wxRequest({
      url: '/user/warehouse/warehouse',
      method: 'PUT',
      data: {
        warehouseName: name,
        warehouseIntro: address,
        warehousePosition: info
      }
    });
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

  // 获取仓库信息-接口
  getWarehouseInfo: function() {
    return wxRequest({
      url: '/user/warehouse/warehouse',
      method: 'GET'
    });
  },

  // 初始化仓库信息
  initWarehouseInfo: function(result) {
    let {
      warehouseName,
      warehousePosition,
      warehouseIntro
    } = result;
    this.setData({
      warehouseInfo: {
        name: warehouseName,
        address: warehousePosition,
        info: warehouseIntro
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.getWarehouseInfo().then((res) => {
      that.initWarehouseInfo(res.result);
    }, (error) => {
      that.showModal('๑Ծ‸Ծ๑', error.message);
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