// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

//需在初始化之后
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.amount==1){//有数据，则更新数据
    try{
      return await db.collection('hotSearch').where({
         searchKey:event.searchKey,
         canteen:event.canteen
      })
      .update({
        data:{
          num:_.inc(1)
        }
      })
    }catch(e){
      console.log(e)
    }
  }else{//无数据则添加数据
    try{
      return await db.collection('hotSearch').add({
       data:{
         searchKey:event.searchKey,
         num:1,
         canteen:event.canteen
       }
     })
    }catch(e){
      console.log(e)
    }
  }
}