// pages/orderDetails/orderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img : 'https://tse1-mm.cn.bing.net/th/id/OIP-C.y7Wi-4tbRUbQQtz660l02gHaLH?w=184&h=276&c=7&r=0&o=5&dpr=1.24&pid=1.7',
    address: '泰山区10栋101',
    time: '明天10:30~11:00',//送达时间
    money: '1.5元',  //配送费
    remark: '',   //订单备注
    packMony: '0.5元', //打包费
    discount: '2元', //优惠价格
    sumPrice: '9.5元' //合计
  },

  //更新订单备注
  OrderNotes(e){
    this.setData({
      remark : e.detail.value
    })
  },
  shopping: function (options) {
    wx.navigateTo({
          url: '../canteen/canteen',//要跳转到的页面路径
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