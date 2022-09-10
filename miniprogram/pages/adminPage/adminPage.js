// pages/adminPage/adminPage.js
const db = wx.cloud.database()
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,//控制选择顶部 商品管理 订单管理 用户评价
      selected:'新订单',//控制订单管理的选择 新订单还是已完成
      list:[
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "12:00-12:30",
        "16:30-17:00",
        "17:00-17:30",
        "17:30-18:00",
        "18:00-18:30",
      ],
      evaluationSelect:'全部',
      canteen:'',
      louhao:'',
      dishes:'',
      arr:[]//装商品管理数据的数组
  },

  //商品管理
  shop(e){
    console.log(e)
    this.setData({
      currentTab:0
    })
  },
  //订单管理
  order(e){
    console.log(e)
    this.setData({
      currentTab:1
    })
  },
  //用户评价
  evaluate(e){
    console.log(e)
    this.setData({
      currentTab:2
    })
  },

  newOrder(){
     this.setData({
       selected:'新订单'
     })
  },
  alreadyOrder(){
    this.setData({
      selected:'已完成'
    })
  },
  new(){
     this.setData({
        evaluationSelect:'新消息'
     })
  },
  all(){
    this.setData({
      evaluationSelect:'全部'
   })
  },
  //添加新商品
  addNewshop(){
      wx.navigateTo({
        url: '../edit/edit',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
     this.setData({
       canteen:options.canteen,
       louhao:options.louhao,
       dishes:options.dishes
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
     db.collection('food').where({
        canteen:'荷园',
        louhao:'一楼',
        dishes:'其他'
     }).get()
     .then(res=>{
       console.log('获取数据库成功',res.data)
       this.setData({
         arr:res.data
       })
     })
     .catch(res=>{
       console.log('获取数据库失败',res)
     })
     
     
     
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