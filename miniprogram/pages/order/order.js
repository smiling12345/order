// pages/order/order.js
var app = getApp()//使用全局变量1.
Page({

  /**
   * 页面的初始数据
   */
  data: {
       tabs:['全部','待评价','退款','进行中'],
       currentTab:0,
       list:[],//三表联合信息的数组
      
  },
  orderStatu(arr,statusName){
    if(arr.length==0) return
   for(let i=0;i<arr.length;i++){
          let evaluate=true;
          for(let j=0;j<arr[i].children.length;j++){
            if(arr[i].children[j].status!=statusName){//只要有一个不是想去除的状态，就得保留数据
              evaluate=false;
            }
          }
          console.log(evaluate)
          if(evaluate==true){//如果都是想去除的状态，则去除相应订单
            arr.forEach((value,index,array)=>{
              array.splice(i,1)
            })
          }
        }
        return
  },

  refund(arr,statusName){
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
            arr.forEach((value,index,array)=>{
              array.splice(i,1)
            })
          }
        }
        return arr
  },

  //选中顶部导航栏
  selectTab(event){
    let that=this
    let index=event.currentTarget.dataset.index
    if(index==0){
      this.asyncFn().then(res=>{
        console.log(res)
        that.setData({
            list:res
       })
      })
    }else if(index==1){
      this.asyncFn().then(res=>{
         that.orderStatu(res,'已评价')
        that.setData({
            list:res
       })
      })
    }else if(index==2){
       this.asyncFn().then(res=>{
         if(that.refund(res,'退款中')==[]){
           res=[]
         }else{
           that.refund(res,'退款完成')
         }
         that.setData({
            list:res
         })
      })
    }else if(index==3){
      this.asyncFn().then(res=>{
         if(that.orderStatu(res,'用户已取餐')==[]){
           res=[]
         }else{
           that.orderStatu(res,'退款完成')
         }
         that.setData({
            list:res
         })
      })
    }
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
      url: '../evaluate/evaluate?Id='+item._id+'&canteen='+item.canteen+'&foodname='+item.food_name+'&louhao='+item.louhao+'&dishes='+item.dishes
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
     this.asyncFn().then(res=>{
      console.log(res)
      that.setData({
          list:res
     })
    })
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