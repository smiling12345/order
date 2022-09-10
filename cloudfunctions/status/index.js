// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()//!!!:cloud.init要写在 cloud.database之前，否则会报未初始化。

  //js合并数组对象中key相同的数据。用于获取订单数据中
  function mergeObjects(arr){
    //对象获取属性的方式：1.通过.方式（key是静态的，如{name:'bob',age:18}）
    //2.通过[]方式(key是动态的，可以是字符串或数字形式，如{"desk":3}或{1:"numberone"})
    let dataInfo={};
    arr.forEach((item,index)=>{
       let {orderId}=item;//取item里key为orderId的值,对象的解构赋值，例orderId="f640xxxxxxxxxxx"
       if(!dataInfo[orderId]){//如果获取的对象属性为空
              dataInfo[orderId]={//给相应的对象赋值新的对象
                  orderId,
                  children:[]
              }
        }
        dataInfo[orderId].children.push(item)
    });
    return Object.values(dataInfo)//获取对象中所有值，并返回一个数组
}

// 云函数入口函数
exports.main = async (event, context) => {//调用order云函数
    const res=await cloud.callFunction({//获取新订单的数据
      name:'order',
      data:{
        canteen:event.canteen,
        louhao:event.louhao,
        dishes:event.dishes,
        status:event.status,
        bgcolor:event.bgcolor,
        userid:event.userid
      }
  })
  const arr=res.result.list
  console.log(arr)
  return mergeObjects(arr);
  
}