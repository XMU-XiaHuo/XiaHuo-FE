// pages/createWarehouse2/createWarehouse2.js
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
      name: '谭源杰的仓库',
      address: '厦门市思明区海韵学生公寓海韵二',
      info: '这是一个学生创建的仓库，仓库内有日用品如牙刷、牙膏、毛巾，同时还有水果如苹果、香蕉、梨'
    },
    errorInfo: {
      nameError: '',
      addressError: '',
      infoError: ''
    },

    // 省市区
    areaList: [],
    areaLoading: false,
    areaHidden: true,
    areaInfo: {
      province: "",
      city: "",
      area: "",
      areaStr: ""
    },

    // 错误 modal
    modalVisible: false,
    errorTitle: '出错了๑Ծ‸Ծ๑',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确定',
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
    let regName = /^[\u4e00-\u9fa5]{2,15}$/;
    if (!regName.test(name)) {
      return '仓库名格式错误（应为 2 - 15 个汉字）';
    }
    return '';
  },
  checkAddress: function(address) {
    if (!address || address.length === 0) {
      return '具体地址不能为空';
    }
    return '';
  },
  checkInfo: function(info) {
    if (!info || info.length === 0) {
      return '仓库简介不能为空';
    }
    return '';
  },
  checkArea: function(areaInfo) {
    if (!areaInfo['areaStr'] || areaInfo['areaStr'].length === 0) {
      return '请填写仓库位置';
    }
    return '';
  },

  // 创建仓库
  createWarehouse: function(name, address, info, areaInfo) {
    return new Promise((resolve, reject) => {
      wxRequest({
        url: '/user/warehouse/warehouse',
        method: 'POST',
        data: {
          warehouseName: name,
          warehousePosition: address,
          warehouseIntro: info,
          province: areaInfo.province,
          city: areaInfo.city,
          area: areaInfo.area
        }
      }).then((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  },
  // 下一步
  nextStep: function() {
    let {
      warehouseInfo,
      areaInfo
    } = this.data;
    let {
      name,
      address,
      info
    } = warehouseInfo;

    // 检测仓库名
    let checkNameResult = this.checkName(name);
    // 检测仓库地址
    let checkAddressResult = this.checkAddress(address);
    // 检测仓库简介
    let checkInfoResult = this.checkInfo(info);
    // 设置错误信息
    this.setData({
      ['errorInfo.nameError']: checkNameResult,
      ['errorInfo.addressError']: checkAddressResult,
      ['errorInfo.infoError']: checkInfoResult
    });

    let checkAreaResult = this.checkArea(areaInfo);
    if (checkAreaResult.length > 0) {
      this.showModal(checkAreaResult);
      return;
    }

    // 如果有错，不执行下面的步骤
    if (checkNameResult.length > 0 || checkAddressResult.length > 0 || checkInfoResult.length > 0) {
      return;
    }

    // 创建仓库
    this.createWarehouse(name, address, info, areaInfo).then((res) => {
      // 跳转到成功页面
      wx.navigateTo({
        url: '../createWarehouse3/createWarehouse3'
      })
    }, (error) => {
      // 展示错误 modal
      this.showModal(error.message);
    });
  },
  // 展示错误 modal
  showModal: function(errorMsg) {
    let that = this;
    this.setData({
      errorMsg: errorMsg || '未知的错误'
    }, () => {
      that.setData({
        modalVisible: true
      })
    });
  },
  // 错误 modal 的交互
  clickModal() {
    this.setData({
      modalVisible: false
    })
  },

  // 显示地址选择器
  chooseArea: function() {
    this.setData({
      areaHidden: false
    })
  },
  // 隐藏地址选择器
  hideAreaPicker: function() {
    this.setData({
      areaHidden: true
    })
  },
  // 确认地址选择
  confirmAreaPick: function(e) {
    let {
      values
    } = e.detail;
    this.setData({
      areaInfo: {
        province: values[0].name,
        city: values[1].name,
        area: values[2].name,
        areaStr: `${values[0].name}-${values[1].name}-${values[2].name}`
      },
      areaHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      areaLoading: true
    })
    let areaList = wx.getStorageSync('areaList');
    if (!areaList) {
      const AreaList = require('../../data/area.js');
      wx.setStorageSync('areaList', AreaList);
      areaList = AreaList;
    }
    this.setData({
      areaList: areaList.default
    }, () => {
      that.setData({
        areaLoading: false,
      })
    });
  },
})