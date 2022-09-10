// pages/user-login/user-login.js
const db=wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
     isLogged:false,//判断是否登录过了，默认未登录过，若登录过则点击用户登录时直接跳转，否则需要跳转上传用户信息页面
  },

  logged(userid){//查看数据库user的openid和全局的userid是否相等，若相等，则表示登录过了
    console.log(userid)
    db.collection('user').where({
 
        openid:_.eq(userid)

    }).get()
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
        
        
  },

  goNext:function(){
       const app=getApp()
        var userid=app.globalData.userid
        console.log(userid)
        this.logged(userid)

  /*  wx.navigateTo({
      url: '../personLogin/personLogin',
    })*/
  },
  

  //跳转至管理员登陆页面
  adminLogin(){
    wx.navigateTo({
      url: '../administrator/administrator',
    })
  },
  //跳转至骑手登陆界面
  riderLogin(){
    wx.navigateTo({
      url: '../rider/rider',
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