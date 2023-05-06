// pages/firstPage/firstPage.js
//引入用来请求的方法 需把路径补全
//import{request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    list:[],
    //随机数组
    randomList:[],
    //导航数组
    cateList:[],
    //餐厅数组
    canteenList:[
      {
        icon:'icon-bianlidian5',
        name:"荷园",
      },
      {
        icon:'icon-bianlidian6',
        name:"稻香园"
      },
      {
        icon:'icon-24gf-store2',
        name:"莘园"
      },
      {
        icon:'icon-24gf-store',
        name:"西园"
      },
      {
        icon:'icon-a-ziyuan10',
        name:"芷园"
      },
      {
        icon:'icon-bianlidian4',
        name:"绿榕园"
      }]
  },

 

  randomData(){
    wx.cloud.database().collection('food').aggregate()
    .sample({
      size:2//随机从数据库里获取两个数据
    })
    .end().then(res=>{
      console.log(res)
      this.setData({
        randomList:res.list
      })
    })
    .catch(err=>{
      console.log('获取随机数据失败',err)
    })
  },

  lunbotu(){
    //发送异步请求获取网络轮播图数据
    wx.cloud.database().collection('lunbotu').get().then(res=>{
          console.log('获取轮播图成功',res)
          this.setData({
            list:res.data
          })
        })
        .catch(res=>{
          console.log('获取轮播图失败',res)
          this.setData({//网络请求失败获取本地图片
            list:[
              {
                 picUrl:'../../images/4.jpg'
              },
              {
                 picUrl:'../../images/6.jpg'
              }
            ]
          })
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//页面开始加载，就会触发
     this.lunbotu()
     this.randomData()

       
    },
  
   randomClick(e){//点击今日推荐图片跳转页面对应位置
    let item=e.currentTarget.dataset.item
     console.log(item)
     wx.navigateTo({
       url:'../canteen/canteen?canteen='+item.canteen+'&louhao='+item.louhao+'&dishes='+item.dishes
     })

   },

  //获取分类导航数据
  getCateList(){
    request({
      url: '',//需为合法的服务器域名 在小程序后台中添加
    })
   .then(result=>{
        this.setData({
          cateList:result.data.message
         })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {

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
  onPullDownRefresh: function () {//页面的数据或效果重新刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //需要让页面出现上下滚动才行。上拉加载下一页数据

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})