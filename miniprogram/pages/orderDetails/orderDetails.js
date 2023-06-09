// pages/orderDetails/orderDetails.js
const db = wx.cloud.database()
const _ = db.command;
const time = require("../utils/utils.js");//引入时间戳转换为日期的js文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    first:'订单配送至',
    address:'',
    name:'',
    gender:'',
    phone:'',
    index:0,
    time: [
      '明天10：30-11：00',
      '明天11：00-11：30',
      '明天11：30-12：00',
      '明天12：00-12：30',
      '明天16：30-17：00',
      '明天17：00-17：30',
      '明天17：30-18：00',
      '明天18：00-18：30',
    ],//送达时间
    money: 1.5,  //配送费
    remark: '',   //订单备注
    packMoney: 0, //打包费
    sumPrice: 0, //菜品合计
    totalmoney:0,//包括配送费，打包费和菜品费的合计
    canteen:'',//确定用户的哪个园的缓存数组
    bgcolor:'配送',
    arrlist:[],//存放加入购物车的菜品数据
    arrSelected:[], //存储选中的数据，对象数组，以便支付时将数据存储到数据库
    select_all:false,
    dizhi:[],//装载地址信息的数组，从缓存所取
    selected:0,//选中的地址信息的索引
    selectedDizhi:{},//装有所选中的地址信息
  },

  bindPickerChange: function(e) {//送达时间
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    console.log(this.data.time[this.data.index])  
  },

  //更新订单备注
  OrderNotes(e){
    console.log(e)
    this.setData({
      remark : e.detail.value
    })
    var wordLength = parseInt(e.detail.value.length)//获取输入字符串的长度
    if(wordLength>=22){
      wx.showToast({
        title: '只能输入22个字',
        icon: 'none',
        duration: 2000
      })
    }
  },
  shopping: function (options) {
    this.uploadOrder()
  },

  //更改按钮颜色，以及显示的数据
  tabSelect(){
    this.setData({
         bgcolor:'配送',
         first:'订单配送至',
         money:1.5,
         address:this.data.addressControl
     })
     this.packcount()
     this.totalMoney()
  },
  tabSelect2(){
    this.setData({
      bgcolor:'自提',
      first:'商品将放到自提点',
      address:'请到对应自提点取回',
      money:0
    })
    this.packcount()
    this.totalMoney()
  },
  tabSelect3(){
    this.setData({
      bgcolor:'堂食',
      first:'商品将放到对应窗口处',
      address:'请到对应窗口取餐',
      packMoney:0,
      money:0
    })
    this.totalMoney()
  },

  checkboxChange(e){//单选加入
    console.log(e.detail.value);
    let that=this;
    var list=[];
    for(var i in e.detail.value){
      for(var j in this.data.arrlist){
        if(e.detail.value[i]===this.data.arrlist[j]._id){/*用push加入数组会导致元素重复 */
          list.push(this.data.arrlist[j]);
        }
      }
    }

    this.data.arrSelected=this.deleteDocument(list)
    if(this.data.arrSelected.length===that.data.arrlist.length){
      that.setData({
        select_all:true
      })
    }else{
      that.setData({
        select_all:false
      })
    }
    console.log(this.data.arrSelected)
    this.moneycount() 
    that.packcount()
    that.totalMoney()
  },

  deleteDocument(arr){//去除重复元素,（检测到有重复值时终止当前循环同时进入顶层循环的下一轮判断）
      var arr2=[]
      for(var i=0,l=arr.length;i<l;i++){
        for(var j=i+1;j<l;j++){
          if(arr[i]==arr[j]){
            j=++i;
          } 
        }
        arr2.push(arr[i])
      }
      return arr2;
},

moneycount(){//计算菜品总价
    let arrSelected=this.data.arrSelected
    console.log(arrSelected)
    let sumPrice=0
    for(let i=0;i<arrSelected.length;i++){
        sumPrice+=arrSelected[i].food_price*arrSelected[i].count
    }
    this.setData({
      sumPrice:sumPrice
    })
    console.log(this.data.sumPrice)
},
//计算打包费用
packcount(){
  let arrSelected=this.data.arrSelected
  let packMoney=0
  for(let i=0;i<arrSelected.length;i++){
    packMoney+=0.5*arrSelected[i].count
  }
  this.setData({
    packMoney:packMoney
  })
  console.log(this.data.packMoney)
},

checkAll(){//是否全选
   var that=this;
   var arr=[];//存放选中id的对象数组
   for(let i=0;i<that.data.arrlist.length;i++){
     that.data.arrlist[i].checked=(!that.data.select_all)
     if(that.data.arrlist[i].checked===true){
       //全选获取选中的值
        arr.push(that.data.arrlist[i]);//将选中的对象放进对象数组里
     }
   }
   that.setData({
      arrlist:that.data.arrlist,
      select_all:(!that.data.select_all),
      arrSelected:arr
   })
   that.moneycount()
   that.packcount()
   that.totalMoney()
},
//计算最终实付价格
totalMoney(){
   this.setData({
     totalmoney:this.data.packMoney+this.data.money+this.data.sumPrice
   })
   console.log(this.data.totalmoney)
},
//将信息存入数据库订单表中
uploadOrder(){
  let that=this
  var timestamp=Date.parse(new Date())
  console.log(timestamp)//将日期存入数据库
  let timeStamp=time.formatTime(timestamp, 'Y/M/D h:m:s')
   console.log(timeStamp);


  console.log(this.data.time[this.data.index])
  if(that.data.name==''){
    wx.showToast({
      title: '地址信息未填！',
      duration:3000,
      icon:'error'
    })
  }else{
      db.collection('order').add({
      data:{
        bgcolor:that.data.bgcolor,//传递是配送还是自提还是堂食等就餐方式
        time:that.data.time[that.data.index],//期望送达时间
        remark:that.data.remark,//订单备注
        money:that.data.money,//配送费
        packMoney:that.data.packMoney,//打包费
        totalMoney:that.data.totalmoney,//实付价格，包括配送费和打包费
        canteen:that.data.canteen,
        name:that.data.name,//收货人姓名
        phone:that.data.phone,//收货人电话
        gender:that.data.gender,//收货人性别
        address:that.data.address,//收货人地址
        timestamp:timeStamp
      }
    })
    .then(res=>{
      console.log(res)
      this.orderDetail(res)
      //将order表中生成的_id是主键也是外键，放入orderDetail表中，进行多表联查，order和orderDetail是一对多
    })
    .catch(res=>{
      console.log('上传订单表失败',res)
    })
  }
  

},
//传入订单详情表
orderDetail(res){
  let that=this
  //从表food中获取用户选中支付的菜品
  let arr=this.data.arrSelected;
  console.log(arr)
  for(let i=0;i<arr.length;i++){
    db.collection('orderDetail').add({//将菜品id信息存入orderDetail表
     data:{
       foodsId:arr[i]._id,
       count:arr[i].count,
       status:'待接单',
       orderId:res._id
     }
   })
   .then(res=>{
     console.log(res)
     console.log(this)
     this.modifyPay(arr[i]._id)
     
   })
   .catch(res=>{
     console.log('上传orderDetail表失败',res)
   })
  
 }
},

//修改foods中的销售额
modifyPay(id){
    console.log(id)
    //找到对应的菜品对其里面的销售额进行处理
    //此处数据若更新失败，请查看数据库表权限问题，自定义读写都是true就可以了
    db.collection('food').doc(id)
    .update({//将菜品id信息存入orderDetail表
     data:{
      food_sales:_.inc(1)
      //注意：如果先取再加1则会出现多个用户同时操作会出现覆盖的情况，使用inc则不会
     }
   })
   .then(res=>{
     console.log(res)
     wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
   })
   .catch(res=>{
     console.log('更新food表失败',res)
   })
},

//更新购物车缓存数组
addCart(e){
  console.log(e)
  //点击拿到要添加入购物车的商品
   //获取购物车的缓存数组
   console.log(this.data.canteen)
    var arr=wx.getStorageSync(this.data.canteen);
    console.log(arr)
    if(arr.length>0){
      //遍历购物车数组
      for(var j in arr){
        //判断购物车内的item的id和事件传递过来的id，是否相等
        if(arr[j]._id==e.currentTarget.dataset.item._id){
          if(e.detail.type=='+'){
            arr[j].count=arr[j].count+1;//相等的话且点击的是+，则数量加1
          }else if(e.detail.type=='-'){
           arr[j].count=arr[j].count-1;//相等的话且点击的是-，则数量减1
           if(arr[j].count==0){
            arr.splice(j,1)//如果数量为0则不加入购物车的缓存数组中
          }
         }
        //把购物车数据存入缓存，直接更新当前数组
        try{
          wx.setStorageSync(this.data.canteen,arr)
          console.log(arr)
          this.setData({
            arrlist:arr
          })
        }catch(e){
          console.log(e)
        }
         return //跳出循环，节约运算成本
        }
      }
    }
},

peisong:function(){//订单配送信息渲染
  let that=this
  try{
    var selected=wx.getStorageSync('selected')||0//配送地址默认为用户本身选取的缓存地址
    if(selected!==-1){
      that.setData({
          selected:selected
      })
      console.log(that.data.selected)
    }
 }
  catch(e){
    console.log(e)
  }

 try{
  var dizhi=wx.getStorageSync('dizhi')||[]
  if(dizhi.length!==0){
     that.setData({
          dizhi:dizhi
     })
    console.log(that.data.dizhi)
    let selectedDizhi=that.data.dizhi[that.data.selected]
    that.setData({
      selectedDizhi:selectedDizhi
    })
   console.log(that.data.selected)
   console.log(that.data.selectedDizhi)
   that.setData({
     address:selectedDizhi.address,
     addressControl:selectedDizhi.address,
     name:selectedDizhi.name,
     gender:selectedDizhi.gender,
     phone:selectedDizhi.phone
   })
  }else{
    that.setData({
      address:'请点击此处填入地址信息',
      addressControl:'请点击此处填入地址信息',
      name:'请点击填入收货信息',
      gender:'',
      phone:''
    })
  }
 }
  catch(e){
    console.log(e)
 }
  return;
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this
      console.log(options.canteen)
      try{//获取存储餐厅信息，从中获取本地缓存而进行渲染
         var value=wx.getStorageSync(options.canteen)
         console.log(value)
         if(value){
           that.setData({
               arrlist:value,
               canteen:options.canteen
           })
           console.log(that.data.arrlist)
         }
      }
      catch(e){
        console.log(e)
      }
  },

  addressSelected:function(){
     wx.navigateTo({
       url: '../address/address',
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
    this.peisong();
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