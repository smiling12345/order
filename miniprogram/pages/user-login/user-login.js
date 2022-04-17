// pages/user-login/user-login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goNext:function(){
    wx.switchTab({
      url: '../personal/personal',
    })
  },
  
  login:function(e){
    wx.getUserProfile({
       desc:'展示用户信息',//声明获取用户个人信息后的用途，后续会展示在弹窗中
       success:(xx)=>{
         let userInfo=xx.userInfo;
         console.log(userInfo)
         if(!this.data.login&&userInfo){
              wx.showLoading({
                  title:'登陆中'
              })
             /* wx.cloud.database().collection('user').add({
                data:{
                  userinfo:{

                  }
                }
              })*/
         }
       }
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