// pages/canteen/canteen.js
const db=wx.cloud.database()
const $=db.command.aggregate
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
      tabs:[],
      tabCur:0,//默认选中
      lefts:[],
      leftCur:0,
      rights:[],
      type:'+',
      goods:{
        
      },
      numall:0,//加入购物车的商品件数
      showModel:false,
      bgcolor:'一楼',
      select:false,
      name:''//餐厅的名字，选择存入哪个餐厅的本地存储
  },

  searchTo(){
    wx.navigateTo({
      url:"/pages/search/search?canteen="+this.data.name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    
    wx.setNavigationBarTitle({//修改标题栏
      title: options.canteen,
      success: function(res) {
        console.log('修改成功',res)
      }
    })

    this.setData({
      name:options.canteen,
    })
      //显示{name:'X园'}，用其进行数据库数据选取
      console.log(this.data.name)
      db.collection('food').aggregate()
      .match({
        canteen:_.eq(this.data.name)
      })
      .group({
           _id:'$louhao'   //依据楼号进行分组
       })
       .end()
        .then(res=>{   //异步 暂缓执行
          console.log('楼号列表',res.list.sort())
          this.setData({
            tabs:res.list.sort()
          })
          this.dishes()
        })
        .catch(res=>{
          console.log('获取楼号失败',res)
        }
        )
  },

  //加载当前的菜式窗口
  dishes(){
    let louhao=this.data.tabs[this.data.tabCur]._id
    db.collection('food').aggregate()
      .match({
        louhao,
        canteen:_.eq(this.data.name)
      })
      .group({
         _id:'$dishes'
      })
      .end()
      .then(res=>{
          console.log(louhao+' 菜式窗口',res)
          this.setData({
            lefts:res.list
          })
          this.food()
      })
      .catch(res=>{
        console.log('获取菜式失败',res)
      })
  },
  food(){
     let louhao=this.data.tabs[this.data.tabCur]._id
     let dishes=this.data.lefts[this.data.leftCur]._id
     db.collection('food')
      .where({
        louhao,
        dishes,
        canteen:_.eq(this.data.name)
      }).get()
      .then(res=>{
        console.log(louhao+dishes+' 菜品',res)
        this.setData({
           rights:res.data
        })
        this.getData()
        console.log('数据',this.data.rights)
        this.countall()
      })
      .catch(res=>{
         console.log('获取菜品失败',res)
      })
  },
  //顶部选择分类条目
  tabSelect(){
    this.setData({
      bgcolor:'一楼'
    })
    for(var i=0;i<this.data.tabs.length;++i){
      if(this.data.tabs[i]._id==="一楼"){
        this.data.tabCur=i;
      }
    }
    console.log('一楼点击成功')
    this.dishes()
  },

  tabSelect2(e){
    this.setData({
      bgcolor:'二楼'
    })
    for(var i=0;i<this.data.tabs.length;++i){
      if(this.data.tabs[i]._id==="二楼"){
        this.data.tabCur=i;
      }
    }
    console.log('二楼点击成功')
    this.dishes()
  },

  tabSelect3(e){
    this.setData({
      bgcolor:'三楼'
    })
    for(var i=0;i<this.data.tabs.length;++i){
      if(this.data.tabs[i]._id==="三楼"){
        this.data.tabCur=i;
      }
    }
    console.log('三楼点击成功')
    this.dishes()
  },
  //左侧条目选择
  switchLeftTab(e){
    let index=e.target.dataset.index;
    this.setData({
      leftCur:index
    },success=>{
      this.food()
    }) 
  },
  pingjia(e){
      console.log(e)
      this.setData({
        select:true
      })
      wx.navigateTo({
        url:"../evaluateDetail/evaluateDetail?name="+e.currentTarget.dataset.name
      })
  },

  canteenClose(e){
    console.log(1)
     this.setData({
      showModel:false
     })
  },

  //加入购物车逻辑
  /*1.拿到点击要添加入到购物车的商品
    2.判断该商品在不在购物车里面
    3.如果不在，则把该商品添加到购物车里面，并且新加一个字段 num=1
    4.如果在，修改商品的num值 

   */
 addCart(e){
   //点击拿到要添加入购物车的商品
    e.currentTarget.dataset.item.type=e.detail.type;//对购物车商品数量进行加或减的判断
    this.data.goods=e.currentTarget.dataset.item//放入本地数据
    //获取购物车的缓存数组(没有数据，则赋予一个空数组)
     var arr=wx.getStorageSync(this.data.name)||[];//'cart'
     console.log(arr)
     if(arr.length>0){
       //遍历购物车数组
       for(var j in arr){
         //判断购物车内的item的id和事件传递过来的id，是否相等
         if(arr[j]._id==this.data.goods._id){
           if(this.data.goods.type=='+'){
             arr[j].count=arr[j].count+1;//相等的话且点击的是+，则数量加1
           }else if(this.data.goods.type=='-'){
            arr[j].count=arr[j].count-1;//相等的话且点击的是-，则数量减1
            if(arr[j].count==0){
              arr.splice(j,1)//如果数量为0则不加入购物车的缓存数组中
            }
          }
             
         //把购物车数据存入缓存，直接更新当前数组
         try{
           wx.setStorageSync(this.data.name,arr)
           console.log(arr)
           this.countall();
         }catch(e){
           console.log(e)
         }
          return //跳出循环，节约运算成本
         }
       }
       //遍历完购物车，没有对应的item项，则把当前item项放入购物车数组，并增加字段值
       this.data.goods.count=1;
       arr.push(this.data.goods)
       console.log(arr)
     }else{
       this.data.goods.count=1;
       arr.push(this.data.goods)
       console.log(arr)
     }
     //最后，把购物车数据存放入缓存
     try{
       wx.setStorageSync(this.data.name,arr)   
       this.countall();
       return
     }catch(e){
       console.log(e)
     }
 },

 //将缓存数据放入页面，渲染相关数据
 getData(){
   var that=this
    var arr=wx.getStorageSync(this.data.name)
    console.log(arr)
    for(var i in this.data.rights){
      for(var j in arr){
        if(this.data.rights[i]._id===arr[j]._id){
            this.data.rights[i].num=arr[j].count
            that.setData({
                 rights:this.data.rights
            })
        }
      }
    }
 },

 countall(){
     var arr=wx.getStorageSync(this.data.name)
     let data=0
     console.log(arr)
     for(var i in arr){
       data+=arr[i].count
     }
     this.setData({
       numall:data
     })
 },

 maskShow(e){
   this.setData({
    showModel:true
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
      this.getData()
      this.countall()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   // this.countall()
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