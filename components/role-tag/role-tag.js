// components/role-tag/role-tag.js
const {
  Roles
} = require('../../data/role.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    role: {
      type: String,
      value: Roles.none
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    roleMap: Object.assign({}, Roles)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})