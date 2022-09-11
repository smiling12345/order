// pages/edit/edit.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       msg:50,
       flag:false,//控制显示和隐藏
       arrNewObject:{},//获得页面传过来的对象

       //以下是保存时需要保存的数据
       foodname:'',
       foodprice:0,
       image:'',//要保存以及显示的图片地址 云存储 
       material:'',

       canteen:'',
       louhao:'',
       dishes:''
    },

    preserve(){//判断在数据库中进行增加数据，还是更新数据
      //若一开始有对象传入，则是更新数据
      //更新数据在云函数中进行，增加数据不需要云函数进行
      //传入id能更新数据
      console.log(this.data.arrNewObject)
      //Object.keys()返回一个由一个给定对象的自身可枚举属性组成的数组，
      //若length==0，说明对象为空
      let length=Object.keys(this.data.arrNewObject).length

      let that=this
      if(length==0){
        console.log(that.data.canteen)
        let foodname=that.data.foodname
        let foodprice=parseFloat(that.data.foodprice)
        console.log(foodprice)
        console.log(typeof(foodprice))
        let image=that.data.image
        let material=that.data.material

        if(foodname==''){
          wx.showToast({
            title: '商品名称未填',
            duration:3500,
            icon:'none'
          })
        }else if(foodprice==0){
          wx.showToast({
            title: '商品价格未填',
            duration:3500,
            icon:'none'
          })
        }else if(image==''){
          wx.showToast({
            title: '商品图片未选择',
            duration:3500,
            icon:'none'
          })
        }else if(material==''){
          wx.showToast({
            title: '商品详情未说明',
            duration:3500,
            icon:'none'
          })
        }else{
          db.collection('food').add({
            data:{
              food_name:foodname,
              food_price:foodprice,
              food_image:image,
              material:material,

              canteen:that.data.canteen,
              louhao:that.data.louhao,
              dishes:that.data.dishes,

              empty:'在售',
              food_grade:0,
              food_sales:0,
            }
          })
          .then(res=>{
            console.log('添加入数据库成功',res)
            wx.showToast({
              title: '保存成功',
              duration:3000,
            })
          })
          .catch(err=>{
            console.log('添加入数据库失败',err)
            wx.showToast({
              title: '保存失败,请重新保存',
              duration:3000,
              icon:'error'
            })
          })
        }
      }else{
        console.log(2)

      }
       
    },
    text_input(e){
        const max_length = 50;
        const d = e.detail.value;
        console.log(e.detail.value);
          this.setData({
            material:e.detail.value
          })
        let num = max_length - d.length;
        this.setData({
            msg: num
        });
      },
      foodNameInput(e){
          console.log(e.detail.value)
          this.setData({
            foodname:e.detail.value
          })
      },
      foodPriceInput(e){
        console.log(e.detail.value)
        this.setData({
          foodprice:e.detail.value
        })
      },

      deleteImg:function(e){//删除图片
          console.log(e)
          let that=this
          wx.showModal({
            title: '删除',
            content:'确认删除图片吗？',
            success(res){
              if(res.confirm){
                console.log('用户点击确定')
                that.setData({
                  image:'',
                  flag:false
                })

                //从云存储删除对应图片
                wx.cloud.deleteFile({
                  fileList:[e.currentTarget.dataset.file]//传入要删除的图片id
                })
                .then(res=>{
                  console.log(res.fileList)
                })
                .catch(error=>{
                  console.log(error)
                })

                
              }else if(res.cancel){//默认关闭弹窗
                console.log('用户点击取消')
              }
            }
          })
          
      },

      addImg:function(){//上传图片
        let that=this;
        wx.chooseMedia({
           count: 1,
           mediaType:'Image',
           success:res=>{
             console.log(res)
             
             let tempFile=res.tempFiles[0].tempFilePath
             wx.cloud.uploadFile({
               cloudPath:'foodAdd/'+Date.now()+'-'+Math.random()*1000000+tempFile.match(/\.[^.]+?$/)[0],//文件存储在foodAdd中
               filePath:res.tempFiles[0].tempFilePath,
               success:res=>{
                 console.log('上传图片成功',res)
                 that.setData({
                  image:res.fileID,
                  flag:true,
                 })
               },
               fail:res=>{
                 console.log('上传图片失败',res)
               }
             })
             
           }
         })
      },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      let that=this
      if(options.arrObject==undefined){//说明没有传值过来,说明是添加数据
        that.setData({
          canteen:options.canteen,
          louhao:options.louhao,
          dishes:options.dishes
        })
      }else{
         console.log(options.arrObject)//获得传入过来的对象序列化形式
         let arrNewObject=JSON.parse(options.arrObject)//反序列化，即恢复成对象形式
         that.setData({
          arrNewObject:arrNewObject,

           foodname:arrNewObject.food_name,
           foodprice:arrNewObject.food_price,
           image:arrNewObject.food_image,
           material:arrNewObject.material,
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