// pages/createGoods/createGoods.js
const app = getApp();
const {
  wxRequest
} = app.Request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {
      name: '测试商品',
      description: '测试商品的描述',
      unit: '个',
      expireDate: '365',
      properties: ['尺码', '颜色', '版本', '长度']
    },
    errorInfo: {
      nameError: '',
      descriptionError: '',
      unitError: '',
      expireDateError: ''
    },

    // 新建属性相关
    newProperty: '',
    newPropertyError: '',
    createModalVisible: false,

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
      key,
      object
    } = e.target.dataset;
    let modifyKey = key;
    if (object) {
      modifyKey = object + '.' + key;
    }
    this.setData({
      [modifyKey]: e.detail
    })
  },
  // 检查保质期格式
  checkDate: function(date) {
    let regDate = /^[0-9]*[1-9][0-9]*$/;
    if (!date || date.length === 0) {
      return '';
    }
    if (!regDate.test(date)) {
      return '保质期应为正整数';
    }
    return '';
  },
  // 提交创建
  submitCreate: function() {
    let that = this;
    let {
      goodsInfo,
      errorInfo
    } = this.data;
    let {
      name,
      description,
      unit,
      expireDate,
      properties
    } = goodsInfo;
    let hasError = false;

    if (!name || name.length === 0) {
      hasError = true;
      errorInfo.nameError = '商品名不能为空';
    } else {
      errorInfo.nameError = '';
    }
    let checkDateResult = this.checkDate(expireDate);
    if (checkDateResult.length > 0) {
      hasError = true;
      errorInfo.expireDateError = checkDateResult;
    } else {
      errorInfo.expireDateError = checkDateResult;
    }
    this.setData({
      errorInfo: errorInfo
    });
    // 如果有错, 不执行后续步骤
    if (hasError) {
      return;
    }
    wxRequest({
      url: '/goods/goods/goods',
      method: 'POST',
      data: {
        name: name,
        description: description === '' ? null : description,
        measuringUnit: unit === '' ? null : unit,
        validTime: expireDate === '' ? null : expireDate,
        properties: properties
      }
    }).then((res) => {
      that.showModal('♪(๑^∇^๑)','创建成功');
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message)
    });

  },
  // 创建商品属性
  createTag: function(e) {
    this.setData({
      createModalVisible: true
    })
  },
  // 创建属性成功
  submitNewProperty: function(e) {
    let {
      newProperty,
      goodsInfo
    } = this.data;
    let {
      properties = []
    } = goodsInfo;
    if (newProperty === '') {
      this.setData({
        ['newPropertyError']: '属性名不能为空'
      })
    } else if (properties.indexOf(newProperty) > -1) {
      this.setData({
        ['newPropertyError']: '属性名与已有的重复'
      })
    } else {
      this.setData({
        ['goodsInfo.properties']: properties.concat(newProperty),
        createModalVisible: false
      })
    }
  },
  // 创建商品属性
  createTag: function (e) {
    this.setData({
      createModalVisible: true
    })
  },
  // 创建属性成功
  submitNewProperty: function (e) {
    let {
      newProperty,
      goodsInfo
    } = this.data;
    let {
      properties = []
    } = goodsInfo;
    if (newProperty === '') {
      this.setData({
        ['newPropertyError']: '属性名不能为空'
      })
    } else if (properties.indexOf(newProperty) > -1) {
      this.setData({
        ['newPropertyError']: '属性名与已有的重复'
      })
    } else {
      this.setData({
        ['goodsInfo.properties']: properties.concat(newProperty),
        createModalVisible: false
      })
    }
  },
  // 删除商品属性
  deleteTag: function(e) {
    let {
      index
    } = e.detail;
    let properties = this.data.goodsInfo.properties;
    properties.splice(index, 1);
    this.setData({
      ['goodsInfo.properties']: properties
    })
  },
  // 关闭 modal
  closeCreateModal: function() {
    this.setData({
      createModalVisible: false
    })
  },
  // 展示 modal
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

})