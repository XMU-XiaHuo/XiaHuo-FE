const Roles = {
  '创建者': 'owner',
  '管理员': 'admin',
  '盘点员': 'counter',
  '订单员': 'orderer',
  '入库员': 'storager',
  '拣货员': 'picker',
  '无权限': 'none'
};

const Description = {
  '创建者': '仓库的创建者，拥有所有的权限',
  '管理员': '负责帮助创建者管理仓库，拥有管理仓库以及以下所有权限',
  '盘点员': '负责商品的入库流程',
  '订单员': '负责电商平台的对接，接入购买单、退货单、换货单的发起流程',
  '入库员': '负责订单的拣货和发货流程',
  '拣货员': '负责仓库的盘点工作',
  '无权限': '无权限'
}

// const roleMap = function(roleList) {
//   const handle = 'none';
//   const map = {
//     'Creator': 'owner',
//     'Administrator': 'admin',
//     'PickingMan': 'picker',
//     'IncomeMan': 'storager',
//     'OrderMan': 'orderer',
//     'CheckMan': 'counter'
//   };
//   if (!role) {
//     return handle;
//   }
//   return map[role] || handle;
// }

module.exports = {
  Roles,
  Description
};