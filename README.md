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
 "pages/index/index", //登录页
 "pages/mainPage/mainPage", //主页
 "pages/userAuthorize/userAuthorize", //用户授权页面
 "pages/createWarehouse/createWarehouse", //创建仓库第一步
 "pages/createWarehouse2/createWarehouse2", //创建仓库第二步
 "pages/createWarehouse3/createWarehouse3", //创建仓库成功页
 "pages/noAuthority/noAuthority", //无权限页面
    
 "pages/personInfoManage/personInfoManage", //个人信息管理页面
    "pages/myAuthority/myAuthority", //我的权限页面
    "pages/leaveWarehouse/leaveWarehouse", //退出仓库页面
  
 "pages/warehouseInfoManage/warehouseInfoManage", //仓库信息管理页面
 
 "pages/authorityManage/authorityManage", //权限管理页面
    "pages/authorityManagePerson/authorityManagePerson" //单人权限管理
    "pages/invited/invited", // 被邀请落地页
    
 "pages/goodsManage/goodsManage", //商品管理页面
    "pages/createGoods/createGoods", //创建商品页面
    "pages/goodsDetail/goodsDetail", //商品详情页面
    "pages/editGoods/editGoods", //编辑商品页面
    "pages/productList/productList", //产品列表页面
    "pages/createProduct/createProduct", //创建产品页面
    "pages/editProduct/editProduct", //编辑产品页面
    
 "pages/enterWarehouse/enterWarehouse", //商品入库页面
 
 "pages/storageProduct/storageProduct", //库存信息页面
  
 "pages/storageList/storageList", //仓储盘点页面
    "pages/stockCheck/stockCheck", //每项产品存储信息
 
 "pages/orderList/orderList", // 订单列表页面
    "pages/printOrder/printOrder", // 打印订单页面
    "pages/chooseDelivery/chooseDelivery", // 选择快递商页面
    
 "pages/pick/pick", //拣货页面
 
 "pages/log/log", //查看日志页面
    "pages/reportList/reportList", //报损/报溢日志
    "pages/entryList/entryList", //入库日志
 ```
