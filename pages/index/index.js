//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    logo: 'image/logo.png',
    userInfo: {},
    warehouse: [{
        name: '厦门吴悠是xxxxxxxxxxxxxx仓库',
        role: 'owner'
      },
      {
        name: '福州仓库',
        role: 'admin'
      },
      {
        name: '泉州仓库',
        role: 'picker'
      },
    ],
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../mainPage/mainPage'
    })
  },
  jumpToCreatePage: function() {
    wx.navigateTo({
      url: '../createWarehouse/createWarehouse'
    })
  },
  onLoad: function() {
    
  },
  
})