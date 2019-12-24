// pages/createProduct/createProduct.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入相关
    productName: '',
    productNameError: '',
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

  // 格式化 properties 成为界面可接受的类型
  formatProperties: function(properties = []) {
    let res = [];
    for (let i = 0; i < properties.length; i++) {
      res.push({
        label: properties[i],
        value: '',
        error: ''
      });
    }
    return res;
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

  // 提交创建
  submitCreate: function() {
    let that = this;
    let {
      productName,
      inputList
    } = this.data;
    if (!this.checkForm(productName, inputList)) {
      return;
    }
    wxRequest({
      url: '/goods/product/product',
      method: 'POST',
      data: {
        goodsId: 4,
        name: productName,
        propertiesValue: that.formatPropertiesValue(inputList)
      }
    }).then((res) => {
      that.showModal('♪(๑^∇^๑)', '创建成功');
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message)
    });
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
    let that = this;
    let id = options.id;
    this.setData({
      goodsId: id
    }, () => {
      wxRequest({
        url: '/goods/goods/goods',
        method: 'GET',
        data: {
          goodsId: id
        }
      }).then((res) => {
        let {
          result
        } = res;
        let formatProperties = that.formatProperties(result.properties);
        that.setData({
          inputList: formatProperties
        })
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      })
    });
  },

})