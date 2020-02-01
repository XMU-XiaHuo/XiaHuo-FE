const checkName = function(name) {
  if (!name || name.length < 2) {
    return '仓库名格式错误（应为 2 - 15 个汉字）';
  }
  return '';
};
const checkAddress = function(address) {
  if (!address) {
    return '仓库地址不能为空';
  }
  return '';
};
const checkInfo = function(info) {
  if (!info) {
    return '仓库简介不能为空';
  }
  return '';
};
const checkArea = function(areaInfo) {
  if (!areaInfo['areaStr'] || areaInfo['areaStr'].length === 0) {
    return '请填写仓库位置';
  }
  return '';
};
const checkSenderName = function(name) {
  let regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!name || !regName.test(name)) {
    return '姓名格式错误（应为 2 - 4 个汉字）';
  }
  return '';
};
const checkSenderPhone = function(phone) {
    let regPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!phone || phone.length === 0) {
      return '手机号不能为空'
    }
    if (!regPhone.test(phone)) {
      return '手机号格式错误';
    }
    return '';
  };
  const checkCompany = function(company) {
    let regName = /^[\u4e00-\u9fa5]{2,30}$/;
    if (!company || !regName.test(company)) {
      return '公司名格式错误（应为 2 - 30 个汉字）';
    }
    return '';
  };
const checkError = function(errorInfo) {
  let hasError = false;
  let keys = Object.keys(errorInfo);
  for (let i = 0; i < keys.length; i++) {
    if (errorInfo[keys[i]].length > 0) {
      hasError = true;
      break;
    }
  }
  return hasError;
};

module.exports = {
  checkName,
  checkAddress,
  checkInfo,
  checkArea,
  checkSenderName,
  checkSenderPhone,
  checkCompany,
  checkError
};