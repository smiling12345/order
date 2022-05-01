const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

var $ = cloud.database().command.aggregate   //定义聚合操作符
exports.main = async (event, context) => {
  return cloud.database().collection("order").aggregate()
  .lookup({
    from:"orderDetail", //把orderDetail用户表关联上
    localField: '_id', //order表的关联字段
    foreignField: 'orderId', //orderDetail表的关联字段
    as: 'uapproval' //匹配的结果作为uapproval相当于起个别名
  })
  /*.replaceRoot({
    //replaceRoot指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点
    newRoot:$.mergeObjects([$.arrayElemAt(['$uapproval',0]),'$$ROOT'])
             //mergeObjects 累计器操作符
            //$.mergeObjects([params1,params2...]) 可以合并多个元素
            //$.arrayElemAt(['$uapproval', 0]), '$$ROOT']
            //就是取uapproval数组的第一个元素，与原始的根融合在一起
  })
  .project({
    uapproval:0
  })*/
  .end({
    success:function(res){
      return res;
    },
    fail(error) {
      return error;
    }
  })

}

