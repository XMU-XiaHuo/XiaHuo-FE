const Roles = {
  'owner': '创建者',
  'admin': '管理员',
  'counter': '盘点员',
  'orderer': '订单员',
  'storager': '入库员',
  'picker': '拣货员',
  'none': '无权限'
};

const Description = {
  'owner': '仓库的创建者，拥有所有的权限',
  'admin': '负责帮助创建者管理仓库，拥有管理仓库以及以下所有权限',
  'storager': '负责商品的入库流程',
  'orderer': '负责电商平台的对接，接入购买单、退货单、换货单的发起流程',
  'picker': '负责订单的拣货和发货流程',
  'counter': '负责仓库的盘点工作',
  'none': '无权限'
}

const roleMap = function(role) {
  const handle = 'none';
  const map = {
    'Creator': 'owner',
    'Administrator': 'admin',
    'PickingMan': 'picker',
    'IncomeMan': 'storager',
    'OrderMan': 'orderer',
    'CheckMan': 'counter'
  };
  if (!role) {
    return handle;
  }
  return map[role] || handle;
}

module.exports = {
  Roles,
  Description,
  roleMap
};