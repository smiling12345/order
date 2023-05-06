// pages/address/address.js
const db=wx.cloud.database()
const $=db.command.aggregate
Page({
  /**
   * 页面的初始数据
   */
  data: {
        leftCur:0,//默认选中
        dizhi:[]//存储所有地址对象的数组，从dizhi的本地缓存中读取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  bianji:function(e){//用catchtap阻止事件冒泡，防止点击编辑按钮会影响默认选中
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      //传递的数据如果是一个对象，则需要序列化
      url: '../newAddress/newAddress?item='+encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item)),
    })
  },
    selected:function(e){
     console.log(e.currentTarget.dataset.index)
     this.setData({//为了点击时，页面能跟随变化
       leftCur:e.currentTarget.dataset.index
     })
     wx.setStorageSync('selected', e.currentTarget.dataset.index)
   },

   //删除某个缓存地址
   delete:function(e){
     //得到某个需要删除地址的下标，从缓存数组中删除
      console.log(e.currentTarget.dataset.index)
      var arr=wx.getStorageSync('dizhi')
      let index=e.currentTarget.dataset.index;
      let that=this

      wx.showModal({
        title:'提示',
        content:'是否确认删除此地址',
        success:function(res){
           if(res.confirm){//用户点了确定之后
             console.log('用户点击确定')
             arr.splice(index,1)//splice方法改变原数组
             console.log(arr)
             wx.setStorageSync('dizhi', arr)
             that.setData({//渲染页面数据改变
                  dizhi:arr,
                  leftCur:--that.data.leftCur
               })
             wx.setStorageSync('selected', that.data.leftCur)

           }else{//用户点了取消之后
              console.log('用户点击取消')
           }
        }
      })

     
      
      
   },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try{
      var value=wx.getStorageSync('dizhi')
      if(value){
        console.log('获取缓存地址成功',value)
      }
    }catch(e){
      console.log('获取缓存失败',e)
    }
    console.log(value)
    this.setData({
      dizhi:value
    })
    console.log(this.data.dizhi)

    //本地存储，为了响应做出的改变，不至于编译后失效
      let selected=wx.getStorageSync('selected')||0
      console.log(selected)
      this.setData({
        leftCur:selected
      })
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