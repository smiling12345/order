// pages/administrator/administrator.js
Page({
  data:{
     list:[],  //把登录数据库数据存入数组
     name:'adminPage',
     //用于渲染页面 [['荷园','西园','芷园','莘园','稻香园','绿榕园'], ['一楼','二楼','三楼'],['其他','大众菜']]
     multiArray: [],
     multiIndex: [0, 0, 0],
     //存储所有food的餐厅（荷园、西园...）以及相对应的楼号以及相对应的窗口信息的菜品对象的数组
     array:[]
  },

  bindMultiPickerChange: function (e) {//点击确定，才会响应，改变数组，从而影响渲染结果
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = this.getArray(0,0)[0];
            data.multiArray[2] = this.getArray(0,0)[1];
            break;
          case 1:
            data.multiArray[1] = this.getArray(1,0)[0];
            data.multiArray[2] = this.getArray(1,0)[1];
            break;
          case 2:
            data.multiArray[1] = this.getArray(2,0)[0];
            data.multiArray[2] = this.getArray(2,0)[1];
            break;
          case 3:
            data.multiArray[1] = this.getArray(3,0)[0];
            data.multiArray[2] = this.getArray(3,0)[1];
            break;
          case 4:
            data.multiArray[1] =this.getArray(4,0)[0];
            data.multiArray[2] =this.getArray(4,0)[1];
            break;
          case 5:
            data.multiArray[1] = this.getArray(5,0)[0];
            data.multiArray[2] = this.getArray(5,0)[1];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = this.getArray(0,0)[1]
                break;
              case 1:
                data.multiArray[2] = this.getArray(0,1)[1];
                break;
              case 2:
                data.multiArray[2] = this.getArray(0,2)[1];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = this.getArray(1,0)[1];
                break;
              case 1:
                data.multiArray[2] = this.getArray(1,1)[1];
                break;
              case 2:
                data.multiArray[2] = this.getArray(1,2)[1];
                break;
            }
            break;
          case 2:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = this.getArray(2,0)[1];
                  break;
                case 1:
                  data.multiArray[2] = this.getArray(2,1)[1];
                  break;
                case 2:
                  data.multiArray[2] = this.getArray(2,2)[1];
                  break;
              }
              break;
        case 3:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = this.getArray(3,0)[1];
                break;
              case 1:
                data.multiArray[2] = this.getArray(3,1)[1];
                break;
              case 2:
                data.multiArray[2] = this.getArray(3,2)[1];
                break;
            }
            break;
        case 4:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = this.getArray(4,0)[1];
                  break;
                case 1:
                  data.multiArray[2] = this.getArray(4,1)[1];
                  break;
                case 2:
                  data.multiArray[2] = this.getArray(4,2)[1];
                  break;
              }
              break;
           case 5:
                switch (data.multiIndex[1]) {
                  case 0:
                    data.multiArray[2] = this.getArray(5,0)[1];
                    break;
                  case 1:
                    data.multiArray[2] = this.getArray(5,1)[1];
                    break;
                  case 2:
                    data.multiArray[2] = this.getArray(5,2)[1];
                    break;
                }
                break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },

getArray:function(j,m){//j参数代表西园，芷园。。m参数代表楼号
            let array=this.data.array
            let arrayFirst=[]
            let arraySecond=[]
            for(let i=0;i<array.length;i++){
               if(array[i].canteen==this.data.multiArray[0][j]){
                   arrayFirst.push(array[i].louhao)
                   if(array[i].louhao==arrayFirst[m]){
                     arraySecond.push(array[i].dishes)
                   }
               }
            }
            return [[...new Set(arrayFirst)],[...new Set(arraySecond)]]
            //结合set进行数组的去重
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
//云函数调用
wx.cloud.callFunction({
  name:'food'
})
.then(res=>{
    console.log('云函数获取数据成功',res.result.data)
    let arr=[]
    let multiArray=[];
    multiArray.push(['荷园','西园','芷园','莘园','稻香园','绿榕园']);
    multiArray.push(['一楼','二楼','三楼'])
    for(let n=0;n<res.result.data.length;n++){
      if(res.result.data[n].canteen===multiArray[0][0]&&res.result.data[n].louhao===multiArray[1][0]){
         arr.push(res.result.data[n].dishes)
      }
    }
    
    multiArray.push([...new Set(arr)])
    this.setData({
      array:res.result.data,
      multiArray:multiArray
    })  
    console.log(this.data.multiArray)
})
.catch(res=>{
    console.log('云函数获取数据失败',res)
})


    //云函数调用
    wx.cloud.callFunction({
      name:'administratorLogin'
    })
    .then(res=>{
        console.log('云函数获取数据成功',res.result.data)
        this.setData({
          list:res.result.data
        })  
    })
    .catch(res=>{
        console.log('云函数获取数据失败',res)
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