// pages/adminPage/adminPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,//控制选择顶部 商品管理 订单管理 用户评价
      select:'新订单',//控制订单管理的选择 新订单还是已完成
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