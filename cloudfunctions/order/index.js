const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

var $ = cloud.database().command.aggregate   //定义聚合操作符
exports.main = async (event, context) => {//三表联合
  try{
     return await cloud.database().collection('orderDetail')
    .aggregate()
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
    })
    .match({
      canteen:event.canteen,
      louhao:event.louhao,
      dishes:event.dishes,
      status:event.status,
      bgcolor:event.bgcolor,
      _openid:event.userid
    })
    .limit(100)
    //必须要加limit，否则虽然官网上说云函数端获取数据最多只是100条限制，但若不加，仍然是返回20条数据的，大坑！！！！！
    .end()

  }catch(e){
      console.log(e)
  }
  

}

