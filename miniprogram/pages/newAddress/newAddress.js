// pages/newAddress/newAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['泰山区','华山区','黑山区','启林南','启林北'],  //收货地址
    index:0,
    gender:'先生',
    max:14,  //控制输入字数最大值
    currentNumber:0,  //详细地址当前字数
    maxName:7,  //输入姓名最大值
    currentName:0,  //名字当前输入字数
    phone:'',
    address:'泰山区',
    detailAddress:'',
    name:'',
    arraylist:{}  //存储信息，以便存到本地存储中

  },

  bindPickerChange: function(e) {//收货地址
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      address:this.data.array[this.data.index]
    })
    console.log(this.data.address)
    //console.log(this.data.array[this.data.index])  
  },

  getIphone:function(options){
     let phone=options.detail.value;
     this.setData({
       phone:phone
     })
     console.log(this.data.phone)
  },

  getName:function(e){
    let name=e.detail.value;
    console.log("输入的姓名为"+name)
    var len=name.length
    this.setData({
      currentName:len,
      name:name
   })
   
 },
 getAddress:function(e){
  let address=e.detail.value;
  var len=address.length
  console.log('输入地址的长度',len)
  this.setData({
     currentNumber:len,
     detailAddress:address
  })
  console.log("输入的地址为"+address)
},
/* */
Getgender:function(e){
    this.setData({
      gender:'先生'
    })
},
Getgender2:function(e){
  this.setData({
    gender:'女士'
  })
},

//留待改善
preserve(e){//点击保存后若手机号校验成功则弹出保存成功，且清除页面信息，保存信息到本地缓存
  //若手机号校验失败则保留当前信息，弹出提示信息表示手机号不合法

  if(this.data.name==0||this.data.address==0||this.data.phone==0||this.data.detailAddress==0){
    wx.showToast({
      title: '信息不能留空',
      icon:'error',
      duration:1500
    })
    return false
  }
  console.log(e)
  console.log(e.currentTarget.dataset.phone)
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if(!myreg.test(e.currentTarget.dataset.phone)){//校验不正确
    wx.showToast({
      title: '手机号不合法',
      icon:'error',
      duration:1500
    })
    return false
  }else{
     let arrayList=wx.getStorageSync('dizhi')||[]
     console.log(arrayList)
     if(arrayList.length==0){//注意不能用arrayList===[]来判断，此时已经是两个对象
       let arr={address:this.data.address,phone:this.data.phone}
       arrayList.push(arr)
       console.log(arrayList)
     }else{
      // let len=arr.length
      // arr[len].push(this.data.address)
      // arr[len].push(this.data.phone)
      console.log('已有数组')
     }
     
     console.log(arrayList)
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