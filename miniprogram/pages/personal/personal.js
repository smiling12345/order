// pages/personal/personal.js
var app=getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      username:"",
      openid:'',
      userphoto:''
  },

  getInformation(){//从数据库中获取相应的头像和昵称信息
    db.collection("user").where({
      data:{
        openid:this.data.openid,
      }
    })
    .get()
    .then(res=>{
      console.log('获取用户个人信息成功',res)
    })
    .catch(err=>{
      console.log('获取用户个人信息失败',err)
    })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
     var userid=app.globalData.userid
     console.log(userid)
     this.setData({
       openid:userid
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