// pages/edit/edit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       msg:50,
       foodName:'',
       foodPrice:'',
       multiText:'',
       flag:false,//控制显示和隐藏
       imgAddress:''
    },

    preserve(){
       
    },
    text_input(e){
        const max_length = 50;
        const d = e.detail.value;
        console.log(e.detail.value);
        let num = max_length - d.length;
        this.setData({
            msg: num
        });
      },
      foodNameInput(e){
          console.log(e.detail.value)
      },
      foodPriceInput(e){

      },

      addImg:function(){
        let that=this;
         wx.chooseImage({
           count: 1,
           success:res=>{
             console.log(res)
             that.setData({
               flag:true,
               imgAddress:res.tempFilePaths
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