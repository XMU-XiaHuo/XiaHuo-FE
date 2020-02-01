// components/goods-properties/goods-properties.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propertyList: {
      type: Array,
      value: []
    },
    canClose: {
      type: Boolean,
      value: true
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

    // 删除属性
    deleteTag: function(e) {
      let detail = {
        index: e.target.dataset.index || -1
      }
      this.triggerEvent('deleteTag', detail, {})
    },

    // 添加属性
    createTag: function(e) {
      this.triggerEvent('createTag', {}, {})
    }
  }
})