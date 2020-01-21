// components/order-tag/order-tag.js
const OrderMap = {
  '未处理': 'warning',
  '库存不足': 'none',
  '已取消': 'none',
  '处理中': 'primary',
  '拣货中': 'primary',
  '已完成': 'success',
  '未知': 'none'
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String,
      value: OrderMap['未知']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderMap: Object.assign({}, OrderMap)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})