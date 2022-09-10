// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
var $ = cloud.database().command.aggregate   //定义聚合操作符

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await cloud.database().collection('orderDetail').aggregate()
    .lookup({
      from: "food",
      localField: "foodsId",
      foreignField: "_id",
      as: "orders"
     })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$orders', 0]), '$$ROOT' ])
    //replaceRoot指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点
             //mergeObjects 累计器操作符
            //$.mergeObjects([params1,params2...]) 可以合并多个元素
            //$.arrayElemAt(['$orders', 0]), '$$ROOT']
            //就是取orders数组的第一个元素，与原始的根融合在一起
    })
    .project({//不显示当前指定字段
      orders: 0,
      empty:0,
      food_grade:0,
      food_sales:0,
      food_image:0,
      material:0,
    })
    .lookup({
      from:'order',
      localField: "orderId",
      foreignField: "_id",
      as: "ordersList"
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$ordersList', 0]), '$$ROOT' ])
    })
    .project({
      ordersList:0,
      packMoney:0,
      totalMoney:0,
      money:0
    })
    .match({
      _openid: event.userid// 填入当前用户 openid
    })
    .group({
      orderId:'$orderId'
    })
    .end()
  }catch(e){
    console.log(e)
}
  
}