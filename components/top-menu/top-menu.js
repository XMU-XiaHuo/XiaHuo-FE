// components/top-menu/top-menu.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '页面标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    sideBarHidden: true,
    maskHidden: true,
    routeList: [{
        title: '个人信息管理',
        url: '../personInfoManage/personInfoManage',
        icon: 'image/info.png'
      }, {
        title: '仓库信息管理',
        url: '../warehouseInfoManage/warehouseInfoManage',
        icon: 'image/warehouse.png'
      },
      {
        title: '权限管理',
        url: '../authorityManage/authorityManage',
        icon: 'image/quanxian.png'
      },
      {
        title: '商品管理',
        url: '../goodsManage/goodsManage',
        icon: 'image/goods.png'
      },
      {
        title: '商品入库',
        url: '../enterWarehouse/enterWarehouse',
        icon: 'image/ruku.png'
      },
      {
        title: '拣货',
        url: '../pick/pick',
        icon: 'image/pick.png'
      },
      {
        title: '退换货',
        url: '../mainPage/mainPage',
        icon: 'image/tuihuo.png'
      },
      {
        title: '仓储盘点',
        url: '../stockCheck/stockCheck',
        icon: 'image/store.png'
      },
      {
        title: '查看日志',
        url: '../index/index',
        icon: 'image/log.png'
      }
      // {
      //   title: '报损',
      //   url: '../reportDamage/reportDamage',
      //   icon: 'image/baosun.png'
      // },
      // {
      //   title: '报溢',
      //   url: '../index/index',
      //   icon: 'image/baoyi.png'
      // }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSideBar() {
      this.setData({
        sideBarHidden: !this.data.sideBarHidden,
        maskHidden: !this.data.maskHidden
      });
    },
    exit: function() {
      wx.navigateTo({
        url: '../index/index'
      })
    },
  },

  lifetimes: {
    attached: function() {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        });
      } else {
        app.eventEmitter.on('getUserInfo', (res) => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo
          })
        })
      };
    }
  },
})