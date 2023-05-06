const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const db = cloud.database()
  // 先取出集合记录总数
  let countResult = await db.collection('comment').where({
    foodsId:event.foodsId
  }).count()
  countResult=countResult.total
  // 承载所有读操作的 promise 的数组
  let tasks = []
  for (let i = 0; i < countResult; i+=100) {
    let list = await db.collection('comment').where({
      foodsId:event.foodsId
    }).skip(i).get()
    tasks=tasks.concat(list.data)
  }
  // 等待所有
  return tasks
}