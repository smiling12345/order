// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //云函数获取数据
  console.log(event)
  switch (event.action){
    case 'all':{
         return getAll()
    }

    case 'part':{
      return getPart(event)
    }
  }
  
  
},


async function getAll(){//获得food所有数据库信息
   await db.collection("food").get()
   .then(res=>{
     return res
   })
}

async function getPart(event){//根据传入的canteen，louhao，dishes获得food相应数据库信息
    await db.collection("food").where({
      canteen:event.canteen,
      louhao:event.louhao,
      dishes:event.dishes
 }).get()
 .then(res=>{
   return res
 })
}

