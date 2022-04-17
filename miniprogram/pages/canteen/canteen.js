// pages/canteen/canteen.js
const db=wx.cloud.database()
const $=db.command.aggregate


Page({
  /**
   * 页面的初始数据
   */
  data: {
      tabs:[],
      tabCur:3,//默认选中
      lefts:[],
      leftCur:0,
      rights:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('food').aggregate()
    .group({
         _id:'$louhao'   //依据楼号进行分组
     })
     .end()
      .then(res=>{   //异步 暂缓执行
        console.log('楼号列表',res)
        this.setData({
          tabs:res.list
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
        louhao
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
        dishes
      }).get()
      .then(res=>{
        console.log(louhao+dishes+' 菜品',res)
        this.setData({
           rights:res.data
        })
      })
      .catch(res=>{
         console.log('获取菜品失败',res)
      })
  },
  //顶部选择分类条目
  tabSelect(){
    for(var i=0;i<this.data.tabs.length;++i){
      if(this.data.tabs[i]._id==="一楼"){
        this.data.tabCur=i;
      }
    }
    console.log('一楼点击成功')
    this.dishes()
  },

  tabSelect2(e){
    for(var i=0;i<this.data.tabs.length;++i){
      if(this.data.tabs[i]._id==="二楼"){
        this.data.tabCur=i;
      }
    }
    console.log('二楼点击成功')
    this.dishes()
  },

  tabSelect3(e){
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