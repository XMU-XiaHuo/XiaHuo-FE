const baseURL = 'http://localhost:3000/';

function wxRequest(
  url = "",
  method = 'GET',
  data = {},
  header = {},
  success = (res) => {
    console.log(res);
  },
  fail = (error) => {
    console.log(error)
  },
  complete = () => {},
) {
  wx.request({
    url: baseURL + url,
    data,
    header: Object.assign({
      'content-type': 'application/json' // 默认值
    }, header),
    success,
    fail,
    complete
  })
}