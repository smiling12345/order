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
   
  },

  bindPickerChange: function(e) {//收货地址
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      address:this.data.array[e.detail.value],
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
     //注意不能用arrayList===[]来判断是否是空数组，此时已经是两个对象
     let arr={address:this.data.address+' '+this.data.detailAddress,
              phone:this.data.phone,
              name:this.data.name,
              gender:this.data.gender
      }
      console.log(arr)
      //用indexOf判断数组是否存在某值，返回值为值的索引，若不存在返回-1
      //用遍历数组看对象的属性是否相同，从而判断是否含有该对象
      let flag=true;
      arrayList.forEach(item=>{
        console.log(item)
        if(item.address==arr.address&&item.phone==arr.phone&&item.name==arr.name&&item.gender==arr.gender){
            //说明已经存在该地址，则提示保存失败
            flag=false;
            return;
        }
      })
      if(flag==false){
           wx.showToast({
               title:'地址信息已存在',
               icon:'error',
               duration:2000
           })
      }else{
          let length=arrayList.length//获取缓存地址数组的长度，便于更改选中的地址
          console.log(length)
          arrayList.push(arr)
          console.log(arrayList)
          wx.setStorageSync('dizhi', arrayList)
          wx.showToast({
            title:'保存成功',
            icon:'success',
            duration:2000
          })
          wx.setStorageSync('selected',length)
          wx.navigateBack({
            url: '../address/address',
          })
      } 
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.item){//如果有数据传入，则代表是编辑地址
      const item = JSON.parse(decodeURIComponent(options.item));
      console.log(item)
      let n=0;
      let arrString=item.address.split(' ')//根据空格将字符串分割成数组
      for(let i=0;i<this.data.array.length;i++){
         if(this.data.array[i]==arrString[0]){
           n=i;
         }
      }
      this.setData({
        name:item.name,
        phone:item.phone,
        gender:item.gender,
        detailAddress:arrString[1],
        index:n,
      })
    }
    
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