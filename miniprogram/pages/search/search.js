// pages/search/search.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     searchKey:'',//搜索词
     searchResultArr:[],//搜索时模糊匹配的数组
     hotSearchArr:[],//热门搜索的数组
     searchHistoryArr:[],//装历史搜索的数据
     show:false,//显示和隐藏搜索时的下拉框，开始是默认隐藏
     arrObject:[],//查询相应食物的数组
     showFood:false,//显示查找的食物，开始是默认隐藏
     inputValue:'',//输入框的显示搜索内容
     canteen:'',//获取是哪个园的数据库
     numall:0,//加入购物车的商品件数
     goods:{

     }
  },

  judge(arrObj,canteen){//判断数据在缓存中是否存在，若存在，直接使用
    var arr=wx.getStorageSync(canteen)
    console.log(arr)

     for(var j in arr){
        if(arrObj._id===arr[j]._id){
            arrObj.num=arr[j].count
        }
      }
    return arrObj
  },

  //获取用户输入的内容
  getSearch(e){ 
    this.setData({
      searchKey:e.detail.value,
      show:true,
      showFood:false
    })

    console.log(e)
    let that=this
    wx.cloud.callFunction({//获得模糊搜索下拉框
      name:'search',
      data:{
        searchKey:e.detail.value,
        canteen:that.data.canteen
      }
    }).then(res=>{
      console.log(res)
      that.setData({
        searchResultArr:res.result.data
      })
    }).catch(err=>{
      console.log(err)
    })
   
  },
  //触发搜索事件
  goSearch(){
    let that=this
    this.setData({
      show:false,
      showFood:true
    })

     //获得输入的数据
    let searchKey=this.data.searchKey
    console.log(searchKey)

    //将输入的数据放入food数据库中进行模糊查询
    wx.cloud.callFunction({
      name:'search',
      data:{
        searchKey:searchKey,
        canteen:this.data.canteen
      }
    }).then(res=>{
      console.log(res)
      let arrObject=res.result.data
       for(let i=0;i<arrObject.length;i++){
           that.judge(arrObject[i],that.data.canteen)
       }
       that.setData({
        arrObject:arrObject
       }) 
       
    }).catch(err=>{
      console.log(err)
    })

   
   

    //将搜索的内容存入缓存数据，到时候可以取出来
    if(searchKey&&searchKey.length>0){
       //获取搜索历史的缓存数组(没有数据，则赋予一个空数组)
     var arr=wx.getStorageSync('history'+this.data.canteen)||[];
     console.log(arr)
       let searchResult=false//默认搜索的内容未存在
       for(var j in arr){
         if(arr[j]==searchKey){//若存在设为存在
            searchResult=true;
         }
       }
       //若搜索的内容在搜索历史中未存在，则push进搜索历史数组里
       if(searchResult==false){
          arr.push(searchKey)
          //把数据存入缓存，直接更新当前数组
          try{
            wx.setStorageSync('history'+this.data.canteen,arr)
            console.log(arr)
           }catch(e){
            console.log(e)
          }
        }
      }else{
        wx.showToast({
          title: '搜索词为空',
          icon: 'none',
        });
      }

      console.log(searchKey)
      //存入热门搜索的数据库中，以便分析热搜词
      //要注意数据读写权限问题！！！
      db.collection('hotSearch').where({
        searchKey:searchKey,
        canteen:this.data.canteen
      }).get()
      .then(res=>{
          console.log(res.data)
          if(res.data.length!==0){//若数据存在
             wx.cloud.callFunction({
               name:'hotSearch',
               data:{
                 amount:1,
                 searchKey:searchKey,
                 canteen:that.data.canteen
               },
               success:res=>{
                 console.log(res)
               },
              fail:err=>{
                console.log(err)
              }
             })
          }else{
            wx.cloud.callFunction({
               name:'hotSearch',
               data:{
                 amount:0,
                 searchKey:searchKey,
                 canteen:that.data.canteen
               },
               success:res=>{
                 console.log(res)
               },
              fail:err=>{
                console.log(err)
              }
             })
          }
        })
        .catch(err=>{
          console.log(err)
        })
  },

  getHistory(){//获得历史搜索数据显示
    var arr=wx.getStorageSync('history'+this.data.canteen)||[];
    this.setData({
      searchHistoryArr:arr
    })
  },

  selectKey(keyboard){//传参为点击的词，将点击的词传到输入框中
     this.setData({
       inputValue:keyboard,
     })
  },

  ClickHotSearchItem(key){
     this.setData({//点击代表搜索
       searchKey:key
     })
     this.goSearch()
     this.selectKey(key)
  },

  clickAll(e){
     console.log(e)
     this.ClickHotSearchItem(e.currentTarget.dataset.text)
  },

  hotTop(){//热门排行显示，取出查询次数最多的前10个搜索词
    let that=this;

    db.collection('hotSearch')
     .aggregate()
     .match({
       canteen:that.data.canteen
     })
     .sort({//从大到小排序
       num:-1
     })
     .limit(10)
     .end()
     .then(res=>{
       console.log(res)
       that.setData({
         hotSearchArr:res.list
       })
     })
     .catch(err=>{
       console.log(err)
     })
  },

ClickResultItem(e){//点击搜索的词
  console.log(e)
  this.ClickHotSearchItem(e.currentTarget.dataset.text.food_name)
},



addCart(e){
     console.log(e)
     console.log(this.data.canteen)
     //点击拿到要添加入购物车的商品
    let type=e.detail.type;//对购物车商品数量进行加或减的判断
    this.data.goods=e.currentTarget.dataset.text//放入本地数据
    //获取购物车的缓存数组(没有数据，则赋予一个空数组)
     var arr=wx.getStorageSync(this.data.canteen)||[];//'cart'
     console.log(arr)
     if(arr.length>0){
       //遍历购物车数组
       for(var j in arr){
         //判断购物车内的item的id和事件传递过来的id，是否相等
         if(arr[j]._id==this.data.goods._id){
           if(type=='+'){
             arr[j].count=arr[j].count+1;//相等的话且点击的是+，则数量加1
           }else if(type=='-'){
            arr[j].count=arr[j].count-1;//相等的话且点击的是-，则数量减1
            if(arr[j].count==0){
              arr.splice(j,1)//如果数量为0则不加入购物车的缓存数组中
            }
          }
             
         //把购物车数据存入缓存，直接更新当前数组
         try{
           wx.setStorageSync(this.data.canteen,arr)
           console.log(arr)
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
       wx.setStorageSync(this.data.canteen,arr)   
       return
     }catch(e){
       console.log(e)
     }  
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.getHistory();
       this.hotTop();
       console.log(options)
       this.setData({
         canteen:options.canteen
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
     this.getHistory()
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