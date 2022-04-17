// pages/administrator/administrator.js
Page({
  data:{
     list:[],  //把数据库数据存入数组
     name:'adminPage'
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
    //云函数调用
    wx.cloud.callFunction({
      name:'administratorLogin'
    })
    .then(res=>{
        console.log('云函数获取数据成功',res.result.data)
        this.setData({
          list:res.result.data
        })  
    })
    .catch(res=>{
        console.log('云函数获取数据失败',res)
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