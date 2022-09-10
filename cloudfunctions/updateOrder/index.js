const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  let arr=event.arr
  let rider=event.rider
  let judge=true;
  if(rider==null){
      for(let i=0;i<arr.length;i++){
        try {
          await db.collection('orderDetail').doc(arr[i]._id).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            status: event.status,
          }
        })
      } catch(e) {
        console.error(e);
        judge=false;
      }
     }
  }else{
    for(let i=0;i<arr.length;i++){
      try {
        await db.collection('orderDetail').doc(arr[i]._id).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          status: event.status,
          riderName:event.rider.name,
          riderPhone:event.rider.phone
        }
      })
    } catch(e) {
      console.error(e);
      judge=false;
    }
  }
 }
  return judge;//说明数据更新情况，正常还是有异常
}