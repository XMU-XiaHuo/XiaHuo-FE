// pages/editProduct/editProduct.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: null,
    productId: null,
    productName: '',
    inputList: [],

    // modal 相关
    modalVisible: false,
    errorTitle: '',
    errorMsg: '',
    modalButtons: [{
      color: '#409eff',
      name: '确认',
    }]
  },

  // 处理输入事件
  inputEventCatcher: function(e) {
    let {
      index
    } = e.target.dataset;
    this.setData({
      ['inputList[' + index + '].value']: e.detail
    })
  },
  inputProductName: function(e) {
    this.setData({
      productName: e.detail
    })
  },

  // 检查表单
  checkForm: function(productName, propertyList) {
    let hasError = false;
    if (!productName || productName.length === '') {
      this.setData({
        productNameError: '产品名不能为空'
      });
      hasError = true;
    } else {
      this.setData({
        productNameError: ''
      });
    }
    for (let i = 0; i < propertyList.length; i++) {
      let property = propertyList[i];
      if (!property.value || property === '') {
        property.error = property.label + '不能为空';
        hasError = true;
      } else {
        property.error = '';
      }
    }
    this.setData({
      inputList: propertyList
    });
    return !hasError;
  },

  // 格式化 properties 成为后端可接受的类型
  formatPropertiesValue(inputList) {
    let obj = {};
    inputList.forEach((item) => {
      obj[item.label] = item.value;
    });
    return obj;
  },

  // 提交编辑
  submitEdit: function() {
    let that = this;
    let {
      productName,
      inputList,
      goodsId,
      productId
    } = this.data;
    if (!this.checkForm(productName, inputList)) {
      return;
    }
    wxRequest({
      url: '/goods/product/product',
      method: 'PUT',
      data: {
        goodsId: goodsId,
        id: productId,
        name: productName,
        decription: null,
        propertiesValue: that.formatPropertiesValue(inputList)
      }
    }).then((res) => {
      that.showModal('♪(๑^∇^๑)', '修改成功');
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message)
    });
  },

  // 格式化 properties 成为界面可接受的类型
  formatProperties: function(properties = {}) {
    let res = [];
    Object.keys(properties).forEach((key) => {
      res.push({
        label: key,
        value: properties[key],
        error: ''
      });
    });
    return res;
  },

  // 展示 modal
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let product = wx.getStorageSync('product');
    let {
      goodsId,
      propertiesValue,
      name,
      id
    } = product;
    let formatProperties = this.formatProperties(propertiesValue);
    this.setData({
      productName: name,
      goodsId: goodsId,
      productId: id,
      inputList: formatProperties
    });
    console.log(product);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.removeStorageSync('product');
  },
})