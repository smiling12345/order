// pages/evaluate/evaluate.js 
var db=wx.cloud.database();
const time = require("../utils/utils.js");//引入时间戳转换为日期的js文件
const _=db.command
let pinglun=""
let taste=0
let translate=0
let pack=0
let average=0//用于存进数据库的对于味道和配送和包装的平均分，用于显示在用户评论中
let count=0

Page({

  /**
   * 页面的初始数据
   */
  data: {
      fileList:[],
      temporary:[], //存放选择的图片的临时数组,有fileid，传给数据库使用
      dianzan:true,
      isClicked:false,
      ID:'',//orderDetail中的唯一id
      canteen:'',
      louhao:'',
      foodname:'',
      dishes:'',
      userphoto:'',
      username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
     console.log(options.Id)
     this.setData({
       ID:options.Id,
       canteen:options.canteen,
       louhao:options.louhao,
       foodname:options.foodname,
       dishes:options.dishes
     })

     this.getInformation()
  },

  getInformation(){//获得用户头像和昵称
    const app=getApp()
     var userid=app.globalData.userid
     console.log(userid)

     db.collection("user").where({
        openid:userid,
    })
    .get()
    .then(res=>{
      console.log('获取用户个人信息成功',res)
      this.setData({
        userphoto:res.data[0].userphoto,
        username:res.data[0].user_name
      })
    })
    .catch(err=>{
      console.log('获取用户个人信息失败',err)
    })
  },
  //接收星星的值
  starsnumber(e){
     console.log(e)
     if(e.currentTarget.dataset.description=="味道"){
         taste=e.detail
     }
     if(e.currentTarget.dataset.description=="包装"){
      pack=e.detail
     }
     if(e.currentTarget.dataset.description=="配送"){
        translate=e.detail
    }
    console.log(taste) 
    console.log(translate)
    console.log(pack)
    average=(taste+translate+pack)/3//string类型，存入数据库时需要改变
    average=parseInt(average.toFixed())
    console.log(typeof(average))
    
  },
  //接收推荐还是不推荐
  tuijian(){
     this.setData({
       dianzan:true
     })
  },
  nottuijian(){
    this.setData({
      dianzan:false
    })
  },
//获取用户输入的值
  getContent(event){
    console.log('获取输入的值',event.detail.value)
    pinglun=event.detail.value
  },

  //图片上传
  addImg(e){
     this.setData({
       fileList:e.detail
     })
    console.log(this.data.fileList)
  },
  deleteImg(e){
    this.setData({
      fileList:e.detail
    })
   console.log(this.data.fileList)
  },
  submit(e){
       if(this.data.isClicked==false){//控制只提交一次
          this.data.isClicked=true
          let fileList=this.data.fileList
         count=fileList.length
         if(fileList.length==0){
          this.uploadInformation()
         }
          for(let i=0;i<fileList.length;i++){
             this.uploadImg(fileList[i])
           }
          console.log(count)
       } 
  },
  //上传图片到云存储
  uploadImg(tempFile){
    let that=this
    let arr=that.data.temporary
    console.log('要上传图片的临时路径',tempFile)
    wx.cloud.uploadFile({//上传本地资源到云存储
        filePath:tempFile,
        cloudPath:'blog/'+Date.now()+'-'+Math.random()*1000000+tempFile.match(/\.[^.]+?$/)[0],//文件存储在blog中
        success:res=>{
             console.log('上传成功',res)
             arr.push(res.fileID)
             console.log(arr)
             that.setData({
               temporary:arr,
             })
             count=count-1
             console.log(count)
             if(count==0){//等图片上传完再上传信息
                this.uploadInformation()
             }
             console.log(that.data.temporary)
        },
        fail:res=>{
          console.log('上传失败',res)
          count=count-1
          if(count==0){
            this.uploadInformation()
         }
        }
      })
   },
   //上传信息到数据库中
   uploadInformation(){
     console.log(this.data.dishes)
     console.log(this.data.ID)
     var timestamp=Date.parse(new Date())
     console.log(timestamp)//将日期存入数据库
     let timeStamp=time.formatTime(timestamp, 'Y/M/D h:m:s')

      

      db.collection('orderDetail').doc(this.data.ID).update({
        data:{
          ['status']:'已评价'
        }
      })
      .then(res=>{
        console.log('修改订单状态成功',res)
      })
      .catch(res=>{
        console.log('修改订单状态失败',res)
      })
      
      db.collection('comment').add({
          data:{
             taste:taste,
             translate:translate,
             pack:pack,
             average:average,
             fileId:this.data.temporary,
             dianzan:this.data.dianzan,
             user_comment:pinglun,
             orderDetailID:this.data.ID,
             timestamp:timeStamp,
             canteen:this.data.canteen,
             louhao:this.data.louhao,
             foodname:this.data.foodname,
             dishes:this.data.dishes,
             adminComment:'',//先放置商家回复评论的空数据，后续会进行更新
             username:this.data.username,
             userphoto:this.data.userphoto
          }
      })
      .then(res=>{
         console.log('上传数据库成功',res)
         wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 1000,
          mask:true
      })
      })
      .catch(res=>{
        console.log('上传数据库失败',res)
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