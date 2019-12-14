// components/goods-properties/goods-properties.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propertyList: {
      type: Array,
      value: []
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
    deleteTag: function(e){
      let detail = {
        index: e.target.dataset.index || -1
      }
      this.triggerEvent('deleteTag', detail, {})
    }

  }
})
