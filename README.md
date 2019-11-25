# XiaHuo-FE

## 本地调试步骤
1. 下载“微信开发者工具” （https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html）
2. 克隆本项目到本地
3. 切到 develop 分支后 pull
4. 打开微信开发者工具，导入本项目即可


## 调用本地后端接口
1. 在“微信开发者工具”设置：右上角详情 -> 本地设置 -> 勾选“不校验合法域名及 HTTPS 证书”
2. 修改 utils/request.js 中的 baseURL 为请求的基本 URL
