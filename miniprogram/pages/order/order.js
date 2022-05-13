// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       tabs:['全部','待评价','退款','进行中'],
       currentTab:0,
       list:[],//装order和orderDetail的联合表信息的数组
  },
  //选中顶部导航栏
  selectTab(event){
    this.setData({
      currentTab:event.currentTarget.dataset.index
    })
  },
  //跳转评价页面
 pingjia(e){
   console.log(e)
   console.log(e.currentTarget.dataset.item._id)//获得orderDetail里的商品唯一id
    wx.navigateTo({
      url: '../evaluate/evaluate?Id='+e.currentTarget.dataset.item._id
    })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
    //调用云函数
    wx.cloud.callFunction({
      // 自己定义的云函数名称
      name: 'order',
      success: function(res) {
      //这里的res就是云函数的返回值
        console.log(res) 
        that.setData({
           list:res.result.list
        })
        console.log(that.data.list)
      },
      fail: console.error
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