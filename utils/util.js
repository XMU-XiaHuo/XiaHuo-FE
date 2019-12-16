const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 防抖函数
const debounce = function(method, context, time) {
  let id;
  return function(...args) {
    clearTimeout(id);
    id = setTimeout(() => {
      method.apply(context, args);
    }, time);
  };
};

const throttle = function(method, context, time) {
  let id;
  return function(...args) {
    if (!id) {
      id = setTimeout(() => {
        method.apply(context, args);
        id = null;
      }, time)
    }
  }
};

module.exports = {
  formatTime,
  debounce,
  throttle
}