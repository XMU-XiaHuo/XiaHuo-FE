// pages/warehouseInfoManage/warehouseInfoManage.js
const app = getApp();
const {
  wxRequest
} = app.Request;
const {
  checkName,
  checkAddress,
  checkInfo,
  checkArea,
  checkSenderName,
  checkSenderPhone,
  checkCompany,
  checkError
} = require('../../utils/formCheck.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseInfo: {
      name: '',
      address: '',
      info: '',
      senderName: '',
      senderPhone: '',
      companyName: ''
    },
    errorInfo: {
      nameError: '',
      addressError: '',
      infoError: '',
      senderNameError: '',
      senderPhoneError: '',
      companyNameError: ''
    },

    // 省市区选择相关
    areaList: [],
    areaLoading: false,
    areaHidden: true,
    areaInfo: {
      province: "",
      city: "",
      area: "",
      areaStr: ""
    },

    // 错误 modal 相关
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
  // 保存
  save: function() {
    let {
      warehouseInfo,
      areaInfo
    } = this.data;
    let {
      name,
      address,
      info,
      senderName,
      senderPhone,
      companyName
    } = warehouseInfo;

    // 检测仓库名
    let checkNameResult = checkName(name);
    // 检测仓库地址
    let checkAddressResult = checkAddress(address);
    // 检测仓库简介
    let checkInfoResult = checkInfo(info);
    // 检测寄件人名
    let checkSenderNameResult = checkSenderName(senderName);
    // 检测寄件人电话
    let checkSenderPhoneResult = checkSenderPhone(senderPhone);
    // 检测公司名
    let checkCompanyResult = checkCompany(companyName);
    let errorInfo = {
      nameError: checkNameResult,
      addressError: checkAddressResult,
      infoError: checkInfoResult,
      senderNameError: checkSenderNameResult,
      senderPhoneError: checkSenderPhoneResult,
      companyNameError: checkCompanyResult
    }

    // 设置错误信息
    this.setData({
      errorInfo
    });

    let checkAreaResult = checkArea(areaInfo);
    if (checkAreaResult.length > 0) {
      this.showModal('๑Ծ‸Ծ๑', checkAreaResult);
      return;
    }

    // 如果有错，不执行下面的步骤
    if (checkError(errorInfo)) {
      return;
    }

    // 请求后台
    this.editWarehouseInfo(name, address, info, senderName, senderPhone, companyName, areaInfo).then((res) => {
      this.showModal('♪(๑^∇^๑)', '保存成功');
    }, (error) => {
      // 展示错误 modal
      this.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },
  // 修改仓库信息-接口
  editWarehouseInfo: function(name, address, info, senderName, senderPhone, companyName, areaInfo) {
    return wxRequest({
      url: '/user/warehouse/warehouse',
      method: 'PUT',
      data: {
        warehouseName: name,
        warehousePosition: address,
        warehouseIntro: info,
        province: areaInfo.province,
        city: areaInfo.city,
        area: areaInfo.area,
        senderName: senderName,
        senderPhone: senderPhone,
        companyName: companyName
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
      warehouseIntro,
      senderName,
      senderPhone,
      companyName,
      area,
      city,
      province,
    } = result;
    this.setData({
      warehouseInfo: {
        name: warehouseName,
        address: warehousePosition,
        info: warehouseIntro,
        senderName,
        senderPhone,
        companyName
      },
      areaInfo: {
        province: province,
        city: city,
        area: area,
        areaStr: `${province}-${city}-${area}`
      }
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
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
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