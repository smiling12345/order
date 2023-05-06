// pages/testComponent/testComponent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      user:'骑手',
      rider:{},//骑手信息
      list:[
        "10：30-11：00",
        "11：00-11：30",
        "11：30-12：00",
        "12：00-12：30",
        "16：30-17：00",
        "17：00-17：30",
        "17：30-18：00",
        "18：00-18：30",
      ],
      currentTab:0,//控制选择顶部  新订单 进行中 已完成
      statuThird:'菜品制作完成',//对应于新订单
      statuFour:'骑手已接单',//对应于进行中
      statuFive:'骑手已送达目的地',//对应于已完成
      statuSix:'用户已取餐',//对应于已完成
      deliver:'配送',

      newArr:[],
      orderIng:[],
      alreadyOrder:[],
      customOrder:[],
        
    },

    copy: function(e){
       console.log(e)
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

    orderAdmin(statuOrder){//1.封装数据请求方法（异步）
      let that=this
      return wx.cloud.callFunction({//对应的是商家已完成订单
        name:'status',
        data:{
          canteen:that.data.canteen,
          louhao:that.data.louhao,
          dishes:that.data.dishes,
          status:statuOrder
        }
      })
    },
  async asyncFn(orderStatu){//2.通过async/await去操作得到的Promise对象
  //await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；
  //如果不是Promise对象：把这个非promise的东西当做await表达式的结果。
     try{
          let returnData=await this.orderAdmin(orderStatu)
          console.log(returnData.result)
          return returnData.result
     }catch(e){
       console.log(e)
     }
  },

    //新订单
    newOrder(e){
        let that=this
        console.log(e)

        this.setData({
          currentTab:0,
        })
        that.asyncFn(that.data.statuThird,that.data.deliver).then(res=>{
          console.log(res)
          that.setData({
            newArr:res
          })
        })

        
    },
    orderIng(e){//进行中
      let that=this

      console.log(e)
      this.setData({
        currentTab:1,
      })

      that.asyncFn(that.data.statuFour).then(res=>{
        console.log(res)
        that.setData({
          orderIng:res
        })
      })
    },
    //已完成订单
    alreadyOrder(e){
      let that=this
       
      console.log(e)
      this.setData({
        currentTab:2,
      })
      that.asyncFn(that.data.statuFive).then(res=>{
        console.log(res)
        that.setData({
          alreadyOrder:res
        })
      })

        that.asyncFn(that.data.statuSix).then(res=>{
          console.log(res)
          that.setData({
            customOrder:res
          })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that=this
      console.log(options)
      this.setData({
        rider:options
      })

      this.asyncFn(this.data.statuThird,this.data.deliver).then(res=>{
        console.log(res)
        that.setData({
          newArr:res
        })
      })

      this.asyncFn(this.data.statuFour).then(res=>{
        console.log(res)
        that.setData({
          orderIng:res
        })
      })

      this.asyncFn(this.data.statuFive).then(res=>{
        console.log(res)
        that.setData({
          alreadyOrder:res
        })
      })

      this.asyncFn(this.data.statuSix,this.data.deliver).then(res=>{
        console.log(res)
        that.setData({
          customOrder:res
        })
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
      this.asyncFn(this.data.statuThird,this.data.deliver).then(res=>{
        console.log(res)
        that.setData({
          newArr:res
        })
      })

      this.asyncFn(this.data.statuFour).then(res=>{
        console.log(res)
        that.setData({
          orderIng:res
        })
      })

      this.asyncFn(this.data.statuFive).then(res=>{
        console.log(res)
        that.setData({
          alreadyOrder:res
        })
      })

      this.asyncFn(this.data.statuSix,this.data.deliver).then(res=>{
        console.log(res)
        that.setData({
          customOrder:res
        })
      })
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