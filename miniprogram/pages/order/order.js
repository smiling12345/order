// pages/order/order.js
var app = getApp()//使用全局变量1.
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
       tabs:['全部','待评价','退款','进行中'],
       currentTab:0,
       list:[],//三表联合信息的数组
       isShow:false,//是否展示弹窗，false代表不展示
       orders:null,
       status:'',
       riders:null,
      
  },

 orderAdmin(){//1.封装数据请求方法（异步）
  console.log(app.globalData.userid)
  return wx.cloud.callFunction({
    name:'status',
    data:{
      userid:app.globalData.userid
    }
  })
},

  async asyncFn(){//2.通过async/await去操作得到的Promise对象
    //await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；
    //如果不是Promise对象：把这个非promise的东西当做await表达式的结果。
     try{
          let returnData=await this.orderAdmin()
          console.log(returnData)
          console.log(returnData.result)
          return returnData.result
     }catch(e){
       console.log(e)
     }
    },

  orderStatu(arr,statusName){//去除相关状态的订单
     if(arr.length==0) return;
     console.log(arr)
     for(let i=0;i<arr.length;i++){
            let evaluate=true;
            console.log('111')
            for(let j=0;j<arr[i].children.length;j++){
              if(arr[i].children[j].status!=statusName){//只要有一个不是想去除的状态，就得保留数据
                evaluate=false;
              }
            }
            console.log(evaluate)
            if(evaluate==true){//如果都是想去除的状态，则去除相应订单
              arr.splice(i,1)//由于会更改原数组，因此需要将i也更改了
              i-=1;
            }
    }
          return arr
    },

  refund(arr,statusName){
    console.log(arr)
   if(arr.length==0) return [];
   for(let i=0;i<arr.length;i++){
          let resave=false;
          for(let j=0;j<arr[i].children.length;j++){
            if(arr[i].children[j].status==statusName){//只要有一个是想留下的状态，就得保留数据
              resave=true;//保留状态
            }
          }
          console.log(resave)
          if(resave==false){
            arr.splice(i,1)
            i-=1;
          }
        }
        return arr
  },

  judge(index){
    let that=this
    //调用asyncFn的目的是获取相应用户的全部订单信息
    this.asyncFn().then(res=>{
      console.log(res);
      //根据index再对订单信息进行处理
      if(index==1) {
        that.orderStatu(res,'已评价')
      };
      if(index==2) {
          let resFirst=that.refund(res,'退款中')
          let resTwo=that.refund(res,'退款完成')
          res=resFirst.concat(resTwo)
          console.log(res)
      };
      if(index==3) {
        //先去除用户已用餐得到新数组，再用新数组继续去除退款完成的数据
        let resThird=that.orderStatu(res,'用户已取餐')
        res=that.orderStatu(resThird,'退款完成')
        console.log(res)
      }
      that.setData({
        list:res
      })
    })
  },

  //选中顶部导航栏
  selectTab(event){
    let index=event.currentTarget.dataset.index
    this.judge(index);

    this.setData({
      currentTab:index
    })
  },
  //跳转评价页面
 pingjia(e){
   console.log(e)
   console.log(e.currentTarget.dataset.item._id)//获得orderDetail里的商品唯一id
   let item=e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../evaluate/evaluate?Id='+item._id+'&canteen='+item.canteen+'&foodname='+item.food_name+'&louhao='+item.louhao+'&dishes='+item.dishes+'&foodsId='+item.foodsId
    })
 },



//再来一单
oneMore(e){
   console.log(e)
   let canteen=e.currentTarget.dataset.item.canteen;
   wx.navigateTo({
     url:"../canteen/canteen?canteen="+canteen
   })
},

//展示弹窗
showModel(e){
    let that=this
    console.log(e.currentTarget.dataset.item)
    let item=e.currentTarget.dataset.item
    this.setData({
      orders:item
    })
    //其中item.orderId可以拿去order表查找订单表，
    //拿item.orderId和item.foodsId共同查找orderDetail表的唯一数据
   /* db.collection('order').doc(item.orderId).get()
    .then(res=>{
      console.log(res.data)
      that.setData({
        orders:res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })*/

    db.collection('orderDetail').where({
       orderId:item.orderId,
       foodsId:item.foodsId
    }).get()
    .then(res=>{
      console.log(res.data[0])
      that.setData({
         riders:res.data[0],
         status:res.data[0].status
      })
    })
    .catch(err=>{
      console.log(err)
    })

     this.setData({
       isShow:true
     })
},
//关闭弹窗
hide(){
   this.setData({
     isShow:false
   })
},
//申请退款操作
refund(e){
  let that=this;
  console.log(e)
  console.log(e.currentTarget.dataset.item)
  let item=e.currentTarget.dataset.item
  db.collection('orderDetail').where({//只会得到唯一值，因为orderId唯一
    orderId:item.orderId,
    foodsId:item.foodsId
 }).get()
 .then(res=>{
    console.log(res.data[0].status)
    //如果订单状态尚在待接单状态才可以进行退款，否则弹窗说明无法进行退款
    if(res.data[0].status=='待接单'){
      wx.showModal({
        title:'退款申请',
        content:'确定要申请退款吗？',
        showCancel:true,
        cancelText: "否",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.confirm) {
            //点击取消,默认隐藏弹框
            console.log('用户点击确定')
            that.updateStatus(item.orderId,item.foodsId)
          }  
          if (res.cancel){
            console.log('用户点击取消')
          }
        }
      })
    }else if(res.data[0].status!=='退款已完成'||res.data[0].status!=='退款中'){
      wx.showToast({
        title: '菜品退款处理中/已完成，请勿多次请求',
        icon:'none',
        duration: 2000,
      })
    }else{
       wx.showToast({
         title: '菜品正在制作中，无法申请退款！请联系客服处理',
         icon:'none',
         duration: 2000,
       })
    }
 })
 .catch(err=>{
   console.log(err)
 })
},
//修改订单状态
updateStatus(orderId,foodsId){
    db.collection('orderDetail').where({
       foodsId:foodsId,
       orderId:orderId
    }).update({
      data:{
        status:'退款中'
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this;
     this.asyncFn().then(res=>{
      console.log(res);
      that.setData({
          list:res
     })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.judge(this.data.currentTab)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that=this
    this.asyncFn().then(res=>{
      console.log(res);
      that.setData({
          list:res,
          currentTab:0
     })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})