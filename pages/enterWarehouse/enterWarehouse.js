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
      location: ''
    },
    productInfo: {
      name: ''
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
      chooseGoodsId: null
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
  suggestProduct: function() {
    console.log(1);
  },
  // 点击 icon
  onClickIcon: function() {
    let {
      icon,
      isSuggestingProduct
    } = this.data;
    this.setData({
      icon: icon === 'arrow-down' ? 'arrow' : 'arrow-down',
      isSuggestingProduct: !isSuggestingProduct,
      suggestLoadingProduct: true,
      noResultProduct: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})