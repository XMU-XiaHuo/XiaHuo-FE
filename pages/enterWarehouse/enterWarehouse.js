// pages/enterWarehouse/enterWarehouse.js
const app = getApp();
const {
  wxRequest
} = app.Request;

let giveSuggestId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {
      name: '',
      number: '',
      location: '123456'
    },
    errorInfo: {
      nameError: '',
      numberError: '',
      locationError: '',
      productError: ''
    },
    // 推荐商品相关
    suggestGoodsList: [],
    isSuggesting: true,
    suggestLoading: false,
    noResult: false,
    chooseGoodsId: null,

    // 推荐 product 相关
    suggestProductList: [],
    isSuggestingProduct: true,
    suggestLoadingProduct: false,
    noResultProduct: false,
    chooseProductId: null,
    productName: '',
    icon: 'arrow',

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

  // 输入商品名出推荐
  inputGoodsName: function(e) {
    let that = this;
    let {
      key
    } = e.target.dataset;
    let name = e.detail;
    this.setData({
      ['goodsInfo.name']: name,
      chooseGoodsId: null,
      productName: '',
      chooseProductId: null
    });
    let giveSuggestion = function() {
      if (!name) {
        return;
      }
      that.searchSuggest(name);
      that.setData({
        isSuggesting: false
      })
    };
    if (this.data.isSuggesting) {
      clearTimeout(giveSuggestId);
      giveSuggestId = setTimeout(() => {
        giveSuggestion();
      }, 500);
    } else {
      this.setData({
        isSuggesting: true
      })
    }
    this.setData({
      ['goodsInfo.name']: e.detail
    });
  },
  // 搜索推荐商品
  searchSuggest: function(name) {
    let that = this;
    this.setData({
      suggestLoading: true,
      noResult: false
    }, () => {
      wxRequest({
        url: '/goods/goods/searchGoods',
        method: 'GET',
        data: {
          goodsName: name
        }
      }).then((res) => {
        let {
          result
        } = res;
        that.setData({
          suggestGoodsList: result,
          suggestLoading: false,
          noResult: !(result && result.length)
        });
      }, (error) => {
        that.setData({
          suggestLoading: false,
          noResult: true
        })
      })
    })
  },
  // 选择某个推荐的项目
  chooseSuggest: function(e) {
    let {
      value
    } = e.target.dataset;
    this.setData({
      ['goodsInfo.name']: value.name,
      chooseGoodsId: value.id,
      isSuggesting: true
    })
  },
  // 推荐 product
  suggestProduct: function(goodsId) {
    let that = this;
    wxRequest({
      url: '/goods/product/products',
      method: 'GET',
      data: {
        goodsId: goodsId
      }
    }).then((res) => {
      let {
        result
      } = res;
      that.setData({
        suggestProductList: result,
        suggestLoadingProduct: false,
        noResultProduct: !(result && result.length)
      });
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },
  // 选择某个推荐的项目
  chooseSuggestProduct: function(e) {
    let {
      value
    } = e.target.dataset;
    this.setData({
      productName: value.name,
      chooseProductId: value.id,
      isSuggestingProduct: true
    })
  },
  // 点击 icon
  onClickIcon: function() {
    let that = this;
    let {
      icon,
      isSuggestingProduct,
      chooseGoodsId
    } = this.data;
    this.setData({
      icon: icon === 'arrow-down' ? 'arrow' : 'arrow-down',
      isSuggestingProduct: !isSuggestingProduct,
      suggestLoadingProduct: true,
      noResultProduct: false,
    }, () => {
      if (chooseGoodsId) {
        that.suggestProduct(chooseGoodsId);
      }
    });
  },

  // 检验表单
  checkForm: function() {
    let {
      goodsInfo,
      chooseProductId,
      chooseGoodsId,
      errorInfo
    } = this.data;
    let {
      number,
      location
    } = goodsInfo;
    let hasError = false;
    if (!chooseGoodsId) {
      errorInfo.nameError = '请选择商品';
      hasError = true;
    } else {
      errorInfo.nameError = '';
    }
    if (!chooseProductId) {
      errorInfo.productError = '请选择产品';
      hasError = true;
    } else {
      errorInfo.productError = '';
    }
    let regNumber = /^[0-9]*[1-9][0-9]*$/;
    if (!number || number.length === 0) {
      errorInfo.numberError = '存入数量不能为空';
      hasError = true;
    } else if (!regNumber.test(number)) {
      errorInfo.numberError = '存入数量应为正整数';
      hasError = true;
    } else {
      errorInfo.numberError = '';
    }
    if (!location || location.length === 0) {
      errorInfo.locationError = '仓储编号不能为空';
      hasError = true;
    } else {
      errorInfo.locationError = '';
    }
    this.setData({
      errorInfo
    })
    return !hasError;
  },

  // 提交入库
  submitEnter: function() {
    let that = this;
    let {
      goodsInfo,
      chooseProductId
    } = this.data;
    let {
      number,
      location
    } = goodsInfo;

    if (!this.checkForm()) {
      return;
    }

    wxRequest({
      url: '/storage-location/entry',
      method: 'POST',
      data: {
        productId: chooseProductId,
        entryNumber: number,
        productLocation: location
      }
    }).then((res) => {
      that.showModal('♪(๑^∇^๑)', '入库成功');
    }, (error) => {
      that.showModal('出错了๑Ծ‸Ծ๑', error.message);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})