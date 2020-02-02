# XiaHuo-FE

## 本地调试步骤
1. 下载“微信开发者工具” （https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html）
2. 克隆本项目到本地
3. 切到 develop 分支后 pull
4. 打开微信开发者工具，导入本项目即可


## 调用本地后端接口
1. 在“微信开发者工具”设置：右上角详情 -> 本地设置 -> 勾选“不校验合法域名及 HTTPS 证书”
2. 修改 utils/request.js 中的 baseURL 为请求的基本 URL

## 更换当前页面
修改 app.json 中的 pages 数组，将要看的页面放在数组的第一项即可。

以下是所有界面对应的路径：
```json
 "pages/mainPage/mainPage", //主页
 "pages/test/test", //测试页面
 "pages/userAuthorize/userAuthorize", //用户授权页面
 "pages/goodsManage/goodsManage", //商品管理页面
 "pages/stockCheck/stockCheck", //盘点页面
 "pages/index/index", //进入仓库中间页（创建仓库入口）
 "pages/createWarehouse/createWarehouse", //创建仓库第一步
 "pages/createWarehouse2/createWarehouse2", //创建仓库第二步
 "pages/createWarehouse3/createWarehouse3", //创建仓库成功页
 "pages/personInfoManage/personInfoManage", //个人信息管理页面
 "pages/myAuthority/myAuthority", //我的权限页面
 "pages/warehouseInfoManage/warehouseInfoManage", //仓库信息管理页面
 "pages/leaveWarehouse/leaveWarehouse", //离开仓库页面
 "pages/authorityManage/authorityManage", //权限管理页面
 "pages/authorityManagePerson/authorityManagePerson" //单人权限管理
 "pages/reportDamage/reportDamage", //报损页面
 "pages/pick/pick", //拣货页面
 ```
