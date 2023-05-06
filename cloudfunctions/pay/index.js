// 云函数入口文件
//微信统一下单
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : event.goodName,//商品名称或商品描述
    "outTradeNo" : 2501902696+new Date().getTime(),//订单号  前面再加随机生成字符串
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1900009231",//微信支付商户号
    "totalFee" : event.totalFee,//支付的金额，单位：分
    "envId": "cloud1-9g5ji1nh044d601d",//云开发环境ID
    "functionName": "pay_cb"
  })
  return res
}