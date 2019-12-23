// pages/editGoods/editGoods.js
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
    goodsInfo: {
      name: '',
      description: '',
      unit: '',
      expireDate: '',
      properties: []
    },
    errorInfo: {
      nameError: '',
      descriptionError: '',
      unitError: '',
      expireDateError: ''
    },

    // modal 相关
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
    let modifyKey = 'goodsInfo.' + key;
    this.setData({
      [modifyKey]: e.detail
    })
  },
  // 检查商品名
  checkName: function(name) {
    if (name === "") {
      return '商品名不能为空';
    }
    return '';
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

  confirmEdit: function() {
    let that = this;
    let {
      goodsId,
      goodsInfo
    } = this.data;
    let {
      name,
      description,
      unit,
      expireDate,
      properties
    } = goodsInfo;

    // 检测商品名
    let checkNameResult = this.checkName(name);
    // 检测保质期
    let checkDateResult = this.checkDate(expireDate);
    this.setData({
      ['errorInfo.nameError']: checkNameResult,
      ['errorInfo.expireDateError']: checkDateResult
    });
    if (checkNameResult.length > 0 || checkDateResult.length > 0) {
      return;
    }

    wxRequest({
      url: '/goods/goods/goods',
      method: 'PUT',
      data: {
        id: goodsId,
        name: name,
        description: description,
        measuringUnit: unit,
        properties: properties,
        validTime: expireDate
      }
    }).then((res) => {
      console.log(res);
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
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
        let {
          name,
          description,
          measuringUnit,
          validTime,
          properties
        } = result;
        that.setData({
          goodsInfo: {
            name: name,
            description: description,
            unit: measuringUnit,
            expireDate: validTime,
            properties: properties
          }
        })
      }, (error) => {
        that.showModal('出错了๑Ծ‸Ծ๑', error.message);
      })
    });
  },

})