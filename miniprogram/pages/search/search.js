// pages/search/search.js
const db=wx.cloud.database()
let searchKey=''
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户输入的内容
  getSearch(e){
    searchKey=e.detail.value
  },
  //触发搜索事件
  goSearch(){
    if(searchKey&&searchKey.length>0){
       //搜索的触发
       db.collection('food').where({
         food_name:db.RegExp({//在food表搜索name字段
           regexp:searchKey,
           options:'i'//不区分大小写
         })
       }).get()
       .then(res=>{
         console.log('搜索成功',res)
       })
       .catch(res=>{
         console.log('搜索失败',res)
       })
    }else{
      wx.showToast({
        title: '搜索词为空',
        icon: 'none',
      });
        
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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