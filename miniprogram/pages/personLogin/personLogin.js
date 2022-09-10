// pages/personLogin/personLogin.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    name:'',
    userid:'',
    userphoto:'',
    imgrl:''
  },

  fakeCallback(){},

  onChooseAvatar(e) {
    console.log(e)
    const  avatarUrl  = e.detail.avatarUrl 
    this.setData({
      avatarUrl,
    })
  },
  formSubmit(e){
    console.log(e)
      console.log(e.detail.value.input)
      this.setData({
        name:e.detail.value.input
      })
      var that=this;
      console.log(this.data.avatarUrl)
      wx.cloud.uploadFile({
              //存储在user下
          cloudPath:'user/'+(new Date()).valueOf()+'.png',//文件名
          filePath:that.data.avatarUrl,//文件路径
          success:res=>{
            //get resource ID
            console.log(res.fileID)
            //赋值图片
            that.setData({
              imgrl:res.fileID
            })
            that.upload(res.fileID)
          },
          fail:err=>{
            console.log(err)
          }
        })
        
    
     
    },

    upload(filepath){
      console.log(filepath)
      db.collection("user").add({
        data:{
        user_name:this.data.name,
        userphoto:filepath,
        openid:this.data.userid,
        _createTime:Date.parse(new Date())
        }
      }).then(res=>{
        console.log('存储数据库成功',res)
        wx.showToast({
          title: '登录成功',
          icon:'success',
          duration:2000
        })
        //wx.navigateTo是跳转其他页面，wx.switchTab是跳转到导航页面
        wx.switchTab({
          url: '../personal/personal',
        })
      })
      .catch(res=>{
          console.log('存入数据库失败',res)
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     const app=getApp()
     var userid=app.globalData.userid
     console.log(userid)
     this.setData({
       userid:userid
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