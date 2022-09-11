// pages/myevaluate/myevaluate.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获得用户头像和昵称
      const app=getApp()
       var userid=app.globalData.userid
       console.log(userid)

       let that=this
  
       db.collection("comment").where({
          _openid:userid,
      })
      .get()
      .then(res=>{
        console.log('获取用户个人评论成功',res)
        that.setData({
            arr:res.data
        })
      })
      .catch(err=>{
        console.log('获取用户个人评论失败',err)
      })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})