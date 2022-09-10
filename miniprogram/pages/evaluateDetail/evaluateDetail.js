// pages/evaluateDetail/evaluateDetail.js
const db=wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
     fileList:[],
     list:["全部","好评","差评","有图"],
     countList:[],//放在顶部的评分总的显示，改变按钮，顶部评分依旧不变
     select:"全部",
     taste:0,
     translate:0,
     pack:0,
     average:0,
     name:''//餐厅名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      wx.setNavigationBarTitle({//修改标题栏
        title: options.name+'-评价',
        success: function(res) {
          console.log('修改成功',res)
        }
      })

      this.setData({
        name:options.name
      })
      this.allData()
  },
  //判断选择的是全部还是好评、差评、有图等来渲染页面
  select(e){
    console.log(e)
    item=e.currentTarget.dataset.item
    if(item=="全部"){
        this.setData({
          select:"全部"
        })
        this.allData()
    }else  if(item=="好评"){
      this.setData({
        select:"好评"
      })
      this.goodData()
    }else if(item=="差评"){
      this.setData({
        select:"差评"
      })
      this.badData()
    }else if(item=="有图"){
      this.setData({
        select:"有图"
      })
      this.hasImage()
    }
  },
  //获取全部评论数据库的数据
  allData(){
     db.collection('comment').where({
       canteen:_.eq(this.data.name)
     }).get()
     .then(res=>{
       console.log('获取数据库成功',res.data)
       this.setData({
         fileList:res.data,
         countList:res.data
       })
       this.countAll()
       console.log(this.data.fileList)
     })
     .catch(res=>{
       console.log('获取数据库失败',res)
     })
  },
  //计算评分数据
  countAll(){
    let countList=this.data.countList
    let taste=0
    let translate=0
    let pack=0
    let average=0
    for(let i=0;i<countList.length;i++){
       taste+=countList[i].taste
       translate+=countList[i].translate
       pack+=countList[i].pack
       average+=countList[i].average
    }
    console.log(countList)
    taste=taste/countList.length
    translate=translate/countList.length
    pack=pack/countList.length
    console.log(average)
    average=average/countList.length
    console.log(average)
    this.setData({
      taste:taste.toFixed(),
      translate:translate.toFixed(),
      pack:pack.toFixed(),
      average:average.toFixed()
    })
    console.log(this.data.average)
  },
  //获取好评的评论数据库数据，以dianzan这条来划分好评还是差评
  goodData(){
    db.collection('comment')
    .where({
      canteen:_.eq(this.data.name),
      dianzan:_.eq(true)
    }).get()
    .then(res=>{
      console.log('获取数据库成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据库失败',res)
    })
  },
  //获取差评的评论数据库数据
  badData(){
    db.collection('comment')
    .where({
      canteen:_.eq(this.data.name),
      dianzan:_.eq(false)
    }).get()
    .then(res=>{
      console.log('获取数据库成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据库失败',res)
    })
  },
  //获取是否有图的数据库数据，以fileId是否为空
  hasImage(){
    db.collection('comment')
    .where({
      canteen:_.eq(this.data.name),
      fileId:_.neq([])
    }).get()
    .then(res=>{
      console.log('获取数据库成功',res.data)
      this.setData({
        fileList:res.data
      })
      console.log(this.data.fileList)
    })
    .catch(res=>{
      console.log('获取数据库失败',res)
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