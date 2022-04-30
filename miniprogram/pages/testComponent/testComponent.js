// pages/testComponent/testComponent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        person: '小明',
        phone: '13525638940',
        orderNum: '90125789236',
        component:[
          {id: 2, orderNum: 90125789236, person: '小米', phone:13532233643},
          {id: 2, orderNum: 90125789236, person: '小米', phone:13532233643},
          {id: 2, orderNum: 90125789236, person: '小米', phone:13532233643},
        ],
    },

    copy: function(e){
        wx.setClipboardData({
          data: this.orderNum,
          success: function(res){
              wx.getClipboardData({
                success:function(res){
                    wx.showToast({
                      title: '复制成功',
                    })
                }
              })
          }
        })
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