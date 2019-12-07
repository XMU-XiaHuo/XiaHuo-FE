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
    },
    jumpType: {
      type: String,
      value: 'navigate'
    },
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
      console.log(getCurrentPages());
      let {
        url
      } = e.currentTarget.dataset;
      if (url) {
        if (this.jumpType === 'navigate') {
          wx.navigateTo({
            url: e.currentTarget.dataset.url
          })
        } else if (this.jumpType === 'redirect') {
          wx.redirectTo({
            url: e.currentTarget.dataset.url
          })
        } else if (this.jumpType === 'reLaunch') {
          wx.reLaunch({
            url: e.currentTarget.dataset.url
          })
        } else {          
          wx.navigateBack({
            delta: 1
          })
        }
      }
    },
  }
})