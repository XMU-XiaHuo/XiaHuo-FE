// const baseURL = 'http://localhost:3000';
const baseURL = 'http://106.13.46.72:8082';

function addToken(res) {
  let token = res.header['token'];
  wx.setStorageSync("token", token);
}

function handle401() {
  wx.reLaunch({
    url: '../index/index'
  });
}

function handle403() {
  wx.navigateTo({
    url: '../noAuthority/noAuthority'
  });
}

function wxRequest({
  url = "",
  method = 'GET',
  data,
  header
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data,
      method,
      header: header || {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token")
      },
      success: (res) => {
        let {
          data,
          statusCode
        } = res;
        if (url === '/user/user/login') {
          addToken(res);
        }
        if (statusCode === 200) {
          if (data.code === 200) {
            if (data.result === null || data.result === false) {
              reject(data);
            } else {
              resolve(data);
            }
          } else if (data.code === 401) {
            handle401();
            reject(data);
          } else if (data.code === 403) {
            handle403();
            reject(data);
          } else {
            console.log('=====================================')
            console.log('服务器发生错误: 后端出错');
            console.log(data);
            console.log('=====================================')
            reject(data);
          }
        } else if (statusCode === 401) {
          handle401();
          reject(data);
        } else if (statusCode === 403) {
          handle403();
          reject(data);
        } else {
          console.log('=====================================')
          console.log('服务器发生错误: HTTP 状态码不为 200');
          console.log(data);
          console.log('=====================================')
          reject(data);
        }
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

module.exports = {
  baseURL,
  wxRequest
};