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
      value: 'reLaunch'
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
      console.log(getCurrentPages());
      let {
        jumpType,
        backUrl
      } = this.data;
      if (backUrl) {
        console.log(jumpType);
        if (jumpType === 'navigate') {
          wx.navigateTo({
            url: backUrl
          })
        } else if (jumpType === 'redirect') {
          wx.redirectTo({
            url: backUrl
          })
        } else if (jumpType === 'reLaunch') {
          wx.reLaunch({
            url: backUrl
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