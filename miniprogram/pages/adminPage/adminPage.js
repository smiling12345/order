// pages/adminPage/adminPage.js
//在订单管理解决的问题：实时性获取最新数据，解决了呈现在页面上的性能问题
//如何完成的？通过先首次加载数据，提升性能，之后再通过使用定时器实时获取最新数据，并且不会影响页面性能展示

//解决了如何获取then内数据的问题，，并且封装成了函数，可以多次调用，减少代码重复量。
//通过orderAdmin和async asyncFn来实现

const db = wx.cloud.database()
const _=db.command
var $ = db.command.aggregate
Page({

    
  /**
   * 页面的初始数据
   */
  data: {
      user:'商家',
      currentTab:0,//控制选择顶部 商品管理 订单管理 用户评价
      selected:'新订单',//控制订单管理的选择 新订单还是已完成
      list:[
        "10：30-11：00",
        "11：00-11：30",
        "11：30-12：00",
        "12：00-12：30",
        "16：30-17：00",
        "17：00-17：30",
        "17：30-18：00",
        "18：00-18：30",
      ],
      evaluationSelect:'全部',
      canteen:'',
      louhao:'',
      dishes:'',
      arr:[],//装商品管理数据的数组
      newArr:[],//显示新订单数据的数组   对应于待接单
      ordering:[],//显示商家已接单订单数据的数组   对应于商家已接单
      alreadyOrder:[],//显示商家已完成订单数据的数组  对应于菜品制作完成
      riderDeliver:[],//显示骑手接单信息
      customOrder:[],//显示用户已取餐信息  
      statuFirst:'待接单',
      statuSecond:'商家已接单',
      statuThird:'菜品制作完成',
      statuFour:'骑手已接单',
      statuSix:'用户已取餐',
      a:null,//a，b，c为定时器的id,便于销毁定时器
      b:null,
      c:null,
      fileList:[]

  },

  //商品管理
  shop(e){
    console.log(e)
    this.setData({
      currentTab:0
    })
  /*  clearInterval(this.data.a)
    clearInterval(this.data.b)
     clearInterval(this.data.c)*/

     this.shopUpdate()
  },

orderAdmin(statuOrder,bgcolor){//1.封装数据请求方法（异步）
    let that=this
    return wx.cloud.callFunction({
      name:'status',
      data:{
        canteen:that.data.canteen,
        louhao:that.data.louhao,
        dishes:that.data.dishes,
        status:statuOrder,
        bgcolor:bgcolor
      }
    })
  },
async asyncFn(orderStatu,bgcolor){//2.通过async/await去操作得到的Promise对象
//await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；
//如果不是Promise对象：把这个非promise的东西当做await表达式的结果。
   try{
        let returnData=await this.orderAdmin(orderStatu,bgcolor)
        console.log(returnData)
        console.log(returnData.result)
        return returnData.result
   }catch(e){
     console.log(e)
   }
},

  //订单管理
  order(e){//点击再从数据库加载数据,先加载所有数据，再在页面显示处看需要哪些数据
   let that=this 
    console.log(e)
    this.setData({
      currentTab:1,
  })
  that.asyncFn(that.data.statuFirst).then(res=>{
      console.log(res)
      that.setData({
        newArr:res
      })
    })
 
  },


  //用户评价
  evaluate(e){
    console.log(e)
    this.setData({
      currentTab:2
    })
    this.all()
  },

  newOrder(){//点击订单管理下的新订单
    let that=this
     this.setData({
       selected:'新订单',
     })
     that.asyncFn(that.data.statuFirst).then(res=>{
      console.log(res)
      that.setData({
        newArr:res
      })
    })

     this.answer()
     
  },

  orderIng(){
    let that=this
    this.setData({
      selected:'进行中',
    })

    that.asyncFn(that.data.statuSecond).then(res=>{
      console.log(res);
      that.setData({
        ordering:res
      })
    })

  },

alreadyOrder(){//点击订单管理下的已完成订单
    let that=this
    this.setData({
      selected:'已完成',
    })

    that.asyncFn(that.data.statuThird).then(res=>{
      console.log(res)
      that.setData({
        alreadyOrder:res
      })
    })

    that.asyncFn(that.data.statuFour).then(res=>{
      console.log(res)
      that.setData({
       riderDeliver:res
     })
    })

    that.asyncFn(that.data.statuSix).then(res=>{
      console.log(res)
      that.setData({
        customOrder:res
      })
    })

  },
  //添加新商品
  addNewshop(){
      wx.navigateTo({
        url: '../edit/edit?canteen='+this.data.canteen+'&louhao='+this.data.louhao+'&dishes='+this.data.dishes,
      })
  },

  //获取相应数据
  answer(){
    db.collection('comment')
    .where({
      canteen:_.eq(this.data.canteen),
      louhao:_.eq(this.data.louhao),
      dishes:_.eq(this.data.dishes),
      adminComment:_.eq('')
    }).get()
    .then(res=>{
      console.log('获取数据成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据失败',res)
    })
  },

  new(){//商家未评论就是新消息
    //从全部获得的数组里筛选出一个新数组
    let that=this
    this.setData({
       evaluationSelect:'新消息'
    })
   
    db.collection('comment')
    .where({
      canteen:_.eq(this.data.canteen),
      louhao:_.eq(this.data.louhao),
      dishes:_.eq(this.data.dishes),
      adminComment:_.eq('')
    }).get()
    .then(res=>{
      console.log('获取数据成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据失败',res)
    })
    
    
    

 },
 all(){
   this.setData({
     evaluationSelect:'全部'
  })
  db.collection('comment')
    .where({
      canteen:_.eq(this.data.canteen),
      louhao:_.eq(this.data.louhao),
      dishes:_.eq(this.data.dishes),
    }).get()
    .then(res=>{
      console.log('获取数据成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据失败',res)
    })
 },

 shopUpdate(){//商品管理加载
  let that=this
  wx.cloud.callFunction({//商品管理再最初加载一次，而后下拉刷新加载一次
    name:'food',
    data:{
      action:'part',//控制选择云函数的功能
      canteen:this.data.canteen,
      louhao:this.data.louhao,
      dishes:this.data.dishes
    }
  })
  .then(res=>{
    console.log(res)
    if(res.result!==null){
      that.setData({
        arr:res.result.data
      })
    }
    
  })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
     console.log(options);
     this.setData({
       canteen:options.canteen,
       louhao:options.louhao,
       dishes:options.dishes
     })

     wx.cloud.callFunction({//商品管理再最初加载一次，而后下拉刷新加载一次
      name:'food',
      data:{
        action:'part',//控制选择云函数的功能
        canteen:options.canteen,
        louhao:options.louhao,
        dishes:options.dishes
      }
    })
    .then(res=>{
      console.log(res)
      if(res.result!==null){
          this.setData({
          arr:res.result.data
        })
      }
      
    })

    //订单管理
        //asycn定义的函数，永远返回值都是promise对象
     //如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。
     //所以需要通过then来操作获取的对象
     this.asyncFn(this.data.statuFirst).then(res=>{
      console.log(res)
      that.setData({
        newArr:res
      })
    })

    this.asyncFn(this.data.statuSecond).then(res=>{
     console.log(res)
     that.setData({
      ordering:res
    })
   })

   this.asyncFn(this.data.statuThird).then(res=>{
     console.log(res)
     that.setData({
      alreadyOrder:res
    })
   })

   this.asyncFn(this.data.statuFour).then(res=>{
    console.log(res)
    that.setData({
     riderDeliver:res
   })
  })

  this.asyncFn(this.data.statuSix).then(res=>{
    console.log(res)
    that.setData({
      customOrder:res
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
    let that=this;

    this.asyncFn(this.data.statuFirst).then(res=>{
      console.log(res)
      that.setData({
        newArr:res
      })
    })

    this.asyncFn(this.data.statuSecond).then(res=>{
     console.log(res)
     that.setData({
      ordering:res
    })
   })

   this.asyncFn(this.data.statuThird).then(res=>{
     console.log(res)
     that.setData({
      alreadyOrder:res
    })
   })

   this.asyncFn(this.data.statuFour).then(res=>{
    console.log(res)
    that.setData({
     riderDeliver:res
   })
  })

  this.asyncFn(this.data.statuSix).then(res=>{
    console.log(res)
    that.setData({
      customOrder:res
    })
  })



         this.shopUpdate(()=>wx.stopPullDownRefresh())
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