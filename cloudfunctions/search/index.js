// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
   return await db.collection('food').where({
         canteen:event.canteen,
         food_name:db.RegExp({//在food表搜索name字段
           regexp:'.*'+event.searchKey,//.*表示匹配前面的0字符，这样就不会报空字符串的错
           options:'i'//不区分大小写
         })
       })
       .get()
}