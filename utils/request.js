// const baseURL = 'http://localhost:3000';
const baseURL = 'http://106.13.46.72:8082'

function wxRequest(
  url = "",
  method = 'GET',
  data = {},
  header = {}
) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data,
      method,
      header: Object.assign({
        'content-type': 'application/json' // 默认值
      }, header),
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

module.exports = {
  baseURL,
  wxRequest
};