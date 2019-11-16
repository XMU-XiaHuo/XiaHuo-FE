// components/back-top-menu/back-top-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '页面标题'
    },
    backUrl: {
      type: String,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function(e) {
      let {
        url
      } = e.currentTarget.dataset;
      if (url) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },
  }
})